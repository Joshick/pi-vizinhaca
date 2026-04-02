'use client'

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Menu_lateral from "../principal/menu_lateral";

const supabase = createClient(
  'https://edgdqwzpczmrsatrprxi.supabase.co',
  'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-'
)

export default function Aprovacao() {

  if (typeof window === "undefined") return null

  const [aprovacao, alteraAprovacao] = useState([])

  async function buscar() {
    const { data, error } = await supabase
      .from('solicitacoes')
      .select('*')

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
    } else {
      buscar()
    }
  }

  useEffect(() => {
    buscar()
  }, [])

  const pendentes = aprovacao.filter(function (item) {
    return item.status == 'pendente' || item.status == null || item.status == ''
  })

  return (
    <div>
      <div className="container-fluid">
        <div className="row">

          <Menu_lateral />

          <main className="col-10 p-4">
            <h2>Aprovações</h2>

            <h5 className="mt-4">Pendentes</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
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
                      <td>{item.descricao}</td>
                      <td>{item.status == null || item.status == '' ? 'pendente' : item.status}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => atualizarStatus(item.id, 'aprovado')}
                        >
                          Aprovar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => atualizarStatus(item.id, 'reprovado')}
                        >
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
                    <th>Descrição</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aprovacao.map((item, indice) => (
                    <tr key={item.id}>
                      <td>{indice + 1}</td>
                      <td>{item.titulo}</td>
                      <td>{item.descricao}</td>
                      <td>{item.status == null || item.status == '' ? 'pendente' : item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}