'use client'
import { useState } from "react"

import Link from "next/link"
import "./principal.css"
import Login from "../login/page"

export default function Principal() {

    const [id, alteraId] = useState("")
    const [titulo, alteraTitulo] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [categoria, alteraCategoria] = useState("")
    const [status, alteraStatus] = useState("")
    const [usuario, alteraUsuario] = useState("")
    const [imagem, alteraImagem] = useState()

    const [listaSolicitacoes, alteraListaSolicitacoes] = useState([
        {
            id: 1,
            titulo: "Buraco na rua principal",
            descricao: "Há um buraco grande na Rua das Flores, próximo ao número 245. Está causando risco para carros e motos.",
            categoria: "Infraestrutura",
            status: "Aberto",
            usuario: "Maria Oliveira",
            imagem: "https://placehold.co/600x400?text=Buraco+na+Rua"
        },
        {
            id: 2,
            titulo: "Poste sem iluminação",
            descricao: "O poste da esquina da Avenida Brasil com a Rua 7 está sem luz há mais de duas semanas.",
            categoria: "Infraestrutura",
            status: "Em análise",
            usuario: "João Santos",
            imagem: "https://placehold.co/600x400?text=Poste+Sem+Luz"
        },
        {
            id: 3,
            titulo: "Falta de médico no posto",
            descricao: "O posto de saúde do bairro está sem clínico geral desde segunda-feira.",
            categoria: "Saúde",
            status: "Aberto",
            usuario: "Ana Lima",
            imagem: "https://placehold.co/600x400?text=Posto+de+Saude"
        },
        {
            id: 4,
            titulo: "Suspeita de foco de dengue",
            descricao: "Terreno abandonado com água parada e muito mato alto.",
            categoria: "Saúde",
            status: "Em análise",
            usuario: "Carlos Souza",
            imagem: "https://placehold.co/600x400?text=Foco+de+Dengue"
        },
        {
            id: 5,
            titulo: "Movimentação suspeita à noite",
            descricao: "Grupo de pessoas desconhecidas circulando em carros sem placa na praça central após as 23h.",
            categoria: "Segurança",
            status: "Aberto",
            usuario: "Fernanda Alves",
            imagem: "https://placehold.co/600x400?text=Seguranca"
        },
        {
            id: 6,
            titulo: "Semáforo quebrado",
            descricao: "O semáforo da Avenida Central está piscando amarelo o dia todo, causando risco de acidentes.",
            categoria: "Trânsito",
            status: "Resolvido",
            usuario: "Lucas Pereira",
            imagem: "https://placehold.co/600x400?text=Semaforo"
        },
        {
            id: 7,
            titulo: "Escola com infiltração",
            descricao: "A sala 3 da escola municipal está com infiltração no teto e risco de queda de reboco.",
            categoria: "Educação",
            status: "Em análise",
            usuario: "Patrícia Gomes",
            imagem: "https://placehold.co/600x400?text=Escola"
        },
        {
            id: 8,
            titulo: "Coleta de lixo irregular",
            descricao: "O caminhão de lixo não passou na última semana e o lixo está acumulado nas calçadas.",
            categoria: "Serviços públicos",
            status: "Aberto",
            usuario: "Rafael Martins",
            imagem: "https://placehold.co/600x400?text=Coleta+de+Lixo"
        },
        {
            id: 9,
            titulo: "Barulho excessivo em comércio",
            descricao: "Um bar na Rua do Comércio está com som muito alto após as 22h.",
            categoria: "Comercial",
            status: "Em análise",
            usuario: "Juliana Rocha",
            imagem: "https://placehold.co/600x400?text=Barulho"
        },
        {
            id: 10,
            titulo: "Animal abandonado na rua",
            descricao: "Cachorro aparentemente abandonado circulando pela Rua Primavera há dias.",
            categoria: "Outros",
            status: "Aberto",
            usuario: "Bruno Carvalho",
            imagem: "https://placehold.co/600x400?text=Animal+Abandonado"
        }
    ])

    function salvar(e) {
        e.preventDefault()

        const objeto = {
            id: id,
            usuario: usuario,
            titulo: titulo,
            categoria: categoria,
            status: status,
            descricao: descricao,
            imagem: imagem

        }

        alteraListaSolicitacoes(listaSolicitacoes.concat(objeto))
    }

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
                    <h2> 🏚 Home </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="row mt-5 align-items-center">
                    <div className="col-md-9">
                        <div className="input-group">
                            <input className="form-control" placeholder="Pesquisar solicitações..." />
                            <button className="btn btn-outline-secondary">🔎</button>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <select className="form-select filtro-select">
                            <option hidden>Filtrar status...</option>
                            <option>Todos</option>
                            <option>Aberto</option>
                            <option>Em análise</option>
                            <option>Resolvido</option>
                        </select>
                    </div>
                </div>

                {/* CARDS SOLICITAÇÕES */}
                <div className="row mt-3">
                    {listaSolicitacoes.map((solicitacao) => (
                        <div className="col-md-3 mb-3" key={solicitacao.id}>
                            <div className="card h-100">
                                <img src={solicitacao.imagem} className="card-img-top" alt={solicitacao.titulo} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{solicitacao.titulo}</h5>
                                    <p className="card-text">{solicitacao.descricao}</p>
                                    <div>
                                        <span className="badge bg-primary">{solicitacao.categoria}</span>
                                        <span className="badge bg-warning text-dark ms-1"> Media </span>
                                    </div>
                                    <hr/>
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
                            <h5 className="modal-title">Nova Solicitação</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* CORPO MODAL */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Categoria</label>
                                <select onChange={e => alteraCategoria(e.target.value)} className="form-select">
                                    <option hidden>Selecione...</option>
                                    <option>Infraestrutura</option>
                                    <option>Saúde</option>
                                    <option>Segurança</option>
                                    <option>Educação</option>
                                    <option>Trânsito</option>
                                    <option>Serviços públicos</option>
                                    <option>Comercial/Outros</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Urgência</label>
                                <select onChange={e => alteraUrgencia(e.target.value)} className="form-select">
                                    <option hidden>Selecione...</option>
                                    <option>Muito Alta</option>
                                    <option>Alta</option>
                                    <option>Média</option>
                                    <option>Baixa</option>
                                    <option>Muito Baixa</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input onChange={e => alteraTitulo(e.target.value)} className="form-control" placeholder="Ex: Buraco na rua" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea onChange={e => alteraDescricao(e.target.value)} className="form-control" rows="4" placeholder="Descreva o problema..."></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Imagem</label>
                                <input onChange={e => alteraImagem(e.target.value)} type="file" className="form-control" />
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button onClick={salvar} className="btn btn-primary" data-bs-dismiss="modal"> Enviar Solicitação </button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}