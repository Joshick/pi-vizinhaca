"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Link from "next/link"
import "./principal.css"
import Menu_lateral from './menu_lateral';

export default function Principal() {

    const [titulo, alteraTitulo] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [status, alteraStatus] = useState("")
    const [imagem, alteraImagem] = useState()

    const [inputPesquisarSolicitacao, alteraInputPesquisarSolicitacao] = useState()
    const [editandoSolicitacao, alteraEditandoSolicitacao] = useState(null)
    const [minhasSolicitacoes, alteraMinhasSolicitacoes] = useState(false)

    const [listaSolicitacoes, alteraListaSolicitacoes] = useState([])
    const params = useParams()

    const id_usuario = localStorage.getItem("id_usuario")
    const [usuario, alteraUsuario] = useState([])

    async function buscarUsuario() {

        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id_usuario)

        alteraUsuario(data[0])
    }

    {/* PESQUISAR SOLICITAÇÕES */ }
    async function pesquisarSolicitacao(e) {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*)
                `)
            .eq('status', "aprovado")
            .ilike('titulo', '%' + inputPesquisarSolicitacao + '%')

        console.log(data)
        alteraListaSolicitacoes(data)
    }


    {/* FILTRAR TODAS SOLICITAÇÕES */ }
    async function botaoTodasSolicitacoes() {

        alteraMinhasSolicitacoes(false)

        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*)
                `)
            .eq('status', "aprovado")

        alteraListaSolicitacoes(data)
    }

    {/* FILTRAR MINHAS SOLICITAÇÕES */ }
    async function botaoMinhasSolicitacoes() {

        alteraMinhasSolicitacoes(true)

        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*)
                `)
            .eq('id_usuario', id_usuario)

        alteraListaSolicitacoes(data)
    }

    {/* BUSCAR SOLICITAÇÕES */ }
    async function buscar() {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*)
            `)
            .eq('status', "aprovado")

        console.log(error)
        alteraListaSolicitacoes(data)
    }

    {/* SALVAR SOLICITAÇÕES */ }
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

    {/* EXCLUIR SOLICITAÇÕES */ }
    async function excluir(id) {
        const opcao = confirm("Tem certeza que deseja excluir?")
        if (opcao == false) {
            return
        }
        const response = await supabase
            .from('solicitacoes')
            .delete()
            .eq('id', id)

        buscar()
    }

    {/* EDITAR SOLICITAÇÕES */ }
    function editar(objeto) {

        alteraEditandoSolicitacao(objeto.id)

        alteraTitulo(objeto.titulo)
        alteraDescricao(objeto.descricao)
    }

    async function atualizarSolicitacao() {

        const objeto = {
            titulo: titulo,
            descricao: descricao
        }

        const { error } = await supabase
            .from('solicitacoes')
            .update(objeto)
            .eq('id', editandoSolicitacao)

        console.log(objeto)

        if (error == null) {
            alert("Atualização realizada com sucesso!")
            buscar()
        } else {
            alert("Dados inválidos!")
            console.log(error)
        }
    }

    useEffect(() => {
        buscarUsuario()
        buscar()
    }, [])

    return (
        <div className="row">
            {/* MENU LATERAL */}

            <Menu_lateral />

            {/* MENU PRINCIPAL */}
            <div className="col-9">
                {/* INTRODUÇÃO */}
                <div className="mt-3">
                    <h2><i className="bi bi-house"></i> Home </h2>
                    <h5>Seja bem-vindo {usuario == null ? "Carregando..." : usuario.nome}</h5>

                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="row mt-5 align-itens-center">
                    {/* PESQUISAR */}
                    <div className="col-md-10">
                        <div className="input-group">
                            <input onChange={e => alteraInputPesquisarSolicitacao(e.target.value)} className="form-control" placeholder="Pesquisar solicitações..." />
                            <button onClick={pesquisarSolicitacao} className="btn btn-outline-secondary"> <i className="bi bi-search"></i> </button>
                        </div>
                    </div>

                    {/* FILTRAR */}
                    <div className="col-md-2">
                        {
                            minhasSolicitacoes == true ?
                                <div>
                                    <button className="btn btn-outline-secondary" onClick={botaoTodasSolicitacoes}> Todas Solicitações </button>
                                </div>
                                :
                                <button className="btn btn-outline-secondary" onClick={botaoMinhasSolicitacoes}> Minhas Solicitações </button>
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
                                    <a>@{solicitacao.id_usuario.nome}</a>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{solicitacao.titulo}</h5>
                                    <p className="card-title">{solicitacao.status}</p>
                                    <p className="card-text">{solicitacao.descricao}</p>
                                    <div className="mt-auto cont">
                                        <div>
                                            <button className="btn btn-success"> <i className="bi bi-hand-thumbs-up-fill"></i> </button>
                                            <button className="btn btn-danger ms-2"> <i className="bi bi-hand-thumbs-down"></i> </button>
                                        </div>

                                        {
                                            usuario != null && usuario.admin == true ?
                                                <div>
                                                    <button className="btn" onClick={() => excluir(solicitacao.id)}> <i className="bi bi-trash3"></i> </button>
                                                    <button onClick={() => editar(solicitacao)} className="btn" data-bs-toggle="modal" data-bs-target="#modalEditar"> <i className="bi bi-pen"></i> </button>
                                                </div>
                                            :
                                                <div></div>
                                        }
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
                                <h5> {usuario.nome} </h5>
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

            {/* MODAL EDITAR SOLICITAÇÕES */}
            <div className="modal fade" id="modalEditar" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">

                        {/* CABEÇALHO MODAL */}
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Solicitação</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* CORPO MODAL */}
                        <div className="modal-body">

                            {/* TÍTULO */}
                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input value={titulo} onChange={e => alteraTitulo(e.target.value)} className="form-control" />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea value={descricao} onChange={e => alteraDescricao(e.target.value)} className="form-control" rows="4"></textarea>
                            </div>
                        </div>

                        {/* RODAPÉ MODAL */}
                        <div className="modal-footer">
                            <button onClick={atualizarSolicitacao} className="btn btn-primary" data-bs-dismiss="modal"> Salvar Alterações </button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal"> Cancelar </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}