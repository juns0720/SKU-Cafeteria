// Hi-fi screens: Profile + Onboarding (login + nickname + empty)

// ═══════════════════════════════════════════════
// ⑥ PROFILE — A+B 합본
// ═══════════════════════════════════════════════
function HiProfile() {
  return (
    <Screen label="⑥ 프로필" sub="정보 + 진행도 + 통계 + 내 리뷰">
      <HiStatus />
      <div style={{
        padding: '8px 16px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: HI_DISP, fontSize: 22 }}>프로필</div>
        <Icon name="gear" size={22} color={T.ink} />
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px' }}>
        {/* 프로필 정보 */}
        <Card style={{ padding: 14, display: 'flex', gap: 14, alignItems: 'center' }} bg={T.orangeSoft}>
          <div style={{
            width: 64, height: 64, borderRadius: 32,
            background: '#fff', border: `1.8px solid ${T.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: HI_DISP, fontSize: 26, color: T.ink,
            boxShadow: T.shadowSm,
          }}>밥</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontFamily: HI_DISP, fontSize: 19 }}>밥상탐험가</span>
              <span style={{ fontSize: 16 }}>🥈</span>
            </div>
            <div style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>
              작성 리뷰 14 · 가입 2025.09
            </div>
          </div>
        </Card>

        {/* 진행도 */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.inkSoft }}>
              다음 뱃지 <b style={{ color: T.ink }}>🥇 대가</b>까지
            </span>
            <span style={{ fontFamily: HI_DISP, fontSize: 13, color: T.orange }}>리뷰 16개 남음</span>
          </div>
          <div style={{
            marginTop: 6, height: 10, background: T.paperDeep,
            border: `1.5px solid ${T.ink}`, borderRadius: 999, overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{ width: '47%', height: '100%', background: T.orange }} />
            <div style={{
              position: 'absolute', left: '47%', top: -2, bottom: -2,
              width: 3, background: T.ink, transform: 'translateX(-50%)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>14</span>
            <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>30</span>
          </div>
        </div>

        {/* 통계 */}
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { n: 14, l: '리뷰', bg: T.orangeSoft },
            { n: 4.2, l: '평균 별점', bg: T.yellowSoft },
            { n: 2, l: '뱃지', bg: T.greenSoft },
          ].map((s, i) => (
            <Card key={i} style={{ padding: '12px 8px', textAlign: 'center' }} bg={s.bg}>
              <div style={{ fontFamily: HI_DISP, fontSize: 22, color: T.ink }}>{s.n}</div>
              <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.inkSoft }}>{s.l}</div>
            </Card>
          ))}
        </div>

        {/* 내가 쓴 리뷰 */}
        <div style={{ marginTop: 18 }}>
          <SecLabel right={<span style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>전체 14 ›</span>}>
            내가 쓴 리뷰
          </SecLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { m: '치킨까스', c: '양식', t: 5, d: '4/15', ill: 'bowl', bg: T.yellowSoft },
              { m: '김치찌개', c: '한식', t: 4, d: '4/12', ill: 'soup', bg: T.orangeSoft },
              { m: '제육볶음', c: '한식', t: 5, d: '4/10', ill: 'bowl', bg: T.orangeSoft },
            ].map((r, i) => (
              <Card key={i} style={{ padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                <FoodIllust kind={r.ill} size={40} bg={r.bg} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: HI_DISP, fontSize: 14 }}>{r.m}</span>
                    <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>{r.d}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                    <Stars value={r.t} size={10} />
                    <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>{r.c}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <TabBarHi active="me" />
    </Screen>
  );
}

// ═══════════════════════════════════════════════
// ⑦ ONBOARDING — 로그인
// ═══════════════════════════════════════════════
function HiLogin() {
  return (
    <Screen label="⑦-1 로그인" sub="Google OAuth 시작 화면" bg={T.orangeSoft}>
      <HiStatus />
      <div style={{
        flex: 1, padding: '60px 28px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: 104, height: 104, borderRadius: 26,
          background: '#fff', border: `2px solid ${T.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: T.shadowLg,
          transform: 'rotate(-3deg)',
        }}>
          <Icon name="bowl" size={62} color={T.orange} stroke={2.2} />
        </div>
        <div style={{ fontFamily: HI_DISP, fontSize: 34, color: T.ink, marginTop: 28 }}>
          SKU <UL>학식</UL>
        </div>
        <div style={{ fontFamily: HI_HAND, fontSize: 14, color: T.inkSoft, marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
          오늘 뭐 먹을지,<br />친구들 평점으로 3초 안에 결정해요
        </div>

        {/* 작은 장식 */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <FoodIllust kind="soup" size={44} bg={T.yellowSoft} />
          <FoodIllust kind="bowl" size={44} bg="#fff" />
          <FoodIllust kind="chop" size={44} bg={T.greenSoft} />
        </div>

        <div style={{ flex: 1 }} />

        <Button size="lg" style={{ width: '100%', background: '#fff' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 4 }}>
            <path d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.83.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/>
            <path d="M3.95 10.71A5.41 5.41 0 013.66 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l2.99-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.96L3.95 7.3C4.66 5.16 6.65 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Google로 시작하기
        </Button>
        <div style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute, marginTop: 12, textAlign: 'center' }}>
          시작하면 이용약관·개인정보 처리방침에 동의합니다
        </div>
      </div>
    </Screen>
  );
}

function HiNickname() {
  return (
    <Screen label="⑦-2 닉네임" sub="최초 1회 · 변경 어려움">
      <HiStatus />
      <div style={{
        padding: '8px 16px', display: 'flex', alignItems: 'center',
      }}>
        <Icon name="chevL" size={22} color={T.ink} />
      </div>
      <div style={{ padding: '14px 24px', flex: 1 }}>
        <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.mute }}>2 / 2 · 마지막 단계</div>
        <div style={{ fontFamily: HI_DISP, fontSize: 28, color: T.ink, marginTop: 4, lineHeight: 1.2 }}>
          리뷰에 쓸<br /><UL>닉네임</UL>을 정해주세요
        </div>

        <Card style={{ marginTop: 24, padding: '16px 16px' }} bg="#fff">
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: HI_DISP, fontSize: 24, color: T.ink }}>밥상탐험가</span>
            <span style={{
              width: 2, height: 26, background: T.orange, marginLeft: 3,
              display: 'inline-block',
            }} />
            <span style={{ marginLeft: 'auto', fontFamily: HI_HAND, fontSize: 11, color: T.green, display: 'flex', alignItems: 'center', gap: 3 }}>
              ✓ 사용 가능
            </span>
          </div>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 4px' }}>
          <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.mute }}>2~12자 · 한 번 정하면 변경 어려워요</span>
          <span style={{ fontFamily: HI_HAND, fontSize: 11, color: T.inkSoft }}>5 / 12</span>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute, marginBottom: 8 }}>
            ✨ 추천 닉네임
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['냠냠이', '점심탐정', '학식러버', '오늘은한식', '돈까스킬러'].map(n => (
              <div key={n} style={{
                padding: '6px 12px', background: '#fff',
                border: `1.5px solid ${T.ink}`, borderRadius: 999,
                fontFamily: HI_DISP, fontSize: 13,
                boxShadow: T.shadowSm,
              }}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 20px 14px', borderTop: `1.5px solid ${T.ink}` }}>
        <Button primary size="lg" style={{ width: '100%' }}
          icon={<Icon name="chevR" size={16} color={T.paper} />}>
          시작하기
        </Button>
      </div>
    </Screen>
  );
}

function HiEmpty() {
  return (
    <Screen label="⑦-3 빈 상태" sub="크롤링 전 · 첫 진입">
      <HiStatus />
      <div style={{
        padding: '10px 20px 14px', borderBottom: `1.5px dashed ${T.rule}`,
      }}>
        <div style={{ fontFamily: HI_DISP, fontSize: 22, color: T.ink }}>SKU 학식</div>
        <div style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute }}>2026. 4. 20 · 월요일</div>
      </div>
      <div style={{
        flex: 1, overflow: 'hidden',
        padding: '32px 24px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          position: 'relative', marginTop: 8,
          transform: 'rotate(-4deg)',
        }}>
          <FoodIllust kind="soup" size={96} bg={T.paperDeep} />
        </div>
        <div style={{ fontFamily: HI_DISP, fontSize: 20, color: T.ink, marginTop: 18 }}>
          아직 오늘 메뉴가 없어요
        </div>
        <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.mute, marginTop: 4, lineHeight: 1.4 }}>
          매주 월요일 아침에 업데이트됩니다.<br />조금만 기다려주세요!
        </div>

        <div style={{ alignSelf: 'stretch', marginTop: 24, textAlign: 'left' }}>
          <div style={{ fontFamily: HI_HAND, fontSize: 12, color: T.mute, marginBottom: 8 }}>
            지난 주 베스트 미리보기
          </div>
          {[
            { m: '치킨까스', c: '양식', r: 4.7, ill: 'bowl', bg: T.yellowSoft },
            { m: '제육볶음', c: '한식', r: 4.5, ill: 'bowl', bg: T.orangeSoft },
          ].map((r, i) => (
            <Card key={i} style={{
              padding: 10, marginBottom: 8, display: 'flex', gap: 10, alignItems: 'center',
              opacity: 0.75,
            }}>
              <FoodIllust kind={r.ill} size={40} bg={r.bg} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: HI_DISP, fontSize: 14 }}>{r.m}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                  <Stars value={r.r} size={10} />
                  <span style={{ fontFamily: HI_HAND, fontSize: 10, color: T.mute }}>{r.c}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <TabBarHi active="home" />
    </Screen>
  );
}

Object.assign(window, { HiProfile, HiLogin, HiNickname, HiEmpty });
