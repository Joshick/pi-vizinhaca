'use client'

import supabase from "../conexao/supabse"
import "./principal.css"
import { useEffect, useState } from "react"

function Menu_lateral() {
  const [usuario, alteraUsuario] = useState(null)
  const [idUsuario, alteraIdUsuario] = useState(null)

  const [menuAberto, alteraMenuAberto] = useState(false)
  const [editandoPerfil, alteraEditandoPerfil] = useState(false)
  const [editNome, alteraEditNome] = useState("")
  const [editEmail, alteraEditEmail] = useState("")

  // Estados Nova Solicitação
  const [titulo, alteraTitulo] = useState("")
  const [descricao, alteraDescricao] = useState("")
  const [imagemBase64, alteraImagemBase64] = useState("")

  useEffect(() => {
    const idSalvo = localStorage.getItem("id_usuario")

    if (idSalvo) {
      alteraIdUsuario(idSalvo)
    }
  }, [])

  async function buscarUsuario(id) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)

    if (error) {
      console.log(error)
      return
    }

    if (data && data.length > 0) {
      alteraUsuario(data[0])
    }
  }

  useEffect(() => {
    if (idUsuario) {
      buscarUsuario(idUsuario)
    }
  }, [idUsuario])

  function abrirEdicao() {
      alteraEditNome(usuario?.nome || "")
      alteraEditEmail(usuario?.email || "")
      alteraEditandoPerfil(true)
  }

  async function salvarPerfil() {
      const { error } = await supabase
        .from("usuarios")
        .update({ nome: editNome, email: editEmail })
        .eq("id", idUsuario)

      if (!error) {
         buscarUsuario(idUsuario)
         alteraEditandoPerfil(false)
         alert("Perfil atualizado!")
      } else {
         alert("Erro ao atualizar o perfil.")
      }
  }

  // Upload Imagem (Base64)
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        alteraImagemBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Salvar Nova Solicitação Global
  async function salvarSolicitacao() {
    if (!usuario) return alert("Houve um erro ao identificar o usuário.");
    if (titulo.length < 3) return alert("Título muito curto...");

    const objeto = {
        titulo: titulo,
        descricao: descricao,
        status: "",
        id_usuario: idUsuario,
        id_bairro: usuario.bairro, // No menu_lateral buscarUsuario, bairro é apenas o ID
        imagem: imagemBase64,
        andamento: "Novo"
    }

    const { error } = await supabase.from('solicitacoes').insert(objeto)

    if (!error) {
        alert("Solicitação enviada com sucesso!")
        alteraTitulo("")
        alteraDescricao("")
        alteraImagemBase64("")
        // Recarrega a tela suavemente para visualizar o post no caso de estar em /principal
        window.location.reload()
    } else {
        alert("Dados inválidos!")
        console.error(error)
    }
  }

  return (
    <>
      <button className="btn d-lg-none position-fixed top-0 start-0 m-3 shadow" style={{ zIndex: 1050, background: "#059669", color: "white" }} onClick={() => alteraMenuAberto(!menuAberto)}>
        <i className="bi bi-list"></i>
      </button>

      {menuAberto && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-lg-none" 
          style={{ opacity: 0.5, zIndex: 1030 }} 
          onClick={() => alteraMenuAberto(false)}
        ></div>
      )}

      {/* MODAIS FORA DO SIDEBAR PARA Z-INDEX CORRETO */}
      
      {/* MODAL PERFIL USUÁRIO */}
      <div className="modal fade" id="modalPerfil" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-perfil">
            <div className="modal-header">
              <h5 className="modal-title">Seu Perfil</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center">
              <i className="bi bi-person-circle" style={{ fontSize: "50px", color: "#065f46" }}></i>
              {!editandoPerfil ? (
                  <>
                      <h5 className="mt-3">{usuario?.nome}</h5>
                      <p className="text-muted">{usuario?.email}</p>
                      {usuario?.admin ? <span>Administrador do sistema</span> : <span>Usuário comum</span>}
                      <div className="mt-4">
                          <button className="btn btn-outline-success w-auto px-4" onClick={abrirEdicao}>Editar Perfil</button>
                      </div>
                  </>
              ) : (
                  <div className="mt-3 text-start px-3">
                      <label className="form-label mb-1">Nome:</label>
                      <input className="form-control mb-2" value={editNome} onChange={(e) => alteraEditNome(e.target.value)} />
                      <label className="form-label mb-1">Email:</label>
                      <input className="form-control mb-4" type="email" value={editEmail} onChange={(e) => alteraEditEmail(e.target.value)} />
                      <div className="d-flex justify-content-center gap-2">
                          <button className="btn text-white px-4" style={{ background: "#065f46" }} onClick={salvarPerfil}>Salvar</button>
                          <button className="btn btn-secondary px-4" onClick={() => alteraEditandoPerfil(false)}>Cancelar</button>
                      </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CRIAR SOLICITAÇÕES (GLOBAL) */}
      <div className="modal fade" id="modalCriarGlobal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title"> Nova Solicitação </h5>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                      {/* TITULO */}
                      <div className="mb-3">
                          <h5 className="text-secondary pb-2"> Usuário: {usuario?.nome} </h5>
                          <label className="form-label"> Título </label>
                          <input value={titulo} onChange={e => alteraTitulo(e.target.value)} className="form-control" placeholder="Ex: Buraco na rua" />
                      </div>
                      {/* DESCRIÇÃO */}
                      <div className="mb-3">
                          <label className="form-label"> Descrição </label>
                          <textarea value={descricao} onChange={e => alteraDescricao(e.target.value)} className="form-control" rows="4" placeholder="Descreva o problema..."></textarea>
                      </div>
                      {/* UPLOAD IMAGEM COM BASE64 */}
                      <div className="mb-3">
                          <label className="form-label d-block">Arquivo de Imagem</label>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
                          {imagemBase64 && (
                              <div className="mt-3 text-center">
                                  <img src={imagemBase64} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                              </div>
                          )}
                      </div>
                  </div>
                  <div className="modal-footer">
                      <button onClick={salvarSolicitacao} className="btn btn-primary" data-bs-dismiss="modal"> Enviar Solicitação </button>
                      <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  </div>
              </div>
          </div>
      </div>

      {/* SIDEBAR CONTAINER */}
      <div className={`col-12 col-lg-2 sidebar-fixa d-flex flex-column ${menuAberto ? "menu-aberto" : ""}`}>
        <div className="text-center mt-3">
          <img width={200} src="/img/LogoAtt.png" alt="Logo" />
          <h1></h1>
        </div>

        <div className="list-group list-group-flush mb-4 cursor-pointer">
          <a href="/principal" className="list-group-item list-group-item-action">
            <i className="bi bi-house"></i> Home
          </a>

          <a
            className="list-group-item list-group-item-action"
            style={{ cursor: 'pointer' }}
            data-bs-toggle="modal"
            data-bs-target="#modalCriarGlobal"
          >
            <i className="bi bi-plus-lg"></i> Criar solicitação
          </a>

          <a href="/dicas" className="list-group-item list-group-item-action">
            <i className="bi bi-lightbulb"></i> Dicas do Bairro
          </a>

          <a href="/sobre" className="list-group-item list-group-item-action">
            <i className="bi bi-info-circle"></i> Sobre nós
          </a>

          {usuario != null && usuario.admin == true && (
            <div>
              <a href="/usuarios" className="list-group-item list-group-item-action">
                <i className="bi bi-people-fill"></i> Usuários
              </a>
              <a href="/Bairros" className="list-group-item list-group-item-action">
                <i className="bi bi-pin-map"></i> Bairros
              </a>
              <a href="/aprovacao" className="list-group-item list-group-item-action">
                <i className="bi bi-check-all"></i> Aprovações
              </a>
            </div>
          )}
        </div>

        {/* PERFIL INFERIOR FORCADAMENTE EM BAIXO */}
        <div className="text-center mt-auto w-100 d-flex flex-column align-items-center pb-4">
            <button className="w-100 mb-2 btn-sidebar-action" data-bs-toggle="modal" data-bs-target="#modalPerfil">
              <i className="bi bi-person-circle"></i> Perfil
            </button>

            <a href="/" className="w-100 text-decoration-none d-block">
              <button className="w-100 btn-sidebar-action">
                <i className="bi bi-box-arrow-right"></i> Sair
              </button>
            </a>
        </div>
      </div>
    </>
  )
}

export default Menu_lateral