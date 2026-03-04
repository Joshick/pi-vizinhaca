"use client"


export default function administrador() {
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

                            <a href="./administrador" class="list-group-item list-group-item-action active">
                                Home
                            </a>


                            <button type="button" class="list-group-item list-group-item-action text-start"
                                data-bs-toggle="modal" data-bs-target="#modalCriar">
                                Criar solicitação
                            </button>

                            <a href="./solicitacoes" class="list-group-item list-group-item-action">
                                Solicitações
                            </a>

                            <a href="./usuarios" class="list-group-item list-group-item-action">
                                Usuários
                            </a>

                        </div>
                    </aside>


                    <main class="col-10 p-4">
                        <h2>🏠 Painel Administrativo</h2>
                        <p class="mt-3">
                            Utilize o menu lateral para navegar pelo sistema.
                        </p>
                    </main>

                </div>
            </div>


            <div class="modal fade" id="modalCriar" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title">Nova Solicitação</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">

                            <div class="mb-3">
                                <label class="form-label">Título</label>
                                <input class="form-control" placeholder="Ex: Buraco na rua"/>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Descrição</label>
                                <textarea class="form-control" rows="4" placeholder="Descreva o problema..."></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Categoria</label>
                                <select class="form-select">
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
                                <label class="form-label">Imagem</label>
                                <input type="file" class="form-control"/>
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



