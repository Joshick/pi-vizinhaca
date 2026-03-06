export default function Home() {

  return (
    <div>
      <div className="container-fluid">
        <div className="row">


          <aside className="col-2 border-end min-vh-100 p-3">
            <div className="text-center">
              <img src="https://placehold.co/100" className="rounded mb-2" />
              <h5>Amigo da Vizinhança</h5>
            </div>

            <div className="list-group list-group-flush mt-4">

              <a href="./administrador" className="list-group-item list-group-item-action">
                Home
              </a>

              <button type="button" className="list-group-item list-group-item-action text-start" data-bs-toggle="modal"
                data-bs-target="#modalCriar">
                Criar solicitação
              </button>

              <a href="./solicitacoes" className="list-group-item list-group-item-action active">
                Solicitações
              </a>

              <a href="./usuarios" className="list-group-item list-group-item-action">
                Usuários
              </a>

              <a href="./Bairros" className="list-group-item list-group-item-action">
                Bairro
              </a>

            </div>
          </aside>

          <main className="col-10 p-4">
            <h2>📌 Solicitações</h2>

            <div className="row mt-4">

              <div className="col-md-4">
                <div className="card">
                  <img src="https://placehold.co/600x300" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">Buraco na rua</h5>
                    <p className="card-text">
                      Tem um buraco grande na rua X, perto do número 123.
                    </p>
                    <span className="badge bg-primary">Infraestrutura</span>
                    <span className="badge bg-warning text-dark">Média</span>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <small className="text-muted">02/03/2026</small>
                    <button className="btn btn-sm btn-outline-danger">Excluir</button>
                  </div>
                </div>
              </div>

            </div>
          </main>

        </div>
      </div>

      <div className="modal fade" id="modalCriar" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nova Solicitação</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
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
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
            </div>
          </div>
        </div>
      </div>


    


  )
}