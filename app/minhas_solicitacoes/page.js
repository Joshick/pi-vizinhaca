import Link from "next/link"
import "./minhas_solicitacoes.css"


export default function Principal() {
    return (
        <div class="row">
            {/* MENU LATERAL */}
            <div class="col-2" >
                {/* LOGO + NOME */}
                <div class="text-center mt-3">
                    <img src="https://placehold.co/100"></img>
                    <h1> Amigo da Vizinhança</h1>
                </div>

                {/* LISTAGEM DAS PÁGINAS */}
                <div class="list-group list-group-flush">
                    <a href="/principal" class="list-group-item list-group-item-action"> Home </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"> Criar solicitação </a>
                    <a href="/minhas_solicitacoes" class="list-group-item list-group-item-action"> Minhas solicitações </a>
                    <a href="./usuarios" class="list-group-item list-group-item-action"> Usuários </a>
                    <a href="./Bairros" className="list-group-item list-group-item-action"> Bairros </a>

                </div>
            
                {/* PERFIL INFERIOR */}
                <div class="text-center">
                    <div>
                        <button> <img src="https://placehold.co/25"></img> Perfil </button>
                        <Link href="/"><button>Sair</button></Link>
                    </div>
                </div>
            </div>

            {/* MENU PRINCIPAL */}
            <div class="col-9">

                {/* INTRODUÇÃO */}
                <div class="mt-3">
                    <h2> ℹ️ Minhas solicitações </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div class="row mt-5 align-items-center">
                    {/* PESQUISAR */}
                    <div class="col-md-9">
                        <div class="input-group">
                            <input class="form-control" placeholder="Pesquisar minhas solicitações..."/>
                            <button class="btn btn-outline-secondary"> 🔎 </button>
                        </div>
                    </div>

                    {/* FILTRAR */}
                    <div class="col-md-3">
                        <select className="form-select filtro-select">
                            <option hidden>Filtrar status...</option>
                            <option> Todos </option>
                            <option> Novo </option>
                            <option> Em andamento </option>
                            <option> Pendente </option>
                            <option> Fechado </option>
                        </select>
                    </div>
                </div>

                {/* CARDS SOLICITAÇÕES */}
                <div class="tst mt-3"></div>
                
            </div>

            {/* MODAL CRIAR SOLICITAÇÕES */}
            <div className="modal fade" id="modalCriar" tabindex="-1">
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
                                <input className="form-control" placeholder="Ex: Buraco na rua" required />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className="mb-3">
                                <label className="form-label"> Descrição </label>
                                <textarea className="form-control" rows="4" placeholder="Descreva o problema..." required></textarea>
                            </div>

                            {/* IMAGEM */}
                            <div className="mb-3">
                                <label className="form-label"> Imagem do problema </label>
                                <input type="file" className="form-control" />
                            </div>

                        </div>

                        {/* RODAPÉ MODAL */}
                        <div className="modal-footer">
                            {/* BOTÃO ENVIAR */}                            
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            {/* BOTÃO CANCELAR */}                            
                            <button className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}