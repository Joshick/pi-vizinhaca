"use client"
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"

import Link from "next/link"
import "./principal.css"

export default function Principal() {

    const [titulo, alteraTitulo] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [status, alteraStatus] = useState("")
    const [id_usuario, alteraIdUsuario] = useState()
    const [imagem, alteraImagem] = useState()

    const [listaSolicitacoes, alteraListaSolicitacoes] = useState([])

    async function buscar() {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select()

        console.log(data)
        alteraListaSolicitacoes(data)
    }

    async function salvar() {

        const objeto = {
            titulo: titulo,
            descricao: descricao,
            status: status,
            id_usuario: id_usuario,
            imagem: imagem

        }

        //VALIDAÇÕES
        if (objeto.titulo.length < 3) {
            alert("Titulo muito curto...")
            return
        }

        alteraListaSolicitacoes(listaSolicitacoes.concat(objeto))

        const { error } = await supabase
            .from('solicitacoes')
            .insert(objeto)

        console.log(error)

        if (error == null) {
            alert("Solicitação enviada com sucesso!")
            alteraTitulo("")
            alteraDescricao("")
            alteraStatus("")
            alteraImagem("")
        } else {
            alert("Dados inválidos!")

        }

    }

    useEffect(() => {
        buscar()
    }, [])

    return (
        <div className="row">
            {/* MENU LATERAL */}
            <div className="col-2" >
                {/* LOGO + NOME */}
                <div className="text-center mt-3">
                    <img src="https://placehold.co/100"></img>
                    <h1> Amigo da Vizinhança</h1>
                </div>

                {/* LISTAGEM DAS PÁGINAS */}
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action"> Home </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"> Criar solicitação </a>
                    <a href="/minhas_solicitacoes" className="list-group-item list-group-item-action"> Minhas solicitações </a>
                    <a href="./usuarios" className="list-group-item list-group-item-action"> Usuários </a>
                    <a href="./Bairros" className="list-group-item list-group-item-action"> Bairros </a>

                </div>

                {/* PERFIL INFERIOR */}
                <div className="text-center">
                    <div>
                        <button> <img src="https://placehold.co/25"></img> Perfil </button>
                        <Link href="/"><button>Sair</button></Link>
                    </div>
                </div>
            </div>

            {/* MENU PRINCIPAL */}
            <div className="col-9"
            >
                {/* INTRODUÇÃO */}
                <div className="mt-3">
                    <h2> 🏠 Home </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="row mt-5 align-items-center">
                    {/* PESQUISAR */}
                    <div className="col-md-9">
                        <div className="input-group">
                            <input className="form-control" placeholder="Pesquisar solicitações..." />
                            <button className="btn btn-outline-secondary">🔎</button>
                        </div>
                    </div>

                    {/* FILTRAR */}
                    <div className="col-md-3">
                        <select className="form-select filtro-select">
                            <option hidden>Filtrar status...</option>
                            <option> Todos </option>
                            <option> Novo </option>
                            <option> Em andamento </option>
                            <option> Fechado </option>
                            <option> Fechado </option>
                        </select>
                    </div>
                </div>

                {/* CARDS SOLICITAÇÕES */}
                <div className="row mt-3">
                    {listaSolicitacoes.map((solicitacao) => (
                        <div className="col-md-3 mb-3">
                            <div className="card h-100">
                                <img src={solicitacao.imagem} className="card-img-top" alt={solicitacao.titulo} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{solicitacao.titulo}</h5>
                                    <p className="card-text">{solicitacao.descricao}</p>
                                    <hr />
                                    <div className="mt-auto">
                                        <button className="btn btn-success"> 👍 </button>
                                        <button className="btn btn-danger ms-1"> 👎 </button>
                                        <button className="btn btn-primary ms-3"> + Comentar... </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL CRIAR SOLICITAÇÕES */}
            <div className="modal fade" id="modalCriar" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">

                        {/* TITULO MODAL */}
                        <div className="modal-header">
                            <h5 className="modal-title"> Nova Solicitação </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* CORPO MODAL */}
                        <div className="modal-body">

                            {/* TITULO */}
                            <div className="mb-3">
                                <label className="form-label"> Título </label>
                                <input onChange={e => alteraTitulo(e.target.value)} className="form-control" placeholder="Ex: Buraco na rua" />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mb-3">
                                <label className="form-label"> Descrição </label>
                                <textarea onChange={e => alteraDescricao(e.target.value)} className="form-control" rows="4" placeholder="Descreva o problema..."></textarea>
                            </div>

                            {/* IMAGEM */}
                            <div className="mb-3">
                                <label className="form-label">Imagem</label>
                                <input onChange={e => alteraImagem(e.target.value)} type="file" className="form-control" />
                            </div>
                        </div>

                        {/* RODAPÉ MODAL */}
                        <div className="modal-footer">
                            {/* BOTÃO ENVIAR */}
                            <button onClick={salvar} className="btn btn-primary" data-bs-dismiss="modal"> Enviar Solicitação </button>
                            {/* BOTÃO CANCELAR */}
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}