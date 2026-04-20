// Hi-fi screens: Detail + Review Write

// ═══════════════════════════════════════════════
// ④ MENU DETAIL — 헤더 이미지 + 리뷰 (A안)
// ═══════════════════════════════════════════════
function HiDetail() {
  const reviews = [
    { u: '밥상탐험가', b: 'gold', d: '4/15', taste: 5, amt: 5, val: 5, text: '바삭함이 살아있고 소스도 적당해요. 양도 충분!' },
    { u: '익명의고양이', b: 'silver', d: '4/13', taste: 4, amt: 4, val: 5, text: '가성비 최고. 분식보다 훨씬 낫네요.' },
    { u: '한끼러버', b: 'bronze', d: '4/10', taste: 5, amt: 3, val: 4, text: '양이 아주 많진 않지만 맛이 좋아서 괜찮아요.' },
  ];
  return (
    <Screen label="④ 메뉴 상세" sub="헤더 · 3축 집계 · 리뷰">
      <HiStatus />
      {/* Top bar */}
      <div style={{
        padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          width: 36, height: 36, border: `1.5px solid ${T.ink}`, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fff', boxShadow: T.shadowSm,
        }}><Icon name="chevL" size={18} color={T.ink} /></div>
        <div style={{
          width: 36, height: 36, border: `1.5px solid ${T.ink}`, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fff', boxShadow: T.shadowSm,
        }}><Icon name="heart" size={18} color={T.ink} /></div>
      </div>
      {/* Hero */}
      <div style={{
        padding: '4px 20px 14px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <FoodIllust kind="bowl" size={120} bg={T.yellowSoft} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 12 }}>
          <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>양식</span>
          <Pill bg={T.yellowSoft} icon={<Icon name="medal" size={11} color="#C89A2A" stroke={1.6} />}>베스트 🥇</Pill>
        </div>
        <div style={{ fontFamily: HI_DISP, fontSize: 26, color: T.ink, marginTop: 2 }}>치킨까스</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Stars value={5} size={15} />
          <span style={{ fontFamily: HI_DISP, fontSize: 18 }}>4.7</span>
          <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>· 리뷰 24개</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        {/* 3축 */}
        <Card bg={T.yellowSoft} style={{ padding: 14 }}>
          <AxisBar label="맛" value={4.8} color={T.orange} />
          <div style={{ height: 8 }} />
          <AxisBar label="양" value={4.5} color={T.peach} />
          <div style={{ height: 8 }} />
          <AxisBar label="가성비" value={4.6} color={T.green} />
        </Card>

        {/* 리뷰 */}
        <div style={{ marginTop: 16 }}>
          <SecLabel right={<span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>최신순</span>}>
            리뷰 24
          </SecLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reviews.slice(0, 2).map((r, i) => (
              <Card key={i} style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontFamily: HI_DISP, fontSize: 14 }}>{r.u}</span>
                    <span style={{ fontSize: 13 }}>{r.b === 'gold' ? '🥇' : r.b === 'silver' ? '🥈' : '🥉'}</span>
                  </div>
                  <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>{r.d}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>맛 <b style={{ color: T.ink }}>{r.taste}</b></span>
                  <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>양 <b style={{ color: T.ink }}>{r.amt}</b></span>
                  <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>가성비 <b style={{ color: T.ink }}>{r.val}</b></span>
                </div>
                <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.ink, marginTop: 6, lineHeight: 1.4 }}>
                  {r.text}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '10px 20px 14px', borderTop: `1.5px solid ${T.ink}`, background: T.paper }}>
        <Button primary size="lg" style={{ width: '100%' }}
          icon={<Icon name="pencil" size={16} color={T.paper} />}>
          리뷰 작성하기
        </Button>
      </div>
    </Screen>
  );
}

// ═══════════════════════════════════════════════
// ⑤ REVIEW WRITE — 긴 세로 폼 (A안)
// ═══════════════════════════════════════════════
function HiWrite() {
  const axes = [
    { l: '맛', sub: '얼마나 맛있었나요?', v: 5, color: T.orange },
    { l: '양', sub: '양은 충분했나요?', v: 4, color: T.peach },
    { l: '가성비', sub: '값어치 했나요?', v: 5, color: T.green },
  ];
  return (
    <Screen label="⑤ 리뷰 작성" sub="3축 × 5점 · 코멘트 선택">
      <HiStatus />
      <div style={{
        padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1.5px solid ${T.ink}`,
      }}>
        <Icon name="x" size={22} color={T.ink} />
        <div style={{ fontFamily: HI_DISP, fontSize: 18 }}>리뷰 쓰기</div>
        <span style={{ fontFamily: HI_DISP, fontSize: 14, color: T.mute }}>임시저장</span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '16px 20px' }}>
        {/* 메뉴 카드 */}
        <Card style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }} bg={T.yellowSoft}>
          <FoodIllust kind="bowl" size={54} bg="#fff" />
          <div>
            <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>양식 · 2026. 4. 20</div>
            <div style={{ fontFamily: HI_DISP, fontSize: 17 }}>치킨까스</div>
          </div>
        </Card>

        {/* 3축 */}
        {axes.map((a, i) => (
          <div key={a.l} style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: HI_DISP, fontSize: 18, color: T.ink }}>{a.l}</span>
              <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>{a.sub}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              {Array.from({ length: 5 }).map((_, j) => (
                <Icon key={j} name={j < a.v ? 'star' : 'starO'} size={32}
                  color={j < a.v ? a.color : T.rule} stroke={1.8} />
              ))}
            </div>
          </div>
        ))}

        {/* 코멘트 */}
        <div style={{ marginTop: 18 }}>
          <span style={{ fontFamily: HI_DISP, fontSize: 16 }}>한 마디</span>
          <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute, marginLeft: 6 }}>(선택)</span>
          <Card style={{ marginTop: 8, padding: 14, minHeight: 64 }} shadow={false}>
            <span style={{ fontFamily: HI_HAND, fontSize: 14, color: T.ink }}>
              바삭함이 살아있어요! 양도 충분하고...
            </span>
            <span style={{ borderLeft: `1.5px solid ${T.ink}`, marginLeft: 2, animation: 'none', height: 16, display: 'inline-block', verticalAlign: 'middle' }} />
          </Card>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
            <Icon name="cam" size={18} color={T.mute} stroke={1.8} />
            <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>사진 첨부 (선택)</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 20px 14px', borderTop: `1.5px solid ${T.ink}` }}>
        <Button primary size="lg" style={{ width: '100%' }}>리뷰 등록</Button>
      </div>
    </Screen>
  );
}

Object.assign(window, { HiDetail, HiWrite });
