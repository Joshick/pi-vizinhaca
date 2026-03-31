'use client'

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Menu_lateral from "../principal/menu_lateral";

const supabase = createClient('https://edgdqwzpczmrsatrprxi.supabase.co', 'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-')


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

export default function aprovacao() {

    const [aprovacao, alteraAprovacao] = useState([])

    async function buscar() {
        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                bairros ( bairro )
            `)

        if (error) {
            console.log(error)
        } else {
            alteraAprovacao(data || [])
        }
    }

    async function atualizarStatus(id, status) {
        const { error } = await supabase
            .from('solicitacoes')
            .update({ status: status })
            .eq('id', id)

        if (error) {
            console.log(error)
        }

        buscar()
    }

    useEffect(() => {
        buscar()
    }, [])

    
    const pendentes = aprovacao.filter(item => item.status === 'pendente' || !item.status)

    return (
        <div>
            <div className="container-fluid">
                <div className="row">

                    
                    <Menu_lateral/>

                    {/* CONTEÚDO */}
                    <main className="col-10 p-4">
                        <h2>Aprovações</h2>

                        
                        <h5 className="mt-4">Pendentes</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Bairro</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendentes.map((item, indice) => (
                                        <tr key={item.id}>
                                            <td>{indice + 1}</td>
                                            <td>{item.titulo}</td>
                                            <td>{item.bairros?.bairro}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.status || 'pendente'}</td>
                                            <td>
                                                <button className="btn btn-success btn-sm me-2"
                                                    onClick={() => atualizarStatus(item.id, 'aprovado')}>
                                                    Aprovar
                                                </button>
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={() => atualizarStatus(item.id, 'reprovado')}>
                                                    Reprovar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <hr />

                        
                        <h5 className="mt-4">Todas as solicitações</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Bairro</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aprovacao.map((item, indice) => (
                                        <tr key={item.id}>
                                            <td>{indice + 1}</td>
                                            <td>{item.titulo}</td>
                                            <td>{item.bairros?.bairro}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.status || 'pendente'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </main>
                </div>

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
        </div>
    )
}