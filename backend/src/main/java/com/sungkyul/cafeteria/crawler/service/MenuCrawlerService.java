package com.sungkyul.cafeteria.crawler.service;

import com.sungkyul.cafeteria.crawler.dto.CrawlingResult;
import com.sungkyul.cafeteria.menu.entity.Menu;
import com.sungkyul.cafeteria.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuCrawlerService {

    private static final String TARGET_URL = "https://www.sungkyul.ac.kr/skukr/340/subview.do";
    private static final int TIMEOUT_MS = 10_000;

    private final MenuRepository menuRepository;

    /** 테스트에서 stubbing 가능하도록 분리 (package-private) */
    Document fetchDocument() throws Exception {
        // 성결대 웹사이트는 한국 CA 인증서를 사용하여 JVM 기본 truststore에 없음
        // SSL 검증을 우회하는 커스텀 context 사용
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, new TrustManager[]{new X509TrustManager() {
            public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            public void checkClientTrusted(X509Certificate[] c, String a) {}
            public void checkServerTrusted(X509Certificate[] c, String a) {}
        }}, new java.security.SecureRandom());

        return Jsoup.connect(TARGET_URL)
                .timeout(TIMEOUT_MS)
                .sslSocketFactory(sslContext.getSocketFactory())
                .get();
    }

    public CrawlingResult crawlAndSave() {
        int savedCount = 0;
        int skippedCount = 0;

        try {
            Document doc = fetchDocument();

            Element table = doc.selectFirst("table");
            if (table == null) {
                log.error("[Crawler] table 태그를 찾을 수 없습니다.");
                return CrawlingResult.failure("table 태그를 찾을 수 없습니다.");
            }

            // 헤더에서 날짜 파싱 (첫 번째 th = 코너명이므로 skip)
            List<LocalDate> dates = parseDates(table);
            if (dates.isEmpty()) {
                log.error("[Crawler] 날짜 헤더를 파싱할 수 없습니다.");
                return CrawlingResult.failure("날짜 헤더를 파싱할 수 없습니다.");
            }

            log.info("[Crawler] 파싱된 날짜: {}", dates);

            // tbody tr 순회
            Elements rows = table.select("tbody tr");
            for (Element row : rows) {
                Elements cells = row.select("td");
                if (cells.isEmpty()) continue;

                String corner = cells.get(0).text().trim();
                if (corner.isEmpty()) continue;

                // 나머지 td = 요일별 메뉴
                for (int i = 1; i < cells.size() && (i - 1) < dates.size(); i++) {
                    LocalDate servedDate = dates.get(i - 1);
                    Element cell = cells.get(i);

                    // 주말 등 데이터 없는 셀 skip
                    if (cell.hasClass("no-data")) continue;

                    // br 태그 기준으로 줄 분리
                    List<String> menuNames = splitByBr(cell);

                    for (String menuName : menuNames) {
                        if (menuName.isEmpty()) continue;

                        boolean exists = menuRepository
                                .findByNameAndServedDateAndCorner(menuName, servedDate, corner)
                                .isPresent();

                        if (exists) {
                            skippedCount++;
                        } else {
                            menuRepository.save(Menu.builder()
                                    .name(menuName)
                                    .corner(corner)
                                    .servedDate(servedDate)
                                    .build());
                            savedCount++;
                        }
                    }
                }
            }

            log.info("[Crawler] 완료 — saved: {}, skipped: {}", savedCount, skippedCount);
            return CrawlingResult.success(savedCount, skippedCount);

        } catch (Exception e) {
            log.error("[Crawler] 크롤링 중 오류 발생: {}", e.getMessage(), e);
            return CrawlingResult.failure(e.getMessage());
        }
    }

    public String debugHtml() {
        try {
            Document doc = fetchDocument();
            return doc.outerHtml();
        } catch (Exception e) {
            log.error("[Crawler] debugHtml 오류: {}", e.getMessage(), e);
            return "오류: " + e.getMessage();
        }
    }

    /**
     * thead의 th에서 날짜를 파싱한다. 첫 번째 th(class="title")는 skip.
     *
     * 실제 HTML 구조:
     *   <th scope="col">월<br>2026.04.13</th>
     *
     * Jsoup .text() 호출 시 br 사이의 텍스트가 공백으로 합쳐져 "월 2026.04.13" 형태가 된다.
     * yyyy.MM.dd 패턴을 정규식으로 직접 추출한다.
     */
    private static final Pattern DATE_PATTERN = Pattern.compile("(\\d{4}\\.\\d{2}\\.\\d{2})");
    private static final DateTimeFormatter DOT_DATE_FMT = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    private List<LocalDate> parseDates(Element table) {
        List<LocalDate> dates = new ArrayList<>();
        Elements headers = table.select("thead tr th");

        for (int i = 1; i < headers.size(); i++) {
            String text = headers.get(i).text().trim();
            Matcher m = DATE_PATTERN.matcher(text);
            if (m.find()) {
                dates.add(LocalDate.parse(m.group(1), DOT_DATE_FMT));
            } else {
                log.warn("[Crawler] 날짜 파싱 실패: '{}'", text);
            }
        }
        return dates;
    }

    /**
     * td 안의 텍스트를 br 태그 기준으로 분리한다.
     */
    private List<String> splitByBr(Element cell) {
        // br을 줄바꿈 문자로 치환 후 분리
        cell.select("br").before("\\n");
        String text = cell.text().replace("\\n", "\n");
        List<String> result = new ArrayList<>();
        for (String line : text.split("\n")) {
            String trimmed = line.trim();
            if (!trimmed.isEmpty()) {
                result.add(trimmed);
            }
        }
        return result;
    }
}
