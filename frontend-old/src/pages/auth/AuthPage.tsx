import { useState } from "react";

const STR_COLORS = ["", "#EF4444", "#F97316", "#FBBF24", "#10B981"];
const STR_LABELS = ["Usa mayúsculas, números y símbolos", "Muy débil", "Débil", "Buena", "Fuerte ✓"];

const LOGIN_FEATS = [
  { icon: "🗺️", color: "#3B82F6", label: "Rutas adaptadas a tu nivel y objetivos" },
  { icon: "⚙️", color: "#06B6D4", label: "Retos de código con ejecución en tiempo real" },
  { icon: "📊", color: "#10B981", label: "Ranking y progreso visible en tu perfil" },
  { icon: "🎯", color: "#F59E0B", label: "Descubre tu carrera ideal" },
];

const REG_FEATS = [
  { icon: "🧭", color: "#3B82F6", label: "Descubre tu camino profesional ideal" },
  { icon: "📚", color: "#06B6D4", label: "Accede a rutas de aprendizaje curadas" },
  { icon: "💻", color: "#10B981", label: "Practica con retos reales de código" },
  { icon: "🏆", color: "#F59E0B", label: "Compite en el leaderboard global" },
];

function calcStrength(val: string): number {
  if (!val) return 0;
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return s;
}

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.78.11 3.07.73.81 1.18 1.83 1.18 3.09 0 4.44-2.69 5.41-5.25 5.7.41.35.78 1.04.78 2.1v3.11c0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
  </svg>
);

const AuthPage = () => {
  const [page, setPage] = useState<"login" | "register">("login");
  const [pwVal, setPwVal] = useState("");
  const [strength, setStrength] = useState(0);

  const handlePageChange = (p: "login" | "register") => {
    setPage(p);
    setPwVal("");
    setStrength(0);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPwVal(v);
    setStrength(calcStrength(v));
  };

  const isReg = page === "register";
  const feats = isReg ? REG_FEATS : LOGIN_FEATS;
  const strLabel = pwVal.length === 0 ? STR_LABELS[0] : STR_LABELS[strength];
  const strColor = pwVal.length === 0 ? "var(--c-muted)" : STR_COLORS[strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

:root {
  --c-base: #060810;
  --c-raised: #131820;
  --c-input: #161D2A;
  --c-border: rgba(255,255,255,0.055);
  --c-border-h: rgba(59,130,246,0.35);
  --c-blue: #3B82F6;
  --c-cyan: #22D3EE;
  --c-green: #10B981;
  --c-glow: rgba(59,130,246,0.18);
  --c-t1: #EEF2FF;
  --c-t2: #7C8DB0;
  --c-muted: #3D4A62;
  --ff-h: 'Syne', sans-serif;
  --ff-b: 'DM Sans', sans-serif;
  --r-sm: 8px;
  --r-md: 12px;
  --r-pill: 9999px;
  --ease-s: cubic-bezier(0.34,1.56,0.64,1);
  --ease-o: cubic-bezier(0.16,1,0.3,1);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

.auth { font-family: var(--ff-b); background: var(--c-base); color: var(--c-t1); min-height: 100vh; }

.auth-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.auth-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 52px 52px; mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%); }
.auth-orb { position: absolute; border-radius: 50%; filter: blur(80px); }
.auth-orb-1 { width: 560px; height: 560px; top: -180px; left: -130px; background: radial-gradient(circle, rgba(37,99,235,0.1), transparent 65%); animation: drift1 14s ease-in-out infinite alternate; }
.auth-orb-2 { width: 460px; height: 460px; bottom: -150px; right: -90px; background: radial-gradient(circle, rgba(6,182,212,0.08), transparent 65%); animation: drift2 18s ease-in-out infinite alternate; }
.auth-orb-3 { width: 260px; height: 260px; top: 42%; left: 46%; background: radial-gradient(circle, rgba(16,185,129,0.05), transparent 65%); animation: drift3 22s ease-in-out infinite alternate; }
@keyframes drift1 { to { transform: translate(40px, 30px); } }
@keyframes drift2 { to { transform: translate(-30px, -40px); } }
@keyframes drift3 { from { transform: translate(-20px, -20px); } to { transform: translate(20px, 20px); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes cardIn { to { opacity: 1; transform: translateY(0); } }

.auth-nav { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 100; display: flex; gap: 2px; padding: 4px; background: rgba(13,17,23,0.85); backdrop-filter: blur(24px); border: 1px solid var(--c-border); border-radius: var(--r-pill); box-shadow: 0 4px 24px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04); }
.auth-tab { font-family: var(--ff-h); font-size: 13px; font-weight: 600; letter-spacing: .01em; padding: 9px 24px; border-radius: var(--r-pill); border: none; cursor: pointer; color: var(--c-muted); background: transparent; transition: color .2s, background .2s, box-shadow .2s; white-space: nowrap; }
.auth-tab.on { color: #fff; background: var(--c-blue); box-shadow: 0 0 20px rgba(59,130,246,.5), inset 0 1px 0 rgba(255,255,255,.12); }

.auth-layout { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }

.auth-left { display: flex; flex-direction: column; justify-content: center; padding: 80px 56px; border-right: 1px solid var(--c-border); position: relative; overflow: hidden; gap: 0; }
.auth-left::after { content: ''; position: absolute; inset: 0; background: linear-gradient(140deg, rgba(59,130,246,0.03) 0%, transparent 50%); pointer-events: none; }
.auth-left-top { display: flex; flex-direction: column; }

.auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 44px; position: relative; }
.auth-logo-mark { width: 38px; height: 38px; background: linear-gradient(135deg, #2563EB, #06B6D4); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; box-shadow: 0 0 22px rgba(37,99,235,.45), inset 0 1px 0 rgba(255,255,255,.2); }
.auth-logo-name { font-family: var(--ff-h); font-size: 19px; font-weight: 700; letter-spacing: -.3px; color: var(--c-t1); }
.auth-logo-name span { color: var(--c-cyan); }

.auth-badge { display: inline-flex; align-items: center; gap: 7px; padding: 6px 13px; width: fit-content; background: rgba(16,185,129,.07); border: 1px solid rgba(16,185,129,.15); border-radius: var(--r-pill); font-size: 13px; font-weight: 500; color: var(--c-green); margin-bottom: 20px; }
.auth-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--c-green); animation: blink 2s infinite; }

.auth-headline { font-family: var(--ff-h); font-size: 42px; font-weight: 800; line-height: 1.1; letter-spacing: -1.4px; margin-bottom: 18px; position: relative; }
.auth-headline em { font-style: normal; background: linear-gradient(120deg, #60A5FA, #22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.auth-sub { font-size: 15px; font-weight: 300; color: var(--c-t2); line-height: 1.8; max-width: 360px; margin-bottom: 36px; position: relative; }

.auth-feats { display: flex; flex-direction: column; gap: 14px; position: relative; }
.auth-feat { display: flex; align-items: center; gap: 13px; font-size: 15px; color: var(--c-t2); transition: color .2s; }
.auth-feat:hover { color: var(--c-t1); }
.auth-feat-icon { width: 32px; height: 32px; border-radius: var(--r-sm); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255,255,255,.05); transition: transform .2s var(--ease-s); }
.auth-feat:hover .auth-feat-icon { transform: scale(1.1); }

.auth-snippet { margin-top: 36px; padding: 16px 18px; background: rgba(13,17,23,.75); border: 1px solid var(--c-border); border-radius: var(--r-md); backdrop-filter: blur(8px); font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.9; color: var(--c-muted); pointer-events: none; width: fit-content; max-width: 230px; }
.snip-kw { color: #7C9BF0; }
.snip-fn { color: #67D7C2; }
.snip-str { color: #F9C97C; }
.snip-cm { color: #4A5568; }

.auth-right { display: flex; align-items: center; justify-content: center; padding: 80px 52px; }

.auth-topbar { display: none; }
.auth-mini-hero { display: none; }

@media (max-width: 820px) {
  .auth-nav { display: none; }
  .auth-left { display: none; }
  .auth-layout { grid-template-columns: 1fr; min-height: unset; }

  .auth-topbar { display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; padding: 0 24px; height: 58px; background: rgba(6,8,16,.92); backdrop-filter: blur(20px); border-bottom: 1px solid var(--c-border); }
  .auth-topbar-logo { display: flex; align-items: center; gap: 9px; }
  .auth-topbar-mark { width: 30px; height: 30px; background: linear-gradient(135deg, #2563EB, #06B6D4); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 0 14px rgba(37,99,235,.4); }
  .auth-topbar-name { font-family: var(--ff-h); font-size: 16px; font-weight: 700; color: var(--c-t1); }
  .auth-topbar-name span { color: var(--c-cyan); }
  .auth-topbar-tabs { display: flex; gap: 2px; padding: 3px; background: rgba(19,24,32,.9); border: 1px solid var(--c-border); border-radius: var(--r-pill); }
  .auth-topbar-tab { font-family: var(--ff-h); font-size: 11.5px; font-weight: 600; padding: 6px 16px; border-radius: var(--r-pill); border: none; cursor: pointer; background: transparent; color: var(--c-muted); white-space: nowrap; transition: color .2s, background .2s; }
  .auth-topbar-tab.on { color: #fff; background: var(--c-blue); box-shadow: 0 0 14px rgba(59,130,246,.4); }

  .auth-mini-hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 36px 24px 28px; border-bottom: 1px solid var(--c-border); position: relative; overflow: hidden; }
  .auth-mini-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 100% at 50% 0%, rgba(37,99,235,.06), transparent); }
  .auth-mini-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; margin-bottom: 14px; background: rgba(16,185,129,.07); border: 1px solid rgba(16,185,129,.15); border-radius: var(--r-pill); font-size: 12px; font-weight: 500; color: var(--c-green); position: relative; }
  .auth-mini-hed { font-family: var(--ff-h); font-size: 26px; font-weight: 800; line-height: 1.15; letter-spacing: -.6px; margin-bottom: 10px; position: relative; }
  .auth-mini-hed em { font-style: normal; background: linear-gradient(120deg, #60A5FA, #22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .auth-mini-sub { font-size: 14px; font-weight: 300; color: var(--c-t2); max-width: 340px; line-height: 1.75; margin-bottom: 20px; position: relative; }
  .auth-mini-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; max-width: 400px; position: relative; }
  .auth-mini-feat { display: flex; align-items: center; gap: 8px; padding: 10px 13px; background: rgba(19,24,32,.7); border: 1px solid var(--c-border); border-radius: var(--r-md); font-size: 13px; color: var(--c-t2); text-align: left; }

  .auth-right { padding: 32px 24px 60px; align-items: flex-start; }
  .auth-card { max-width: 480px; }
}

@media (max-width: 479px) {
  .auth-topbar { padding: 0 16px; }
  .auth-mini-hero { padding: 22px 16px 18px; }
  .auth-mini-hed { font-size: 21px; }
  .auth-mini-sub { font-size: 12.5px; margin-bottom: 0; }
  .auth-mini-feats { display: none !important; }
  .auth-right { padding: 20px 16px 52px; }
  .auth-row2 { grid-template-columns: 1fr; }
  .auth-input { font-size: 16px !important; }
  .auth-social-btn { padding: 12px 10px; font-size: 12.5px; }
}

.auth-card { width: 100%; max-width: 392px; opacity: 0; transform: translateY(14px); animation: cardIn .45s var(--ease-o) .05s forwards; }
.auth-card-title { font-family: var(--ff-h); font-size: 28px; font-weight: 700; letter-spacing: -.5px; margin-bottom: 7px; color: var(--c-t1); }
.auth-card-sub { font-size: 14.5px; font-weight: 300; color: var(--c-t2); margin-bottom: 28px; }
.auth-card-sub a { color: var(--c-cyan); font-weight: 500; text-decoration: none; cursor: pointer; border-bottom: 1px solid rgba(34,211,238,.3); transition: border-color .2s; }
.auth-card-sub a:hover { border-color: var(--c-cyan); }

.auth-socials { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }
.auth-social-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 14px; background: var(--c-raised); border: 1px solid var(--c-border); border-radius: var(--r-md); color: var(--c-t1); font-family: var(--ff-b); font-size: 14px; font-weight: 500; cursor: pointer; min-height: 46px; transition: background .2s, border-color .2s, transform .15s var(--ease-s), box-shadow .2s; }
.auth-social-btn:hover { border-color: var(--c-border-h); background: rgba(59,130,246,.06); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.3); }
.auth-social-btn:active { transform: translateY(0); }

.auth-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; font-size: 13px; font-weight: 500; color: var(--c-t2); letter-spacing: .04em; text-transform: uppercase; }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--c-border), transparent); }

.auth-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.auth-field { margin-bottom: 14px; }
.auth-label { display: block; font-size: 12px; font-weight: 600; color: var(--c-t2); margin-bottom: 7px; letter-spacing: .07em; text-transform: uppercase; }

.auth-input { width: 100%; padding: 12px 14px; background: var(--c-input); border: 1px solid rgba(255,255,255,.065); border-radius: var(--r-md); color: var(--c-t1); font-family: var(--ff-b); font-size: 15px; font-weight: 400; outline: none; transition: border-color .2s, background .2s, box-shadow .2s; }
.auth-input::placeholder { color: var(--c-muted); font-weight: 300; }
.auth-input:hover { border-color: rgba(255,255,255,.1); }
.auth-input:focus { border-color: var(--c-blue); background: rgba(59,130,246,.05); box-shadow: 0 0 0 3px var(--c-glow); }

.auth-strength { margin-top: 9px; }
.auth-strength-bars { display: flex; gap: 4px; margin-bottom: 6px; }
.auth-strength-bar { height: 3px; flex: 1; border-radius: 2px; background: rgba(255,255,255,.06); transition: background .35s, transform .2s; }
.auth-strength-bar.filled { transform: scaleY(1.5); transform-origin: bottom; }
.auth-strength-hint { font-size: 12px; font-weight: 500; transition: color .3s; }

.auth-forgot-row { display: flex; justify-content: flex-end; margin: -2px 0 16px; }
.auth-forgot-btn { font-family: var(--ff-b); font-size: 13px; font-weight: 500; color: var(--c-cyan); background: none; border: none; cursor: pointer; padding: 2px 0; border-bottom: 1px solid transparent; min-height: 44px; transition: border-color .2s; }
.auth-forgot-btn:hover { border-color: rgba(34,211,238,.4); }

.auth-submit-wrap { margin-top: 20px; }
.auth-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border: none; border-radius: var(--r-md); color: #fff; font-family: var(--ff-h); font-size: 15px; font-weight: 700; letter-spacing: .02em; cursor: pointer; position: relative; overflow: hidden; min-height: 50px; box-shadow: 0 4px 20px rgba(59,130,246,.3), inset 0 1px 0 rgba(255,255,255,.12); transition: transform .15s var(--ease-s), box-shadow .2s; }
.auth-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.08), transparent); opacity: 0; transition: opacity .2s; }
.auth-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(59,130,246,.45), inset 0 1px 0 rgba(255,255,255,.15); }
.auth-submit:hover::before { opacity: 1; }
.auth-submit:active { transform: translateY(0); }

.auth-terms { font-size: 12px; font-weight: 300; color: var(--c-muted); text-align: center; margin-top: 16px; line-height: 1.7; }
.auth-terms a { color: var(--c-t2); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; transition: color .2s; }
.auth-terms a:hover { color: var(--c-t1); }
      `}</style>

      <div className="auth">
        <div className="auth-bg">
          <div className="auth-grid" />
          <div className="auth-orb auth-orb-1" />
          <div className="auth-orb auth-orb-2" />
          <div className="auth-orb auth-orb-3" />
        </div>

        {/* Desktop nav */}
        <nav className="auth-nav">
          <button className={`auth-tab ${!isReg ? "on" : ""}`} onClick={() => handlePageChange("login")}>Iniciar sesión</button>
          <button className={`auth-tab ${isReg ? "on" : ""}`} onClick={() => handlePageChange("register")}>Registrarse</button>
        </nav>

        {/* Mobile topbar */}
        <div className="auth-topbar">
          <div className="auth-topbar-logo">
            <div className="auth-topbar-mark">⚡</div>
            <div className="auth-topbar-name">Path<span>Forge</span></div>
          </div>
          <div className="auth-topbar-tabs">
            <button className={`auth-topbar-tab ${!isReg ? "on" : ""}`} onClick={() => handlePageChange("login")}>Entrar</button>
            <button className={`auth-topbar-tab ${isReg ? "on" : ""}`} onClick={() => handlePageChange("register")}>Registro</button>
          </div>
        </div>

        {/* Mobile mini-hero */}
        <div className="auth-mini-hero">
          <div className="auth-mini-badge">
            <div className="auth-dot" />
            {isReg ? "Gratis para siempre · Sin tarjeta" : "1,200+ developers activos"}
          </div>
          <h1 className="auth-mini-hed">
            {isReg ? <>Empieza a forjar tu <em>carrera.</em></> : <>Tu camino al siguiente <em>nivel.</em></>}
          </h1>
          <p className="auth-mini-sub">
            {isReg ? "Únete a miles de developers construyendo su camino profesional." : "Rutas personalizadas, retos reales y una comunidad que te impulsa."}
          </p>
          <div className="auth-mini-feats">
            {feats.map((f, i) => (
              <div className="auth-mini-feat" key={i}>
                <span style={{ fontSize: 14 }}>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-layout">
          {/* Left panel */}
          <div className="auth-left">
            <div className="auth-left-top">
              <div className="auth-logo">
                <div className="auth-logo-mark">⚡</div>
                <div className="auth-logo-name">Path<span>Forge</span></div>
              </div>
              <div className="auth-badge">
                <div className="auth-dot" />
                {isReg ? "Gratis para siempre · Sin tarjeta" : "1,200+ developers activos"}
              </div>
              <h1 className="auth-headline">
                {isReg ? <>Empieza a<br />forjar tu <em>carrera.</em></> : <>Tu camino al<br />siguiente <em>nivel.</em></>}
              </h1>
              <p className="auth-sub">
                {isReg ? "Únete a miles de developers construyendo su camino profesional con PathForge." : "Rutas personalizadas, retos reales y una comunidad que te impulsa a crecer como developer."}
              </p>
              <div className="auth-feats">
                {feats.map((f, i) => (
                  <div className="auth-feat" key={i}>
                    <div className="auth-feat-icon" style={{ background: `${f.color}14` }}>{f.icon}</div>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="auth-snippet">
              <span className="snip-cm">// PathForge</span><br />
              <span className="snip-kw">const</span> path = <span className="snip-kw">await</span><br />
              &nbsp;&nbsp;<span className="snip-fn">generateRoadmap</span>(<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="snip-str">"Full-stack dev"</span><br />
              &nbsp;&nbsp;);<br />
              <span className="snip-cm">// ✓ 12 etapas listas</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="auth-right">
            <div className="auth-card" key={page}>
              <h2 className="auth-card-title">{isReg ? "Crea tu cuenta" : "Bienvenido de vuelta"}</h2>
              <p className="auth-card-sub">
                {isReg
                  ? <> ¿Ya tienes cuenta? <a onClick={() => handlePageChange("login")}>Inicia sesión</a></>
                  : <>¿No tienes cuenta? <a onClick={() => handlePageChange("register")}>Créala gratis</a></>
                }
              </p>

              <div className="auth-socials">
                <button className="auth-social-btn"><GoogleIcon /> Google</button>
                <button className="auth-social-btn"><GithubIcon /> GitHub</button>
              </div>

              <div className="auth-divider">{isReg ? "o regístrate con email" : "o continúa con email"}</div>

              {isReg && (
                <div className="auth-row2">
                  <div>
                    <label className="auth-label">Nombre</label>
                    <input type="text" className="auth-input" placeholder="Juan" />
                  </div>
                  <div>
                    <label className="auth-label">Apellido</label>
                    <input type="text" className="auth-input" placeholder="Pérez" />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label">Email</label>
                <input type="email" className="auth-input" placeholder="tu@email.com" autoComplete="email" />
              </div>

              <div className="auth-field">
                <label className="auth-label">Contraseña</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder={isReg ? "Mínimo 8 caracteres" : "Tu contraseña"}
                  value={isReg ? pwVal : undefined}
                  onChange={isReg ? handlePwChange : undefined}
                  autoComplete={isReg ? "new-password" : "current-password"}
                />
                {isReg && (
                  <div className="auth-strength">
                    <div className="auth-strength-bars">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`auth-strength-bar ${i <= strength ? "filled" : ""}`}
                          style={{ background: i <= strength ? STR_COLORS[strength] : undefined }}
                        />
                      ))}
                    </div>
                    <div className="auth-strength-hint" style={{ color: strColor }}>{strLabel}</div>
                  </div>
                )}
              </div>

              {!isReg && (
                <div className="auth-forgot-row">
                  <button className="auth-forgot-btn">¿Olvidaste tu contraseña?</button>
                </div>
              )}

              <div className="auth-submit-wrap">
                <button className="auth-submit">
                  {isReg ? "Crear cuenta gratis →" : "Iniciar sesión →"}
                </button>
              </div>

              <p className="auth-terms">
                Al {isReg ? "registrarte" : "ingresar"} aceptas nuestros{" "}
                <a>Términos de uso</a> y <a>Política de privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;