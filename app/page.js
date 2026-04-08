import styles from "./page.module.css";

import Link from "next/link";

export default function Home() {
  return (
    <>


    <Link className={styles.btnAjuda} href="/ajuda">
          Ajuda.
      </Link>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <div className={styles.navbarLogo}>🕷️</div>
          <div>
            <div className={styles.navbarTitle}>Amigo da Vizinhança</div>
            <div className={styles.navbarSubtitle}>Ajude a melhorar o seu bairro</div>
          </div>
        </div>
        <div className={styles.navbarActions}>
          <a href="/login" className={styles.btnOutline}>Login</a>
          <a href="/cadastrar" className={styles.btnSolid}>Cadastrar</a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>🏘️ Plataforma comunitária</div>
        <h1 className={styles.heroTitle}>
          Seu bairro merece<br />o melhor
        </h1>
        <p className={styles.heroSubtitle}>
          Reporte, acompanhe e vote nos problemas da sua região. Juntos fazemos a diferença.
        </p>
        <div className={styles.heroCta}>
          <a href="/cadastrar" className={styles.btnHeroPrimary}>Criar conta grátis</a>
          <a href="#como-funciona" className={styles.btnHeroSecondary}>Ver como funciona</a>
        </div>
      </section>

      {/* STATS BAR */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNum}>1.2k+</div>
          <div className={styles.statLabel}>Problemas reportados</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>48</div>
          <div className={styles.statLabel}>Bairros ativos</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>890</div>
          <div className={styles.statLabel}>Usuários cadastrados</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>320</div>
          <div className={styles.statLabel}>Resoluções concluídas</div>
        </div>
      </div>

      {/* POR QUE USAR */}
      <section className={`${styles.section} ${styles.sectionCenter}`}>
        <span className={styles.sectionTag}>Por que usar</span>
        <h2 className={styles.sectionTitle}>
          Uma plataforma completa<br />para sua comunidade
        </h2>
        <p className={styles.sectionLead}>
          Tudo que você precisa para organizar e resolver os problemas do seu bairro.
        </p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📍</div>
            <h3>Relatos por Bairro</h3>
            <p>Veja e reporte problemas específicos do seu bairro com localização precisa.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📋</div>
            <h3>Acompanhamento</h3>
            <p>Monitore o status de resolução de cada problema em tempo real.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👍</div>
            <h3>Sistema de Votação</h3>
            <p>Vote nos problemas mais urgentes e ajude a priorizar o que importa.</p>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className={`${styles.section} ${styles.howSection} ${styles.sectionCenter}`}
      >
        <span className={styles.sectionTag}>Como funciona</span>
        <h2 className={styles.sectionTitle}>Simples, rápido e eficiente</h2>
        <p className={styles.sectionLead}>
          Em três passos você já está contribuindo com o seu bairro.
        </p>
        <div className={styles.stepsGrid}>
          <div className={styles.stepItem}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepConnector}></div>
            <h3>Cadastre-se</h3>
            <p>Crie sua conta e informe o seu bairro.</p>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepConnector}></div>
            <h3>Relate problemas</h3>
            <p>Registre o que você identifica na sua região.</p>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepConnector}></div>
            <h3>Vote e acompanhe</h3>
            <p>Vote e veja o andamento das soluções.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <h2>Pronto para transformar seu bairro?</h2>
        <p>Junte-se a centenas de vizinhos que já fazem parte da comunidade.</p>
        <a href="/cadastrar" className={styles.btnCtaPrimary}>
          Começar agora — é grátis
        </a>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        © 2025 Amigo da Vizinhança · Grandes responsabilidades, comunidade forte
      </footer>

      

    </>
  );
}

