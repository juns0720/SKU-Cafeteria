// Hi-fi design system — 연필 / 따뜻한 음식 톤
// 모바일 뷰포트 (375px) 기준. 정적 목업.

// ───── Tokens ─────
const T = {
  paper: '#FBF6EC',           // 종이 배경
  paperDeep: '#F5EEDD',       // 살짝 어두운 종이 (섹션 구분)
  ink: '#2B2218',             // 잉크 블랙 (연필)
  inkSoft: '#5C4F42',         // 중간 톤
  mute: '#8F8377',            // 흐린 텍스트
  rule: '#D9CDB8',            // 점선 구분

  orange: '#EF8A3D',          // 메인 액센트
  orangeSoft: '#FCE3CC',      // 주황 배경
  yellow: '#F5C451',          // 별/강조
  yellowSoft: '#FDF0C8',      // 노랑 배경 (베스트 카드)
  green: '#7BA85C',           // 가성비/신선
  greenSoft: '#DBE7CC',
  peach: '#F4B896',
  red: '#D86C5A',             // 리뷰 없을 때/경고

  shadow: '2px 3px 0 rgba(43,34,24,0.12)',
  shadowSm: '1px 2px 0 rgba(43,34,24,0.10)',
  shadowLg: '3px 5px 0 rgba(43,34,24,0.15)',
};

const HI_HAND = '"Gaegu", system-ui, sans-serif';
const HI_DISP = '"Jua", "Gaegu", system-ui, sans-serif';

// ───── Mobile viewport (no device frame) ─────
function Screen({ label, children, sub, bg }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {label && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, paddingBottom: 12 }}>
          <div style={{ fontFamily: HI_DISP, fontSize: 20, color: T.ink, letterSpacing: -0.3 }}>{label}</div>
          {sub && <div style={{ fontFamily: HI_HAND, fontSize: 13, color: T.mute, marginTop: 1 }}>{sub}</div>}
        </div>
      )}
      <div style={{
        width: 375, height: 760,
        background: bg || T.paper,
        borderRadius: 32,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        fontFamily: HI_HAND,
        color: T.ink,
        boxShadow: `0 2px 8px rgba(43,34,24,0.08), 0 12px 40px rgba(43,34,24,0.1)`,
        border: `1.5px solid ${T.rule}`,
      }}>
        {children}
      </div>
    </div>
  );
}

// ───── Status bar (stylized, not realistic) ─────
function HiStatus({ dark }) {
  const c = dark ? T.paper : T.ink;
  return (
    <div style={{
      height: 32, flexShrink: 0,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 20px',
      fontFamily: HI_HAND, fontSize: 13, fontWeight: 700, color: c,
    }}>
      <span>11:47</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M8 10c2-2 5-3 7-3M8 10c-2-2-5-3-7-3M8 10c1-1 3-2 4-2M8 10c-1-1-3-2-4-2" stroke={c} strokeWidth="1.4" strokeLinecap="round" /></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke={c} strokeWidth="1.2" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill={c} />
          <rect x="19.5" y="3.5" width="2" height="4" rx="1" fill={c} />
        </svg>
      </div>
    </div>
  );
}

// ───── Icons (hand-drawn line illustration style) ─────
function Icon({ name, size = 24, color = T.ink, stroke = 1.8 }) {
  const s = size, c = color, w = stroke;
  const paths = {
    // 밥그릇
    bowl: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10 C 4 16, 8 21, 12 21 C 16 21, 20 16, 20 10 Z" />
      <path d="M3 10 L 21 10" />
      <path d="M9 6 C 9.5 7, 10.5 7, 11 6" />
      <path d="M13 5 C 13.5 6, 14.5 6, 15 5" />
    </g>,
    // 국그릇 (김)
    soup: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 L 21 11 L 19 20 L 5 20 Z" />
      <path d="M8 5 C 8 6, 9 7, 9 8 C 9 9, 8 9.5, 8 10" />
      <path d="M12 4 C 12 5.5, 13 6, 13 7.5 C 13 9, 12 9.5, 12 10" />
      <path d="M16 5 C 16 6, 17 7, 17 8 C 17 9, 16 9.5, 16 10" />
    </g>,
    // 수저 (젓가락)
    chop: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round">
      <path d="M6 3 L 10 21" />
      <path d="M10 3 L 14 21" />
      <path d="M17 3 L 17 14" />
      <ellipse cx="17" cy="18" rx="3" ry="3.5" />
    </g>,
    // 별
    star: <path d="M12 3 L 14.5 9 L 21 9.5 L 16 14 L 17.5 20.5 L 12 17 L 6.5 20.5 L 8 14 L 3 9.5 L 9.5 9 Z"
      fill={c} stroke={c} strokeWidth={w * 0.7} strokeLinejoin="round" />,
    starO: <path d="M12 3 L 14.5 9 L 21 9.5 L 16 14 L 17.5 20.5 L 12 17 L 6.5 20.5 L 8 14 L 3 9.5 L 9.5 9 Z"
      fill="none" stroke={c} strokeWidth={w} strokeLinejoin="round" />,
    // 검색
    search: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5 L 20 20" />
    </g>,
    // 집
    home: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 L 12 3 L 21 11 L 21 20 L 3 20 Z" />
      <path d="M10 20 L 10 14 L 14 14 L 14 20" />
    </g>,
    // 달력
    cal: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10 L 21 10" />
      <path d="M8 3 L 8 7" />
      <path d="M16 3 L 16 7" />
    </g>,
    // 메뉴판
    list: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8 L 16 8" />
      <path d="M8 12 L 16 12" />
      <path d="M8 16 L 13 16" />
    </g>,
    // 사람
    user: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21 C 4 16, 8 13, 12 13 C 16 13, 20 16, 20 21" />
    </g>,
    // 하트
    heart: <path d="M12 20 C 5 15, 3 11, 3 8 C 3 5.5, 5 3.5, 7.5 3.5 C 9.5 3.5, 11 4.5, 12 6 C 13 4.5, 14.5 3.5, 16.5 3.5 C 19 3.5, 21 5.5, 21 8 C 21 11, 19 15, 12 20 Z"
      fill="none" stroke={c} strokeWidth={w} strokeLinejoin="round" />,
    // 설정
    gear: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3 L 12 6 M12 18 L 12 21 M3 12 L 6 12 M18 12 L 21 12 M5.5 5.5 L 7.5 7.5 M16.5 16.5 L 18.5 18.5 M5.5 18.5 L 7.5 16.5 M16.5 7.5 L 18.5 5.5" />
    </g>,
    // 연필
    pencil: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21 L 7 20 L 18 9 L 15 6 L 4 17 Z" />
      <path d="M14 7 L 17 10" />
      <path d="M3 21 L 6 18" />
    </g>,
    // 화살
    chevL: <path d="M14 5 L 8 12 L 14 19" fill="none" stroke={c} strokeWidth={w * 1.1} strokeLinecap="round" strokeLinejoin="round" />,
    chevR: <path d="M10 5 L 16 12 L 10 19" fill="none" stroke={c} strokeWidth={w * 1.1} strokeLinecap="round" strokeLinejoin="round" />,
    chevD: <path d="M5 9 L 12 15 L 19 9" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />,
    // X
    x: <path d="M6 6 L 18 18 M18 6 L 6 18" fill="none" stroke={c} strokeWidth={w * 1.1} strokeLinecap="round" />,
    // 플러스
    plus: <path d="M12 5 L 12 19 M5 12 L 19 12" fill="none" stroke={c} strokeWidth={w * 1.2} strokeLinecap="round" />,
    // 필터
    filter: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round"><path d="M3 5 L 21 5" /><path d="M6 12 L 18 12" /><path d="M10 19 L 14 19" /></g>,
    // 카메라
    cam: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8 L 21 8 L 21 19 L 3 19 Z" />
      <path d="M8 8 L 9 5 L 15 5 L 16 8" />
      <circle cx="12" cy="13.5" r="3" />
    </g>,
    // 메달 (뱃지 느낌)
    medal: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3 L 10 10 M17 3 L 14 10 M7 3 L 17 3" />
      <circle cx="12" cy="15" r="6" />
      <path d="M12 12 L 12.8 13.8 L 14.8 14 L 13.3 15.4 L 13.7 17.4 L 12 16.4 L 10.3 17.4 L 10.7 15.4 L 9.2 14 L 11.2 13.8 Z" fill={c} stroke="none" />
    </g>,
    // 불 (인기)
    fire: <g fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 C 14 7, 17 9, 17 13 C 17 17, 14 20, 12 20 C 10 20, 7 17, 7 13 C 7 11, 9 10, 10 8 C 11 6, 11 5, 12 3 Z" />
      <path d="M12 14 C 13 16, 14 16, 14 18" />
    </g>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
}

// ───── Stars row ─────
function Stars({ value, size = 14, total = 5, color = T.yellow }) {
  return (
    <div style={{ display: 'inline-flex', gap: 1 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Icon key={i} name={i < Math.round(value) ? 'star' : 'starO'} size={size} color={color} stroke={1.5} />
      ))}
    </div>
  );
}

// ───── Badge ─────
function Pill({ children, bg = T.orangeSoft, color = T.ink, border = T.ink, icon, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 9px',
      border: `1.5px solid ${border}`,
      borderRadius: 999,
      background: bg,
      fontFamily: HI_HAND, fontSize: 12, fontWeight: 700,
      color,
      ...style,
    }}>
      {icon}
      {children}
    </span>
  );
}

// ───── Button ─────
function Button({ children, primary, size = 'md', style = {}, icon }) {
  const pad = size === 'lg' ? '13px 22px' : size === 'sm' ? '6px 12px' : '10px 18px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: pad,
      border: `1.8px solid ${T.ink}`,
      borderRadius: 12,
      fontFamily: HI_DISP, fontSize: fs,
      background: primary ? T.ink : T.paper,
      color: primary ? T.paper : T.ink,
      boxShadow: T.shadow,
      ...style,
    }}>
      {icon}{children}
    </div>
  );
}

// ───── Card ─────
function Card({ children, style = {}, bg = '#fff', shadow = true, round = 16 }) {
  return (
    <div style={{
      background: bg,
      border: `1.5px solid ${T.ink}`,
      borderRadius: round,
      boxShadow: shadow ? T.shadow : 'none',
      ...style,
    }}>{children}</div>
  );
}

// ───── Tab bar (4 tabs) ─────
function TabBarHi({ active }) {
  const tabs = [
    { k: 'home', l: '홈', i: 'home' },
    { k: 'week', l: '주간', i: 'cal' },
    { k: 'all', l: '전체', i: 'list' },
    { k: 'me', l: '프로필', i: 'user' },
  ];
  return (
    <div style={{
      flexShrink: 0, padding: '8px 0 12px',
      borderTop: `1.5px solid ${T.ink}`,
      background: T.paper,
      display: 'flex',
    }}>
      {tabs.map(t => (
        <div key={t.k} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: t.k === active ? T.orange : T.inkSoft,
          paddingTop: 4,
        }}>
          <Icon name={t.i} size={22} color={t.k === active ? T.orange : T.inkSoft} stroke={t.k === active ? 2.2 : 1.6} />
          <div style={{
            fontFamily: HI_HAND, fontSize: 12, fontWeight: 700,
          }}>{t.l}</div>
        </div>
      ))}
    </div>
  );
}

// ───── Food illustration placeholder (SVG) ─────
function FoodIllust({ kind = 'bowl', size = 80, bg = T.orangeSoft }) {
  // 원형 배경 + 아이콘
  const c = bg === T.orangeSoft ? T.orange : bg === T.yellowSoft ? '#C89A2A' : bg === T.greenSoft ? T.green : T.ink;
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: bg, border: `1.5px solid ${T.ink}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, boxShadow: T.shadowSm,
    }}>
      <Icon name={kind} size={size * 0.55} color={c} stroke={2} />
    </div>
  );
}

// ───── Wavy underline ─────
function UL({ children, color = T.orange }) {
  return (
    <span style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 6'%3E%3Cpath d='M0 3 Q 2.5 0, 5 3 T 10 3 T 15 3 T 20 3' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='2'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: '0 100%',
      backgroundSize: '14px 5px',
      paddingBottom: 6,
    }}>{children}</span>
  );
}

// ───── Section label ─────
function SecLabel({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <div style={{ fontFamily: HI_DISP, fontSize: 17, color: T.ink }}>{children}</div>
      {right}
    </div>
  );
}

// ───── Axis bar (for detail summary) ─────
function AxisBar({ label, value, color = T.orange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 48, fontFamily: HI_HAND, fontSize: 13, fontWeight: 700, color: T.inkSoft }}>{label}</div>
      <div style={{
        flex: 1, height: 10,
        background: T.paperDeep, border: `1.5px solid ${T.ink}`,
        borderRadius: 999, overflow: 'hidden',
      }}>
        <div style={{ width: `${value * 20}%`, height: '100%', background: color }} />
      </div>
      <div style={{ fontFamily: HI_DISP, fontSize: 14, color: T.ink, minWidth: 24, textAlign: 'right' }}>
        {value.toFixed(1)}
      </div>
    </div>
  );
}

Object.assign(window, {
  T, HI_HAND, HI_DISP,
  Screen, HiStatus, Icon, Stars, Pill, Button, Card, TabBarHi,
  FoodIllust, UL, SecLabel, AxisBar,
});
