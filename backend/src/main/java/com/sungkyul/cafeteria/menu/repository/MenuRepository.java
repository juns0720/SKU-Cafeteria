package com.sungkyul.cafeteria.menu.repository;

import com.sungkyul.cafeteria.menu.dto.MenuAggregateProjection;
import com.sungkyul.cafeteria.menu.entity.Menu;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    /** 크롤러 upsert용 — (name, corner) 기준으로 메뉴 조회 */
    Optional<Menu> findByNameAndCorner(String name, String corner);

    /**
     * 전체 메뉴 집계 조회 (N+1 해결).
     * corner가 null이면 전체, non-null이면 해당 코너만.
     * firstSeenAt = MIN(served_date), latestServedDate = MAX(served_date),
     * averageRating = AVG(3축 평균), reviewCount = 리뷰 수.
     */
    @Query("""
        SELECT new com.sungkyul.cafeteria.menu.dto.MenuAggregateProjection(
            m.id, m.name, m.corner,
            m.firstSeenAt,
            m.lastSeenAt,
            m.avgOverall,
            CAST(m.reviewCount AS long),
            m.avgTaste, m.avgAmount, m.avgValue
        )
        FROM Menu m
        WHERE (:corner IS NULL OR m.corner = :corner)
    """)
    List<MenuAggregateProjection> findAggregated(@Param("corner") String corner);

    /** 단건 메뉴 집계 조회 — getMenuDetail 용 */
    @Query("""
        SELECT new com.sungkyul.cafeteria.menu.dto.MenuAggregateProjection(
            m.id, m.name, m.corner,
            m.firstSeenAt,
            m.lastSeenAt,
            m.avgOverall,
            CAST(m.reviewCount AS long),
            m.avgTaste, m.avgAmount, m.avgValue
        )
        FROM Menu m
        WHERE m.id = :menuId
    """)
    Optional<MenuAggregateProjection> findAggregatedById(@Param("menuId") Long menuId);

    /** 이번 주 BEST TOP N — 리뷰 수 하한 + avgOverall 내림차순 */
    @Query("""
        SELECT m FROM Menu m
        JOIN MenuDate md ON md.menu = m
        WHERE md.servedDate BETWEEN :monday AND :sunday
          AND m.reviewCount >= :minReviews
        GROUP BY m
        ORDER BY m.avgOverall DESC NULLS LAST
    """)
    List<Menu> findBestOfWeek(
            @Param("monday") LocalDate monday,
            @Param("sunday") LocalDate sunday,
            @Param("minReviews") int minReviews,
            Pageable pageable
    );

    /** 존재하는 코너 목록 (FE CornerTabs 용) */
    @Query("SELECT DISTINCT m.corner FROM Menu m ORDER BY m.corner")
    List<String> findDistinctCorners();
}
