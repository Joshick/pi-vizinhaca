export default function Home() {

  return (
    <div>
      <div class="container-fluid">
        <div class="row">


          <aside class="col-2 border-end min-vh-100 p-3">
            <div class="text-center">
              <img src="https://placehold.co/100" class="rounded mb-2" />
              <h5>Amigo da Vizinhança</h5>
            </div>

            <div class="list-group list-group-flush mt-4">

              <a href="./responsavel.html" class="list-group-item list-group-item-action">
                Home
              </a>

              <button type="button" class="list-group-item list-group-item-action text-start" data-bs-toggle="modal"
                data-bs-target="#modalCriar">
                Criar solicitação
              </button>

              <a href="./solicitacoes.html" class="list-group-item list-group-item-action active">
                Solicitações
              </a>

              <a href="./usuarios.html" class="list-group-item list-group-item-action">
                Usuários
              </a>

            </div>
          </aside>

          <main class="col-10 p-4">
            <h2>📌 Solicitações</h2>

            <div class="row mt-4">

              <div class="col-md-4">
                <div class="card">
                  <img src="https://placehold.co/600x300" class="card-img-top" />
                  <div class="card-body">
                    <h5 class="card-title">Buraco na rua</h5>
                    <p class="card-text">
                      Tem um buraco grande na rua X, perto do número 123.
                    </p>
                    <span class="badge bg-primary">Infraestrutura</span>
                    <span class="badge bg-warning text-dark">Média</span>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <small class="text-muted">02/03/2026</small>
                    <button class="btn btn-sm btn-outline-danger">Excluir</button>
                  </div>
                </div>
              </div>

            </div>
          </main>

        </div>
      </div>

      <div class="modal fade" id="modalCriar" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Nova Solicitação</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Título *</label>
                <input class="form-control" placeholder="Ex: Buraco na rua" required />
              </div>

              <div class="mb-3">
                <label class="form-label">Categoria *</label>
                <select class="form-select" required>
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

              <div class="mb-3">
                <label class="form-label">Descrição *</label>
                <textarea class="form-control" rows="4" placeholder="Descreva o problema..." required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Bairro / Rua</label>
                <input class="form-control" placeholder="Ex: Centro - Rua X, 123" />
              </div>

              <div class="mb-3">
                <label class="form-label">Prioridade</label>
                <select class="form-select">
                  <option>Normal</option>
                  <option>Média</option>
                  <option>Alta</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Imagem do problema</label>
                <input type="file" class="form-control" accept="image/*" />
              </div>

              <div class="text-muted" style="font-size: 0.9rem;">
                * campos obrigatórios
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
            </div>
          </div>
        </div>
      </div>


    </div>


  )
}