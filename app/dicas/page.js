'use client'
import { useState, useEffect, useRef } from "react"
import Menu_lateral from "../principal/menu_lateral"; // ajusta o caminho se precisar

const dicas = [
  {
    id: 1, num: "01", emoji: "🌱",
    titulo: "Mantenha o bairro limpo",
    descricao: "Evite jogar lixo nas ruas e respeite os dias de coleta. Um bairro limpo começa com cada morador.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=85",
    tag: "Limpeza", accent: "#4ade80", accentDark: "#16a34a",
  },
  {
    id: 2, num: "02", emoji: "🤝",
    titulo: "Ajude seus vizinhos",
    descricao: "Seja solidário. Pequenas atitudes fortalecem os laços da comunidade e criam um ambiente mais seguro.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=85",
    tag: "Comunidade", accent: "#34d399", accentDark: "#059669",
  },
  {
    id: 3, num: "03", emoji: "🚨",
    titulo: "Denuncie problemas",
    descricao: "Use a plataforma para relatar buracos, falhas na iluminação e questões de segurança pública.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85",
    tag: "Segurança", accent: "#fb923c", accentDark: "#ea580c",
  },
  {
    id: 4, num: "04", emoji: "🌳",
    titulo: "Preserve áreas verdes",
    descricao: "Não destrua árvores e cuide dos espaços públicos. A natureza urbana melhora nossa qualidade de vida.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=85",
    tag: "Meio Ambiente", accent: "#86efac", accentDark: "#15803d",
  },
  {
    id: 5, num: "05", emoji: "🐶",
    titulo: "Cuide dos animais",
    descricao: "Evite o abandono e mantenha seus pets em segurança. Animais cuidados fazem parte de uma boa vizinhança.",
    img: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=800&q=85",
    tag: "Animais", accent: "#fbbf24", accentDark: "#d97706",
  },
  {
    id: 6, num: "06", emoji: "💡",
    titulo: "Economize energia",
    descricao: "Ajude o planeta evitando desperdícios. Apague luzes desnecessárias e adote fontes renováveis.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=85",
    tag: "Sustentabilidade", accent: "#a78bfa", accentDark: "#7c3aed",
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Card({ dica, index }) {
  const [ref, visible] = useInView()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      ref={ref}
      className="dica-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s cubic-bezier(.22,.68,0,1.2) ${index * 0.1}s`,
        "--accent": dica.accent,
        "--accent-dark": dica.accentDark,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="card-watermark">{dica.num}</span>
      <div className="card-img-wrap">
        <img src={dica.img} alt={dica.titulo} style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }} />
        <div className="card-img-overlay" />
        <span className="card-tag">{dica.tag}</span>
      </div>
      <div className="card-body">
        <div className="card-emoji-row">
          <span className="card-emoji">{dica.emoji}</span>
          <div className="card-accent-line" />
        </div>
        <h3 className="card-titulo">{dica.titulo}</h3>
        <p className="card-desc">{dica.descricao}</p>
      </div>
      <div className="card-glow" style={{ opacity: hovered ? 1 : 0 }} />
    </div>
  )
}

function FooterStrip() {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`dicas-footer ${visible ? "visible" : ""}`}>
      <div className="footer-text">
        <h4>Juntos por um bairro melhor</h4>
        <p>Cada ação conta. Faça sua parte todos os dias.</p>
      </div>
      <div className="footer-badge">
        <div className="footer-badge-dot" />
        <span>Plataforma ativa</span>
      </div>
    </div>
  )
}

export default function Dicas() {
  const [heroRef, heroVisible] = useInView(0.1)
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --green-900: #052e16;
          --green-800: #14532d;
          --green-700: #15803d;
          --green-400: #4ade80;
          --green-200: #bbf7d0;
          --surface: #f0faf3;
          --text-main: #0f1a13;
          --text-muted: #6b7280;
          --card-bg: #ffffff;
        }

        * { box-sizing: border-box; }

        .dicas-page {
          font-family: 'Outfit', sans-serif;
          background: var(--surface);
          min-height: 100vh;
          padding: 0;
          position: relative;
        }

        .dicas-page::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }

        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 { width:500px; height:500px; top:-180px; right:-120px; background: radial-gradient(circle, rgba(74,222,128,0.18), transparent 70%); }
        .blob-2 { width:380px; height:380px; bottom:-100px; left:-80px; background: radial-gradient(circle, rgba(52,211,153,0.15), transparent 70%); }
        .blob-3 { width:260px; height:260px; top:50%; left:50%; background: radial-gradient(circle, rgba(134,239,172,0.12), transparent 70%); }

        .dicas-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 40px 80px;
        }

        @media (max-width: 768px) { .dicas-inner { padding: 32px 20px 60px; } }

        /* HERO */
        .dicas-hero {
          position: relative;
          margin-bottom: 72px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.2);
        }
        .dicas-hero.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 640px) { .dicas-hero { grid-template-columns: 1fr; } .hero-stat-block { display: none; } }

        .hero-eyebrow { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
        .hero-eyebrow-dot {
          width:8px; height:8px; border-radius:50%; background:var(--green-400);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }
        .hero-eyebrow-text { font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--green-700); }

        .hero-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 78px);
          font-weight: 900;
          color: var(--green-900);
          line-height: 1.0;
          margin: 0 0 20px;
          letter-spacing: -2px;
        }
        .hero-heading em { font-style:italic; font-weight:700; color:var(--green-700); display:block; }

        .hero-divider { width:60px; height:3px; background:linear-gradient(to right, var(--green-400), var(--green-700)); border-radius:2px; margin-bottom:20px; }

        .hero-sub { font-size:17px; color:var(--text-muted); font-weight:300; max-width:460px; line-height:1.7; margin:0; }

        .hero-stat-block { display:flex; flex-direction:column; align-items:flex-end; gap:4px; padding-bottom:8px; }
        .hero-stat-num {
          font-family:'Playfair Display',serif; font-size:96px; font-weight:900; line-height:1;
          color:transparent; -webkit-text-stroke:2px var(--green-200); letter-spacing:-4px; user-select:none;
        }
        .hero-stat-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--green-700); font-weight:600; text-align:right; }

        /* SECTION LABEL */
        .section-label { display:flex; align-items:center; gap:16px; margin-bottom:36px; position:relative; z-index:1; }
        .section-label-text { font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--green-700); white-space:nowrap; }
        .section-label-rule { height:1px; flex:1; background:linear-gradient(to right, rgba(74,222,128,0.6), transparent); }

        /* GRID */
        .dicas-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        @media (max-width:1024px) { .dicas-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:580px)  { .dicas-grid { grid-template-columns:1fr; } }

        /* CARD */
        .dica-card {
          position:relative; background:var(--card-bg); border-radius:22px; overflow:hidden;
          border:1px solid rgba(0,0,0,0.055);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          display:flex; flex-direction:column;
        }
        .dica-card:hover {
          box-shadow: 0 24px 60px rgba(0,0,0,0.12), 0 0 0 1.5px var(--accent);
          border-color: transparent;
        }

        .card-watermark {
          position:absolute; top:-14px; right:14px;
          font-family:'Playfair Display',serif; font-size:110px; font-weight:900;
          color:rgba(0,0,0,0.04); line-height:1; pointer-events:none; user-select:none; z-index:0; letter-spacing:-4px;
        }

        .card-img-wrap { position:relative; height:195px; overflow:hidden; flex-shrink:0; }
        .card-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.55s cubic-bezier(.22,.68,0,1.2); }
        .card-img-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(5,46,22,0.55) 0%, transparent 50%); }
        .card-tag {
          position:absolute; bottom:14px; left:16px;
          font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
          color:#fff; background:var(--accent-dark); padding:5px 12px; border-radius:20px;
        }

        .card-body { position:relative; z-index:1; padding:22px 24px 26px; display:flex; flex-direction:column; gap:12px; flex:1; }
        .card-emoji-row { display:flex; align-items:center; gap:12px; }
        .card-emoji { font-size:28px; line-height:1; }
        .card-accent-line { height:2px; width:32px; background:var(--accent); border-radius:2px; transition:width 0.3s ease; }
        .dica-card:hover .card-accent-line { width:56px; }

        .card-titulo { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--text-main); margin:0; line-height:1.3; }
        .card-desc { font-size:13.5px; color:var(--text-muted); line-height:1.7; margin:0; font-weight:300; }

        .card-glow {
          position:absolute; bottom:0; left:0; right:0; height:3px;
          background:linear-gradient(to right, var(--accent), var(--accent-dark));
          transition:opacity 0.35s ease; border-radius:0 0 22px 22px;
        }

        /* FOOTER */
        .dicas-footer {
          margin-top:72px; padding:28px 36px;
          background:linear-gradient(130deg, var(--green-900), var(--green-800));
          border-radius:20px; display:flex; align-items:center; justify-content:space-between;
          gap:20px; position:relative; z-index:1; overflow:hidden;
          opacity:0; transform:translateY(24px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
        }
        .dicas-footer.visible { opacity:1; transform:translateY(0); }
        .dicas-footer::before {
          content:''; position:absolute; right:-60px; top:-60px;
          width:220px; height:220px; border-radius:50%; background:rgba(255,255,255,0.04);
        }
        .footer-text h4 { font-family:'Playfair Display',serif; font-size:20px; color:#fff; margin:0 0 6px; font-weight:700; }
        .footer-text p  { font-size:13px; color:rgba(255,255,255,0.6); margin:0; font-weight:300; }
        .footer-badge {
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.15);
          padding:10px 20px; border-radius:50px; white-space:nowrap; flex-shrink:0;
        }
        .footer-badge-dot { width:8px; height:8px; border-radius:50%; background:var(--green-400); animation:pulse-dot 2s ease-in-out infinite; }
        .footer-badge span:last-child { font-size:12px; color:rgba(255,255,255,0.85); font-weight:500; letter-spacing:0.5px; }

        @media (max-width:600px) { .dicas-footer { flex-direction:column; text-align:center; padding:24px 20px; } }
      `}</style>

      <div className="row">

        {/* MENU */}
        <Menu_lateral />

        {/* CONTEÚDO */}
        <div className="col-10 p-0">
          <div className="dicas-page">
            <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
            <div className="dicas-inner">

              <header ref={heroRef} className={`dicas-hero ${heroVisible ? "visible" : ""}`}>
                <div>
                  <div className="hero-eyebrow">
                    <div className="hero-eyebrow-dot" />
                    <span className="hero-eyebrow-text">Guia da Comunidade</span>
                  </div>
                  <h1 className="hero-heading">
                    Cuide do seu
                    <em>bairro.</em>
                  </h1>
                  <div className="hero-divider" />
                  <p className="hero-sub">
                    Pequenas atitudes cotidianas fazem uma diferença enorme para toda a comunidade ao redor.
                  </p>
                </div>
                <div className="hero-stat-block">
                  <span className="hero-stat-num">06</span>
                  <span className="hero-stat-label">dicas essenciais</span>
                </div>
              </header>

              <div className="section-label">
                <span className="section-label-text">Como contribuir</span>
                <div className="section-label-rule" />
              </div>

              <div className="dicas-grid">
                {dicas.map((dica, i) => <Card key={dica.id} dica={dica} index={i} />)}
              </div>

              <FooterStrip />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}