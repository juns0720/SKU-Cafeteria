// Hi-fi screens: Home + Week + All Menu

// ═══════════════════════════════════════════════
// ① HOME
// ═══════════════════════════════════════════════
function HiHome() {
  const best = [
    { m: '치킨까스', c: '양식', r: 4.7, n: 24, ill: 'bowl', bg: T.yellowSoft },
    { m: '제육볶음', c: '한식', r: 4.5, n: 31, ill: 'bowl', bg: T.orangeSoft },
    { m: '순두부찌개', c: '일품', r: 4.3, n: 18, ill: 'soup', bg: T.peach },
    { m: '김치찌개', c: '한식', r: 4.2, n: 15, ill: 'soup', bg: T.orangeSoft },
    { m: '라볶이', c: '분식', r: 4.0, n: 9, ill: 'bowl', bg: T.greenSoft },
  ];
  const today = [
    { c: '양식', m: '치킨까스', r: 4.7, n: 24, ill: 'bowl', bg: T.yellowSoft },
    { c: '한식', m: '김치찌개 정식', r: 4.3, n: 18, ill: 'soup', bg: T.orangeSoft },
    { c: '일품', m: '순두부찌개', r: 4.1, n: 11, ill: 'soup', bg: T.peach, nw: true },
    { c: '분식', m: '비빔국수', r: 3.9, n: 7, ill: 'bowl', bg: T.greenSoft },
  ];
  return (
    <Screen label="① 홈" sub="오늘의 베스트 + 운영 코너">
      <HiStatus />
      {/* 헤더 */}
      <div style={{ padding: '10px 20px 14px' }}>
        <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.mute }}>2026. 4. 20 · 월요일 · 중식</div>
        <div style={{ fontFamily: HI_DISP, fontSize: 26, color: T.ink, marginTop: 2, lineHeight: 1.15 }}>
          <UL>오늘의 메뉴</UL>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* 오늘의 베스트 */}
        <div style={{ paddingLeft: 20 }}>
          <SecLabel right={<Pill bg={T.yellowSoft} icon={<Icon name="fire" size={12} color={T.orange} stroke={1.8} />}>TOP 5</Pill>}>
            오늘의 베스트
          </SecLabel>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 10, padding: '0 20px', width: 'max-content' }}>
            {best.map((b, i) => (
              <Card key={i} style={{ width: 128, padding: 10, flexShrink: 0 }} bg={i === 0 ? T.yellowSoft : '#fff'}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 6px' }}>
                  <FoodIllust kind={b.ill} size={62} bg={b.bg} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{
                    fontFamily: HI_DISP, fontSize: 14, color: T.orange,
                  }}>#{i + 1}</span>
                  <span style={{ fontFamily: HI_DISP, fontSize: 15, color: T.ink }}>{b.m}</span>
                </div>
                <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>{b.c}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
                  <Stars value={b.r} size={11} />
                  <span style={{ fontFamily: HI_DISP, fontSize: 12, marginLeft: 2 }}>{b.r}</span>
                  <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>· {b.n}</span>
                </div>
              </Card>
            ))}
          </div>
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 8, width: 30,
            background: `linear-gradient(90deg, transparent, ${T.paper})`, pointerEvents: 'none',
          }} />
        </div>

        {/* 구분선 */}
        <div style={{ margin: '14px 20px 12px', height: 0, borderTop: `1.5px dashed ${T.rule}` }} />

        {/* 오늘 운영 코너 */}
        <div style={{ padding: '0 20px', flex: 1, overflow: 'hidden' }}>
          <SecLabel right={
            <Pill bg="#fff" icon={<Icon name="filter" size={11} color={T.ink} />}>
              별점순 <Icon name="chevD" size={10} color={T.ink} />
            </Pill>
          }>
            오늘 운영 중
          </SecLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {today.map((r, i) => (
              <Card key={i} style={{ padding: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                <FoodIllust kind={r.ill} size={48} bg={r.bg} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>{r.c}</span>
                    {r.nw && <Pill bg={T.orange} color="#fff" style={{ fontSize: 10, padding: '1px 6px' }}>NEW</Pill>}
                  </div>
                  <div style={{ fontFamily: HI_DISP, fontSize: 16, color: T.ink }}>{r.m}</div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 2 }}>
                    <Stars value={r.r} size={11} />
                    <span style={{ fontFamily: HI_DISP, fontSize: 12 }}>{r.r}</span>
                    <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>· 리뷰 {r.n}</span>
                  </div>
                </div>
                <Icon name="chevR" size={16} color={T.mute} />
              </Card>
            ))}
          </div>
        </div>
      </div>
      <TabBarHi active="home" />
    </Screen>
  );
}

// ═══════════════════════════════════════════════
// ② WEEK — 요일 탭 + 코너 리스트 (B안)
// ═══════════════════════════════════════════════
function HiWeek() {
  const days = [
    { d: '월', n: '4/20' },
    { d: '화', n: '4/21' },
    { d: '수', n: '4/22' },
    { d: '목', n: '4/23' },
    { d: '금', n: '4/24' },
  ];
  const items = [
    { c: '한식', m: '김치찌개 정식', r: 4.3, ill: 'soup', bg: T.orangeSoft },
    { c: '양식', m: '치킨까스', r: 4.7, ill: 'bowl', bg: T.yellowSoft, best: true },
    { c: '분식', m: '로제 떡볶이', r: null, ill: 'bowl', bg: T.peach, nw: true },
    { c: '일품', m: '순두부찌개', r: 4.1, ill: 'soup', bg: T.peach },
  ];
  return (
    <Screen label="② 주간" sub="요일 탭 · NEW 뱃지 포함">
      <HiStatus />
      <div style={{ padding: '10px 20px 14px' }}>
        <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.mute }}>4월 셋째 주</div>
        <div style={{ fontFamily: HI_DISP, fontSize: 24, color: T.ink, marginTop: 2 }}>
          이번 주 <UL color={T.green}>식단</UL>
        </div>
      </div>
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 6 }}>
        {days.map((d, i) => (
          <div key={d.d} style={{
            flex: 1, textAlign: 'center', padding: '8px 0',
            background: i === 0 ? T.ink : '#fff',
            color: i === 0 ? T.paper : T.ink,
            border: `1.5px solid ${T.ink}`, borderRadius: 12,
            boxShadow: i === 0 ? T.shadowSm : 'none',
          }}>
            <div style={{ fontFamily: HI_DISP, fontSize: 14 }}>{d.d}</div>
            <div style={{ fontFamily: HI_HAND, fontSize: 10, opacity: 0.7 }}>{d.n}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '6px 20px' }}>
        <SecLabel right={
          <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Pill bg={T.orange} color="#fff" style={{ fontSize: 9, padding: '0 5px' }}>NEW</Pill>
            = 처음 등장
          </span>
        }>
          월요일 · 중식
        </SecLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {items.map((r, i) => (
            <Card key={i} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <FoodIllust kind={r.ill} size={50} bg={r.bg} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>{r.c}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: HI_DISP, fontSize: 16, color: T.ink }}>{r.m}</span>
                  {r.nw && <Pill bg={T.orange} color="#fff" style={{ fontSize: 10, padding: '1px 7px' }}>NEW</Pill>}
                </div>
                {r.r != null ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Stars value={r.r} size={11} />
                    <span style={{ fontFamily: HI_DISP, fontSize: 12 }}>{r.r}</span>
                  </div>
                ) : (
                  <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.red, marginTop: 2 }}>
                    첫 등장 · 첫 리뷰의 주인공이 되어보세요
                  </div>
                )}
              </div>
              {r.best && <Pill bg={T.yellowSoft} icon={<Icon name="medal" size={12} color="#C89A2A" stroke={1.6} />}>베스트</Pill>}
            </Card>
          ))}
        </div>
      </div>
      <TabBarHi active="week" />
    </Screen>
  );
}

// ═══════════════════════════════════════════════
// ③ ALL MENU — 검색 + 리스트 (A안)
// ═══════════════════════════════════════════════
function HiAll() {
  const items = [
    { c: '양식', m: '치킨까스', r: 4.7, n: 24, t: 'gold', ill: 'bowl', bg: T.yellowSoft },
    { c: '한식', m: '제육볶음', r: 4.5, n: 31, t: 'gold', ill: 'bowl', bg: T.orangeSoft },
    { c: '한식', m: '김치찌개 정식', r: 4.3, n: 18, t: 'silver', ill: 'soup', bg: T.orangeSoft },
    { c: '일품', m: '순두부찌개', r: 4.1, n: 11, t: 'bronze', nw: true, ill: 'soup', bg: T.peach },
    { c: '분식', m: '라볶이', r: 4.0, n: 9, t: 'bronze', ill: 'bowl', bg: T.greenSoft },
    { c: '양식', m: '돈까스', r: 3.8, n: 14, t: 'silver', ill: 'bowl', bg: T.yellowSoft },
    { c: '일품', m: '냉면', r: 3.6, n: 6, t: 'bronze', ill: 'soup', bg: T.peach },
  ];
  const tierMeta = {
    gold: { bg: T.yellowSoft, c: '#C89A2A', l: '🥇' },
    silver: { bg: T.paperDeep, c: T.inkSoft, l: '🥈' },
    bronze: { bg: T.orangeSoft, c: T.orange, l: '🥉' },
  };
  return (
    <Screen label="③ 전체 메뉴" sub="검색 + 필터 + 전체 리스트">
      <HiStatus />
      <div style={{ padding: '10px 20px 10px' }}>
        <div style={{ fontFamily: HI_DISP, fontSize: 22, color: T.ink }}>전체 메뉴</div>
        <div style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>87개 · 최근 1년</div>
      </div>
      {/* 검색 바 */}
      <div style={{ padding: '0 20px 10px' }}>
        <Card style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }} shadow={false}>
          <Icon name="search" size={18} color={T.mute} stroke={1.8} />
          <span style={{ fontFamily: HI_HAND, fontSize: 14, color: T.mute }}>메뉴·코너 검색</span>
        </Card>
      </div>
      {/* 필터 칩 */}
      <div style={{ padding: '0 0 10px 20px', display: 'flex', gap: 6, overflow: 'hidden' }}>
        {['전체', '한식', '양식', '분식', '일품'].map((c, i) => (
          <div key={c} style={{
            padding: '5px 12px', flexShrink: 0,
            border: `1.5px solid ${T.ink}`, borderRadius: 999,
            background: i === 0 ? T.ink : '#fff',
            color: i === 0 ? T.paper : T.ink,
            fontFamily: HI_DISP, fontSize: 13,
          }}>{c}</div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute, marginBottom: 6 }}>
          별점 높은 순
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((r, i) => {
            const tm = tierMeta[r.t];
            return (
              <div key={i} style={{
                padding: '10px 0', display: 'flex', gap: 12, alignItems: 'center',
                borderBottom: `1px dashed ${T.rule}`,
              }}>
                <FoodIllust kind={r.ill} size={44} bg={r.bg} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>{r.c}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', fontSize: 11,
                      width: 16, height: 16, borderRadius: 999, background: tm.bg,
                      justifyContent: 'center', border: `1px solid ${T.ink}`,
                    }}>{tm.l}</span>
                    {r.nw && <Pill bg={T.orange} color="#fff" style={{ fontSize: 9, padding: '0 5px' }}>NEW</Pill>}
                  </div>
                  <div style={{ fontFamily: HI_DISP, fontSize: 15 }}>{r.m}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                    <Stars value={r.r} size={10} />
                    <span style={{ fontFamily: HI_DISP, fontSize: 11 }}>{r.r}</span>
                    <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>· 리뷰 {r.n}</span>
                  </div>
                </div>
                <Icon name="chevR" size={14} color={T.mute} />
              </div>
            );
          })}
        </div>
      </div>
      <TabBarHi active="all" />
    </Screen>
  );
}

Object.assign(window, { HiHome, HiWeek, HiAll });
