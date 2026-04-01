'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Menu_lateral from '../principal/menu_lateral'

const supabase = createClient(
  'https://edgdqwzpczmrsatrprxi.supabase.co',
  'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-'
)

export default function Usuarios() {
  const [usuarios, alteraUsuario] = useState([])
  const [inputPesquisaAtivo, alteraInputPesquisaAtivo] = useState('true')
  const [inputPesquisaUsuario, alteraInputPesquisaUsuario] = useState('')

  async function buscarUsuarios() {
    let query = supabase
      .from('usuarios')
      .select('*')
      .eq('ativo', inputPesquisaAtivo === 'true')

    if (inputPesquisaUsuario.trim()) {
      query = query.ilike('nome', `%${inputPesquisaUsuario}%`)
    }

    const { data, error } = await query

    if (error) {
      console.log("Erro:", error)
      return
    }

    console.log(data)
    alteraUsuario(data || [])
  }

  useEffect(() => {
    buscarUsuarios()
  }, [inputPesquisaAtivo, inputPesquisaUsuario])

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Menu_lateral />

          <main className="col-10 p-4">
            <h2>👥 Usuários</h2>

            <div className="d-flex gap-2 mb-3">
              <input
                type="text"
                className="form-control w-auto"
                placeholder="Buscar por nome..."
                value={inputPesquisaUsuario}
                onChange={e => alteraInputPesquisaUsuario(e.target.value)}
              />

              <select
                className="form-select w-auto"
                value={inputPesquisaAtivo}
                onChange={e => alteraInputPesquisaAtivo(e.target.value)}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Responsável</th>
                    <th>Ativo</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((item, indice) => (
                    <tr key={item.id}>
                      <td>{indice + 1}</td>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td>{item.responsavel ? "Responsável" : "Comum"}</td>
                      <td>
                        {item.ativo ? (
                          <span className="badge text-bg-success">Ativo</span>
                        ) : (
                          <span className="badge text-bg-danger">Inativo</span>
                        )}
                      </td>
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