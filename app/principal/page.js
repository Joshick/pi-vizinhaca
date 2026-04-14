'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import Link from "next/link"
import "./principal.css"
import Menu_lateral from './menu_lateral';

export default function Principal() {
    const [isClient, setIsClient] = useState(false)
    const [titulo, alteraTitulo] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [status, alteraStatus] = useState("")
    const [imagem, alteraImagem] = useState()
    const [andamento, alteraAndamento] = useState()
    const [inputPesquisarSolicitacao, alteraInputPesquisarSolicitacao] = useState()
    const [editandoSolicitacao, alteraEditandoSolicitacao] = useState(null)
    const [minhasSolicitacoes, alteraMinhasSolicitacoes] = useState(false)
    const [listaSolicitacoes, alteraListaSolicitacoes] = useState([])
    const params = useParams()
    const [solicitacoesPendentes, alteraSolicitacoesPendentes] = useState([])
    const [usuario, alteraUsuario] = useState([])

    const id_usuario = typeof window !== 'undefined' ? localStorage.getItem("id_usuario") : null

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient) {
            buscar()
        }
    }, [isClient])

    if (!isClient) return null

    {/* ORDENAR POR CURTIDAS (PRIORIDADE) */}
    function formatarEOrdenar(data) {
        if (!data) return [];
        let ordenado = data.map(sol => {
            const arr = Array.isArray(sol.curtidas) ? sol.curtidas : (sol.curtidas ? [sol.curtidas] : []);
            return {
                ...sol,
                qtdCurtidas: arr.length,
                usuarioCurtiu: arr.some(c => c.id_usuario == id_usuario)
            }
        });
        // Ordena para que os com mais curtidas fiquem em primeiro
        return ordenado.sort((a, b) => b.qtdCurtidas - a.qtdCurtidas);
    }

    {/* PESQUISAR SOLICITAÇÕES */ }
    async function pesquisarSolicitacao(e) {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*),
                curtidas (*)
                `)
            .eq('status', "aprovado")
            .eq('id_bairro', usuario.bairro.id)
            .ilike('titulo', '%' + inputPesquisarSolicitacao + '%')

        console.log(data)
        alteraListaSolicitacoes(formatarEOrdenar(data))
    }

    {/* FILTRAR MINHAS SOLICITAÇÕES */ }
    async function botaoMinhasSolicitacoes() {

        alteraMinhasSolicitacoes(true)

        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
            *,
            id_usuario (*),
            curtidas (*)
            `)
            .eq('id_usuario', id_usuario)

        alteraListaSolicitacoes(formatarEOrdenar(data))
    }

    {/* BUSCAR SOLICITAÇÕES */ }
    async function buscar() {

        alteraMinhasSolicitacoes(false)

        const pendentes = await supabase
            .from('solicitacoes')
            .select(`*, id_usuario (*)`)
            .eq('id_usuario', id_usuario)
            .eq('status', '')

        alteraSolicitacoesPendentes(pendentes.data)

        const { data, error } = await supabase
            .from("usuarios")
            .select("*, bairro(*)")
            .eq("id", id_usuario)

        console.log(data)
        alteraUsuario(data[0])

        const resposta = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*),
                curtidas (*)
                `)
            .eq('status', "aprovado")
            .eq('id_bairro', data[0]?.bairro?.id)


        console.log(resposta.error)
        alteraListaSolicitacoes(formatarEOrdenar(resposta.data))


    }

    {/* SALVAR SOLICITAÇÕES */ }
    async function salvar() {

        const objeto = {
            titulo: titulo,
            descricao: descricao,
            status: status,
            id_usuario: id_usuario,
            id_bairro: usuario.bairro.id,
            imagem: imagem,
            andamento: "Novo"

        }

        //VALIDAÇÕES
        if (objeto.titulo.length < 3) {
            alert("Titulo muito curto...")
            return
        }

        // Adiciona localmente apenas para feedback ultra-rápido, porem recarrega embaixo
        const newList = listaSolicitacoes.concat({...objeto, id_usuario: usuario, curtidas: []})
        alteraListaSolicitacoes(formatarEOrdenar(newList))

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

            buscar()
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
        alteraImagem(objeto.imagem)
        alteraAndamento(objeto.andamento)
    }

    async function atualizarSolicitacao() {

        const objeto = {
            titulo: titulo,
            descricao: descricao,
            imagem: imagem,
            andamento: andamento
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

    {/* CURTIR SOLICITAÇÃO */ }
    async function curtir(id_solicitacao) {
        const { error } = await supabase
            .from('curtidas')
            .insert({ id_solicitacoes: id_solicitacao, id_usuario: id_usuario })

        if (error) {
            console.error("Erro ao curtir:", error)
            alert("Não foi possível curtir. Verifique se a coluna id_usuario da tabela curtidas está suportando UUID no seu Supabase.")
        } else {
            buscar()
        }
    }

    {/* DESCURTIR SOLICITAÇÃO */ }
    async function descurtir(id_solicitacao) {
        const { error } = await supabase
            .from('curtidas')
            .delete()
            .eq('id_solicitacoes', id_solicitacao)
            .eq('id_usuario', id_usuario)

        if (error) console.error("Erro ao descurtir:", error)
        buscar()
    }

    function corBadge(andamento) {
        if (andamento === "Novo") return "bg-primary"
        if (andamento === "Em andamento") return "bg-warning text-dark"
        if (andamento === "Finalizado") return "bg-success"
        return "bg-secondary"
    }

    return (
        <div className="row">
            {/* MENU LATERAL */}

            <Menu_lateral />

            {/* MENU PRINCIPAL */}
            <div className="col-9">
                {/* INTRODUÇÃO */}
                <div className="mt-3">
                    <h2><i className="bi bi-house"></i> {usuario == null ? "Carregando..." : usuario?.bairro?.bairro} </h2>
                    <h5>Seja bem-vindo, {usuario == null ? "Carregando..." : usuario.nome}!</h5>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="row mt-5 align-items-center">
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
                                    <button className="btn-minhas" onClick={buscar}> Todas Solicitações </button>
                                </div>
                                :
                                <button className="btn-minhas" onClick={botaoMinhasSolicitacoes}> Minhas Solicitações </button>
                        }
                    </div>
                </div>

                <div className="row mt-4">

                    {/* CARDS SOLICITAÇÕES */}
                    <div className="col-8">
                        <div className="row">
                            {listaSolicitacoes.map((solicitacao) => (
                                <div className="col-md-4 mb-3" key={solicitacao.id}>
                                    <div className="card h-100">
                                        <img src={solicitacao.imagem} className="card-img-top" />
                                        <div className="align-itens-center px-3 pt-2">
                                            <strong>@{solicitacao.id_usuario?.nome || "Desconhecido"}</strong>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{solicitacao.titulo}</h5>
                                            <p className="card-text">{solicitacao.descricao}</p>
                                            <span className={`badge ${corBadge(solicitacao.andamento)} mb-3`}> {solicitacao.andamento || "Novo"} </span>

                                            <div className="mt-auto cont">
                                                <div>
                                                    {solicitacao.usuarioCurtiu ? (
                                                        <button onClick={() => descurtir(solicitacao.id)} className="btn btn-danger"> 
                                                            <i className="bi bi-hand-thumbs-down-fill"></i> {solicitacao.qtdCurtidas}
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => curtir(solicitacao.id)} className="btn btn-success"> 
                                                            <i className="bi bi-hand-thumbs-up"></i> {solicitacao.qtdCurtidas}
                                                        </button>
                                                    )}
                                                </div>
                                                {
                                                    usuario != null && usuario.admin == true ?
                                                        <div className="d-flex">
                                                            <button onClick={() => editar(solicitacao)} className="btn btn-light me-1 border" data-bs-toggle="modal" data-bs-target="#modalEditar"> <i className="bi bi-pen"></i> </button>
                                                            <button className="btn btn-light border text-danger" onClick={() => excluir(solicitacao.id)}> <i className="bi bi-trash3"></i> </button>
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

                    {/* PAINEL PENDENTES */}
                    <div className="col-4">
                        <div className="card card-pendentes">
                            <div className="card-header bg-success">
                                <strong>Solicitações Pendentes</strong>
                            </div>

                            <div className="card-body" style={{ maxHeight: 500, overflowY: "auto" }}>
                                {
                                    solicitacoesPendentes.length === 0 ? (
                                        <p className="text-muted p-2 text-center">Nenhuma pendente</p>
                                    )
                                        :
                                        (
                                            solicitacoesPendentes.map((p) => (
                                                <div key={p.id} className="pendente-item">
                                                    <strong>{p.titulo}</strong>
                                                    <p className="mb-2">{p.descricao}</p>
                                                    <span className="badge-pendente"><strong> Pendente </strong></span>
                                                </div>
                                            ))
                                        )
                                }
                            </div>
                        </div>
                    </div>

                </div>

{/* MODAL CRIAR SOLICITAÇÕES REMOVIDO PARA MENU LATERAL */}

                {/* MODAL EDITAR SOLICITAÇÕES */}
                <div className="modal fade" id="modalEditar" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
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

                                <div className="mb-3">
                                    <label className="form-label"> Andamento </label>
                                    <select value={andamento} onChange={e => alteraAndamento(e.target.value)} className="form-control">
                                        <option value="Novo">Novo</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </div>

                                {/* DESCRIÇÃO */}
                                <div className="mb-3">
                                    <label className="form-label">Descrição</label>
                                    <textarea value={descricao} onChange={e => alteraDescricao(e.target.value)} className="form-control" rows="4"></textarea>
                                </div>

                                {/* IMAGEM */}
                                <div className="mb-3">
                                    <label className="form-label"> Imagem </label>
                                    <input type="file" accept="image/*" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => alteraImagem(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }} className="form-control" />
                                    {imagem && (
                                        <div className="mt-3 text-center">
                                            <img src={imagem} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                                        </div>
                                    )}
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
        </div>
    )
}