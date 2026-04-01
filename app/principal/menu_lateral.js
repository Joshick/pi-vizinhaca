import supabase from "../conexao/supabse";

import "./principal.css"
import { useEffect, useState } from "react";


function Menu_lateral() {

const id_usuario = localStorage.getItem("id_usuario") 

    const [usuario, alteraUsuario] = useState([])

    async function buscarUsuario() {
        
        const {data, error} = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario)

        alteraUsuario(data[0])
    }

    useEffect(()=> {
        buscarUsuario()
    },[])

    return (

        <div className="col-2" >
            {/* LOGO + NOME */}
            <div className="text-center mt-3">
                <img src="https://placehold.co/100"></img>
                <h1> Amigo da Vizinhança</h1>
            </div>
            {/* LISTAGEM DAS PÁGINAS */}
            <div className="list-group list-group-flush">
                <a href="./principal" className="list-group-item list-group-item-action"><i className="bi bi-house"></i> Home </a>
                <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"><i className="bi bi-plus-lg"></i> Criar solicitação </a>

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
                    <a href="/" ><button>Sair</button></a>
                </div>
            </div>
            {/* MODAL PERFIL USUÁRIO */}
            <div className="modal fade" id="modalPerfil" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Perfil do Usuário</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <img src="https://placehold.co/100"></img>
                            <h5> Rayssa Silveira </h5>
                            <p className="text-muted">rayssa.admin@senac.com</p>
                            <p> Administrador do sistema </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Menu_lateral;
