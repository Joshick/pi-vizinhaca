import Link from "next/link"
import "./principal.css"
import Login from "../login/page"

export default function Principal() {
    return (
        <div class="row">
            {/* MENU LATERAL */}
            <div class="col-2" >
                {/* LOGO */}
                <div class="text-center mt-3">
                    <img src="https://placehold.co/100"></img>
                    <h1> Amigo da Vizinhança</h1>
                </div>

                {/* LISTAGEM DAS PÁGINAS */}
                <div class="list-group list-group-flush">
                    <a href="#" class="list-group-item list-group-item-action"> Home </a>
                    <a href="#" class="list-group-item list-group-item-action"> Criar solicitação </a>
                    <a href="#" class="list-group-item list-group-item-action"> Solicitações </a>
                </div>
            
                {/* PERFIL INFERIOR */}
                <div class="text-center">

                    <div>
                        <button> <img src="https://placehold.co/25"></img> Perfil </button>

                        <Link href="/"><button>Sair</button></Link>
                        
                    </div>

                    
                </div>
            </div>

            <div class="col-9">

                {/* INTRODUÇÃO */}
                <div class="mt-3">
                    <h2> 🏚 Home </h2>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div class="row mt-5">

                    <div class="col-8">
                        <div class="input-group mb-3">
                            <input class="form-control" placeholder="Pesquisar..."/>
                            <button class="btn btn-outline-secondary"> 🔎 </button>
                        </div>
                    </div>
                    <div class="col-2">
                        <select class="form-select">
                            <option hidden> Filtrar... </option>
                            <option value="1"> Ativos </option>
                            <option value="2"> Inativos </option>
                        </select>
                    </div>
                </div>

                {/* CARDS SOLICITAÇÕES */}
                <div class="tst mt-3">
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div>
                <div class="tst mt-5">
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                    <div className="card me-5">
                        <img src="https://placehold.co/100" className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}