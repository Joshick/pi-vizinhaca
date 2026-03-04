export default function usuarios() {
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

              <a href="./solicitacoes.html" class="list-group-item list-group-item-action">
                Solicitações
              </a>

              <a href="./usuarios.html" class="list-group-item list-group-item-action active">
                Usuários
              </a>

            </div>
          </aside>


          <main class="col-10 p-4">
            <h2>👥 Usuários</h2>

            <div class="table-responsive mt-4">
              <table class="table table-striped table-bordered">
                <thead class="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>João Silva</td>
                    <td>joao@email.com</td>
                    <td><span class="badge bg-success">Ativo</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger">
                        Desativar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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