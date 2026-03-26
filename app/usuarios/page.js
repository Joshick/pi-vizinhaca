'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

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



export default function usuarios() {

  const [usuarios, alteraUsuario] = useState([])

  const [inputPesquisaAtivo, alteraInputPesquisaAtivo] = useState('')

  const [inputPesquisaUsuario, alteraInputPesquisaUsuario] = useState('')



  async function pesquisar() {

    
    if (inputPesquisaUsuario) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*, id_bairros (*)')
        .eq('ativo', inputPesquisaAtivo === 'true')
        .or(`nome.ilike.%${inputPesquisaUsuario}%,email.ilike.%${inputPesquisaUsuario}%`)

      alteraUsuario(data)

      
    } else {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*, id_bairros (*)')
        .eq('ativo', inputPesquisaAtivo === 'true')

      alteraUsuario(data)
    }
  }

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

              <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"><i className="bi bi-plus-lg"></i> Criar solicitação </a>

              <a href="./usuarios" className="list-group-item list-group-item-action active">
                Usuários
              </a>

              <a href="./Bairros" className="list-group-item list-group-item-action">
                Bairros
              </a>

              <a href="./aprovacao" className="list-group-item list-group-item-action">
                Aprovações
              </a>


            </div>
          </aside>


          <main className="col-10 p-4">
            <h2>👥 Usuários</h2>


            <input
              type="text"
              className="form-control d-inline-block w-auto mx-2"
              placeholder="Buscar por nome ou email..."
              value={inputPesquisaUsuario}
              onChange={e => alteraInputPesquisaUsuario(e.target.value)}
            />


            <select onChange={e => alteraInputPesquisaAtivo(e.target.value)}>

              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>

            <button onClick={pesquisar}>Pesquisar</button>

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
                        <td scope="row">{indice + 1}</td>
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