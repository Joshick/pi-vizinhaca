import supabase from "../conexao/supabse";

import "./principal.css"
import { useEffect, useState } from "react";


function Menu_lateral() {

  const id_usuario = localStorage.getItem("id_usuario")

  const [usuario, alteraUsuario] = useState([])

  async function buscarUsuario() {

    const { data, error } = await supabase
      .from("usuarios")
      .select()
      .eq("id", id_usuario)

    alteraUsuario(data[0])
  }

  useEffect(() => {
    buscarUsuario()
  }, [])

  return (

    <div className="col-2" >
      {/* LOGO + NOME */}
      <div className="text-center mt-3">
        <img width={200} src="/img/logoAtt.png" />
        <h1> </h1>
      </div>
      {/* LISTAGEM DAS PÁGINAS */}
      <div className="list-group list-group-flush">
        <a href="./principal" className="list-group-item list-group-item-action"><i className="bi bi-house"></i> Home </a>
        <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"><i className="bi bi-plus-lg"></i> Criar solicitação </a>
        <a href="/dicas" className="list-group-item list-group-item-action"> <i className="bi bi-lightbulb"></i> Dicas do Bairro </a>
        <a href="/sobre" className="list-group-item list-group-item-action"> <i className="bi bi-lightbulb"></i> Sobre nós </a>
        {
          usuario != null && usuario.admin == true ?
            <div>
              <a href="./usuarios" className="list-group-item list-group-item-action"><i className="bi bi-people-fill"></i> Usuários </a>
              <a href="./Bairros" className="list-group-item list-group-item-action"><i className="bi bi-pin-map"></i> Bairros </a>
              <a href="./aprovacao" className="list-group-item list-group-item-action"><i className="bi bi-check-all"></i> Aprovações </a>
            </div>
            :
            <div></div>
        }
      </div>
      {/* PERFIL INFERIOR */}
      <div className="text-center">
        <div>
          <button data-bs-toggle="modal" data-bs-target="#modalPerfil"> <i className="bi bi-person-circle"></i> Perfil </button>
          <a href="/" ><button> <i class="bi bi-box-arrow-right"></i> Sair </button></a>
        </div>
      </div>
      {/* MODAL PERFIL USUÁRIO */}
      {/* MODAL PERFIL USUÁRIO */}
      <div className="modal fade" id="modalPerfil" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-perfil">

            {/* CABEÇALHO MODAL */}
            <div className="modal-header">
              <h5 className="modal-title">Seu Perfil</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* CORPO MODAL */}
            <div className="modal-body text-center">
              <i className="bi bi-person-circle" style={{ fontSize: "50px", color: "#455c06" }}></i>

              <h5 className="mt-3">{usuario?.nome}</h5>
              <p className="text-muted">{usuario?.email}</p>

              {usuario?.admin && (
                <span>Administrador do sistema</span>
              )}
            </div>

            {/* FOOTER */}
            <div className="modal-footer justify-content-center">
              <button className="btn btn-success px-4">Editar Perfil</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Menu_lateral;
