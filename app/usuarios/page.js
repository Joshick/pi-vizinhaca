'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient('https://edgdqwzpczmrsatrprxi.supabase.co', 'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-')



export default function usuarios() {

  const [usuarios, alteraUsuario] = useState([])

  async function buscar() {
    const { data, error } = await supabase
      .from('usuarios')
      .select(`
                    *,
                    
                    id_bairros (*) 
                    
                `)

    console.log(data)

    alteraUsuario(data)
  }


  useEffect(() => {

    buscar()

  }, [])


  return (

    <div>

    
      


      <div class="container-fluid">
        <div class="row">


          <aside class="col-2 border-end min-vh-100 p-3">
            <div className="text-center">

              <h5>Amigo da Vizinhança</h5>
            </div>

            <div className="list-group list-group-flush mt-4">

              <a href="./principal" className="list-group-item list-group-item-action">Home</a>

              <button className="list-group-item list-group-item-action text-start" data-bs-toggle="modal"
                data-bs-target="#modalCriar">
                Criar solicitação
              </button>

              <a href="./minhas_solicitacoes" className="list-group-item list-group-item-action">
                Minhas Solicitações
              </a>

              <a href="./usuarios" className="list-group-item list-group-item-action active">
                Usuários
              </a>

              <a href="./Bairros" className="list-group-item list-group-item-action">
                Bairros
              </a>


            </div>
          </aside>


          <main className="col-10 p-4">
            <h2>👥 Usuários</h2>

           
            <div className="table-responsive mt-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">nome</th>
                    <th scope="col">bairro</th>
                    <th scope="col">email</th>
                    <th scope="col">responsavel</th>
                    <th scope="col">ativo</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map(
                    (item, indice) => (
                    <tr>
                      <td scope="row">{indice+1}</td>
                      <td>{item.nome}</td>
                      <td>{item.id_bairros.bairro}</td>
                      <td>{item.email}</td>
                      <td>{item.responsavel ? "Responsavel" : "Comum"}</td>
                      <td>{item.ativo ? <span className='badge text-bg-success'>Ativo</span> : <span className='badge text-bg-danger'>inativo</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </main>

        </div>
      </div>

      <div className="modal fade" id="modalCriar" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nova Solicitação</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Título *</label>
                <input className="form-control" placeholder="Ex: Buraco na rua" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoria *</label>
                <select className="form-select" required>
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
                <label className="form-label">Descrição *</label>
                <textarea className="form-control" rows="4" placeholder="Descreva o problema..." required></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Bairro / Rua</label>
                <input className="form-control" placeholder="Ex: Centro - Rua X, 123" />
              </div>

              <div className="mb-3">
                <label className="form-label">Prioridade</label>
                <select className="form-select">
                  <option>Normal</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Imagem do problema</label>
                <input type="file" className="form-control" accept="image/*" />
              </div>


            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
            </div>
          </div>
        </div>
      </div>

    </div>



  )
}