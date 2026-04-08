'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import Menu_lateral from '../principal/menu_lateral'
import './sobre.css'

export default function Sobre() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Menu_lateral />

        <main className="col-10 p-4 area-sobre">
          <div className="container-fluid px-3 px-md-4">

            <div className="card card-sobre-principal mb-4">
              <div className="row g-0 align-items-stretch">

                <div className="col-lg-5">
                  <img
                    src="/img//equipe.jpeg"
                    alt="Equipe do projeto Amigo da Vizinhança"
                    className="img-equipe-final"
                  />
                </div>

                <div className="col-lg-7">
                  <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center h-100">
                    <span className="badge badge-pendente mb-3 badge-destaque">
                      Projeto Integrador
                    </span>

                    <h1 className="titulo-sobre mb-3">Amigo da Vizinhança</h1>

                    <p className="subtitulo-sobre mb-4">
                      Uma plataforma criada para dar mais voz aos moradores e ajudar
                      na identificação de problemas importantes da comunidade.
                    </p>

                    <p>
                      O <strong>Amigo da Vizinhança</strong> foi desenvolvido por{' '}
                      <strong>
                        <a
                          href="https://www.linkedin.com/in/jos%C3%A9hickelme/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-nome"
                        >
                          Hickelme
                        </a>,{' '}
                        <a
                          href="https://www.linkedin.com/in/rayssasilveira/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-nome"
                        >
                          Rayssa
                        </a>,{' '}
                        <a
                          href="https://www.linkedin.com/in/leonardo-naka-498338232/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-nome"
                        >
                          Leonardo
                        </a>{' '}
                        e <span className="nome-sem-link">Bárbara</span>
                      </strong>
                      , estudantes de programação do projeto{' '}
                      <strong>Transforme-se Serasa</strong>.
                    </p>

                    <p className="mb-0">
                      Durante o curso, recebemos o desafio de criar um projeto
                      com impacto real na cidade. Foi assim que surgiu a ideia de uma
                      plataforma voltada para o bairro, onde moradores podem registrar
                      situações como buracos, falta de médicos, mato alto e outros
                      problemas que afetam o dia a dia da população.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card h-100 card-info-final">
                  <div className="card-body p-4">
                    <div className="icone-topo mb-3">🎯</div>
                    <h3 className="titulo-secao">Nosso objetivo</h3>
                    <p>
                      Criar um espaço onde cada usuário possa registrar reclamações e
                      necessidades do seu bairro de forma simples, rápida e acessível.
                    </p>
                    <p className="mb-0">
                      O sistema ajuda a dar visibilidade a problemas como{' '}
                      <strong>buracos nas ruas</strong>,{' '}
                      <strong>falta de médico</strong>,{' '}
                      <strong>mato alto</strong>, iluminação precária e outras
                      situações que merecem atenção.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 card-info-final">
                  <div className="card-body p-4">
                    <div className="icone-topo mb-3">🌱</div>
                    <h3 className="titulo-secao">Nossa missão</h3>
                    <p>
                      Usar a tecnologia como ferramenta de transformação social,
                      fortalecendo a participação da comunidade e aproximando a
                      população dos problemas do próprio bairro.
                    </p>
                    <p className="mb-0">
                      Mais do que registrar reclamações, queremos incentivar uma
                      cidade mais organizada, participativa e consciente das suas
                      prioridades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-equipe-final">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                  <div>
                    <h3 className="titulo-secao mb-1">Equipe responsável</h3>
                    <p className="mb-0 texto-apoio">
                      Conheça os integrantes do desenvolvimento do projeto
                    </p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6 col-xl-3">
                    <a
                      href="https://www.linkedin.com/in/jos%C3%A9hickelme/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <div className="card integrante-card h-100">
                        <div className="card-body text-center p-4">
                          <div className="avatar-equipe mb-3">H</div>
                          <h5 className="mb-1">Hickelme</h5>
                          <p className="cargo-equipe">Desenvolvimento</p>
                          <span className="linkedin-tag">LinkedIn</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <a
                      href="https://www.linkedin.com/in/rayssasilveira/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <div className="card integrante-card h-100">
                        <div className="card-body text-center p-4">
                          <div className="avatar-equipe mb-3">R</div>
                          <h5 className="mb-1">Rayssa</h5>
                          <p className="cargo-equipe">Desenvolvimento</p>
                          <span className="linkedin-tag">LinkedIn</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <a
                      href="https://www.linkedin.com/in/leonardo-naka-498338232/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <div className="card integrante-card h-100">
                        <div className="card-body text-center p-4">
                          <div className="avatar-equipe mb-3">L</div>
                          <h5 className="mb-1">Leonardo</h5>
                          <p className="cargo-equipe">Desenvolvimento</p>
                          <span className="linkedin-tag">LinkedIn</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <div className="card integrante-card h-100">
                      <div className="card-body text-center p-4">
                        <div className="avatar-equipe mb-3">B</div>
                        <h5 className="mb-1">Bárbara</h5>
                        <p className="cargo-equipe">Desenvolvimento</p>
                        <span className="linkedin-tag linkedin-off">Em breve</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <a href="/principal" className="btn btn-minhas btn-voltar-final">
                    Voltar para a página inicial
                  </a>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}