"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Link from "next/link"
import "./principal.css"

export default function Principal() {

    const [titulo, alteraTitulo] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [status, alteraStatus] = useState("")
    const [id_usuario, alteraIdUsuario] = useState()
    const [imagem, alteraImagem] = useState()

    const [minhasSolicitacoes, alteraMinhasSolicitacoes] = useState(false)

    const [listaSolicitacoes, alteraListaSolicitacoes] = useState([])
    const params = useParams()

    function botaoTodasSolicitacoes() {

        alteraMinhasSolicitacoes(true)

    }

    {/* EDITAR LIVROS */ }
    function botaoMinhasSolicitacoes() {

        alteraMinhasSolicitacoes(false)

    }

    async function buscarMinhasSolicitacoes() {

        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*),
                id_bairros (*)
                `)
            .eq('id_usuario', '60')

        alteraListaSolicitacoes(data)
        console.log(error)

    }

    async function buscar() {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*),
                id_bairros (*)
            `)

        console.log(error)
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
            alteraImagem()
        } else {
            alert("Dados inválidos!")

        }

    }

    async function excluir(id) {
        const opcao = confirm("Tem certeza que deseja excluir?")
        if (opcao == false) {
            return
        }
        const response = await supabase
            .from('solicitacoes')
            .delete()
            .eq('id', id)

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
                    <a href="#" className="list-group-item list-group-item-action"><i className="bi bi-house"></i> Home </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"><i class="bi bi-plus-lg"></i> Criar solicitação </a>
                    <a href="./usuarios" className="list-group-item list-group-item-action"><i class="bi bi-people-fill"></i> Usuários </a>
                    <a href="./Bairros" className="list-group-item list-group-item-action"><i class="bi bi-pin-map"></i> Bairros </a>
                    <a href="./aprovacao" className="list-group-item list-group-item-action"><i class="bi bi-check-all"></i> Aprovações </a>
                </div>

                {/* PERFIL INFERIOR */}
                <div className="text-center">
                    <div>
                        <button data-bs-toggle="modal" data-bs-target="#modalPerfil"> <i class="bi bi-person-circle"></i> Perfil </button>
                        <Link href="/"><button>Sair</button></Link>
                    </div>
                </div>
            </div>

            {/* MENU PRINCIPAL */}
            <div className="col-9">
                {/* INTRODUÇÃO */}
                <div className="mt-3">
                    <h2><i className="bi bi-house"></i> Home </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="row mt-5 align-itens-center">
                    {/* PESQUISAR */}
                    <div className="col-md-8">
                        <div className="input-group">
                            <input className="form-control" placeholder="Pesquisar solicitações..." />
                            <button className="btn btn-outline-secondary"> <i class="bi bi-search"></i> </button>
                        </div>
                    </div>

                    {/* FILTRAR */}
                    <div className="col-md-2">
                        <select className="form-select filtro-select">
                            <option hidden>Filtrar status...</option>
                            <option> Todos </option>
                            <option> Novo </option>
                            <option> Em andamento </option>
                            <option> Pendente </option>
                            <option> Fechado </option>
                        </select>
                    </div>
                    {/* FILTRAR */}
                    <div className="col-md-2">
                        {
                            minhasSolicitacoes == true ?
                                <div>
                                    <button className="btn btn-outline-secondary" onClick={botaoMinhasSolicitacoes}> Minhas Solicitações </button>
                                </div>
                                :
                                <button className="btn btn-outline-secondary" onClick={botaoTodasSolicitacoes}> Todas Solicitações </button>
                        }
                    </div>
                </div>

                {/* CARDS SOLICITAÇÕES */}
                <div className="row mt-3">
                    {listaSolicitacoes.map((solicitacao) => (
                        <div className="col-md-3 mb-3" key={solicitacao.id}>
                            <div className="card h-100">
                                <img src={solicitacao.imagem} className="card-img-top" />
                                <div className="align-itens-center">
                                    {/* <button className="btn">@{solicitacao.id_usuario.nome}</button> */}
                                    <button className="btn" onClick={() => excluir(solicitacao.id)}> Excluir </button>
                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{solicitacao.titulo}</h5>
                                    <p className="card-text">{solicitacao.descricao}</p>
                                    <div className="mt-auto">
                                        <button className="btn btn-success"> 👍 </button>
                                        <button className="btn btn-danger ms-1"> 👎 </button>
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

            {/* MODAL PERFIL USUÁRIO */}
            <div class="modal fade" id="modalPerfil" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Perfil do Usuário</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="https://placehold.co/100"></img>
                            <h5>Nome do Usuário</h5>
                            <p class="text-muted">cargo@empresa.com</p>
                            <p>Departamento de Vendas</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EDITAR */}
            <div className="modal fade" id="modalEditar" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">

                        {/* HEADER */}
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Solicitação</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* BODY */}
                        <div className="modal-body">

                            {/* TÍTULO */}
                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input
                                    // value={tituloEditar}
                                    // onChange={e => setTituloEditar(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    // value={descricaoEditar}
                                    // onChange={e => setDescricaoEditar(e.target.value)}
                                    className="form-control"
                                    rows="4"
                                ></textarea>
                            </div>

                            {/* IMAGEM */}
                            <div className="mb-3">
                                <label className="form-label">URL da Imagem</label>
                                <input
                                    // value={imagemEditar}
                                    // onChange={e => setImagemEditar(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">
                            <button
                                // onClick={atualizar} 
                                className="btn btn-primary" data-bs-dismiss="modal"> Salvar Alterações </button>

                            <button className="btn btn-secondary" data-bs-dismiss="modal"> Cancelar </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}