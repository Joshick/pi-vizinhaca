export default function usuarios() {

  const usuarios = [
    {
      nome: "josé Hickelme",
      email: "josehickelme@gmail.com"
    },

    {
      nome: "leonardo naka",
      email: "nkaaleo@gmail.com",
    },



    {
      nome: "rayssa",
      email: "rayssa@gmail.com"
    },
    {
      nome: "Barbara Heliodora",
      email: "helibarbara@gmail.com"
    },
  ]

  return (


    <div>
      <div class="container-fluid">
        <div class="row">


          <aside class="col-2 border-end min-vh-100 p-3">
            <div className="text-center">

              <h5>Amigo da Vizinhança</h5>
            </div>

            <div className="list-group list-group-flush mt-4">

              <a href="./administrador" className="list-group-item list-group-item-action">Home</a>

              <button className="list-group-item list-group-item-action text-start" data-bs-toggle="modal"
                data-bs-target="#modalCriar">
                Criar solicitação
              </button>

              <a href="./solicitacoes" className="list-group-item list-group-item-action">
                Solicitações
              </a>

              <a href="./usuarios" className="list-group-item list-group-item-action active">
                Usuários
              </a>

            </div>
          </aside>


          <main className="col-10 p-4">
            <h2>👥 Usuários</h2>

            <div className="table-responsive mt-4">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                {usuarios.map(item => (


                  <tr>
                    <td>{item.nome}</td>
                    <td>{item.email}</td>
                    
                    <td><span className="badge bg-success">Ativo</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger">
                        Desativar
                      </button>
                    </td>
                  </tr>




                ))}
                <tbody>

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