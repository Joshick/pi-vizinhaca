import Link from "next/link"
import "./principal.css"
import Login from "../login/page"

export default function Principal() {

    const listaSolicitacoes = [
        {
            id: 1,
            titulo: "Buraco na rua principal",
            descricao: "Há um buraco grande na Rua das Flores, próximo ao número 245. Está causando risco para carros e motos.",
            categoria: "Infraestrutura",
            status: "Aberto",
            usuario: "Maria Oliveira",
            imagem: "https://placehold.co/600x400?text=Buraco+na+Rua"
        },
        {
            id: 2,
            titulo: "Poste sem iluminação",
            descricao: "O poste da esquina da Avenida Brasil com a Rua 7 está sem luz há mais de duas semanas.",
            categoria: "Infraestrutura",
            status: "Em análise",
            usuario: "João Santos",
            imagem: "https://placehold.co/600x400?text=Poste+Sem+Luz"
        },
        {
            id: 3,
            titulo: "Falta de médico no posto",
            descricao: "O posto de saúde do bairro está sem clínico geral desde segunda-feira.",
            categoria: "Saúde",
            status: "Aberto",
            usuario: "Ana Lima",
            imagem: "https://placehold.co/600x400?text=Posto+de+Saude"
        },
        {
            id: 4,
            titulo: "Suspeita de foco de dengue",
            descricao: "Terreno abandonado com água parada e muito mato alto.",
            categoria: "Saúde",
            status: "Em análise",
            usuario: "Carlos Souza",
            imagem: "https://placehold.co/600x400?text=Foco+de+Dengue"
        },
        {
            id: 5,
            titulo: "Movimentação suspeita à noite",
            descricao: "Grupo de pessoas desconhecidas circulando em carros sem placa na praça central após as 23h.",
            categoria: "Segurança",
            status: "Aberto",
            usuario: "Fernanda Alves",
            imagem: "https://placehold.co/600x400?text=Seguranca"
        },
        {
            id: 6,
            titulo: "Semáforo quebrado",
            descricao: "O semáforo da Avenida Central está piscando amarelo o dia todo, causando risco de acidentes.",
            categoria: "Trânsito",
            status: "Resolvido",
            usuario: "Lucas Pereira",
            imagem: "https://placehold.co/600x400?text=Semaforo"
        },
        {
            id: 7,
            titulo: "Escola com infiltração",
            descricao: "A sala 3 da escola municipal está com infiltração no teto e risco de queda de reboco.",
            categoria: "Educação",
            status: "Em análise",
            usuario: "Patrícia Gomes",
            imagem: "https://placehold.co/600x400?text=Escola"
        },
        {
            id: 8,
            titulo: "Coleta de lixo irregular",
            descricao: "O caminhão de lixo não passou na última semana e o lixo está acumulado nas calçadas.",
            categoria: "Serviços públicos",
            status: "Aberto",
            usuario: "Rafael Martins",
            imagem: "https://placehold.co/600x400?text=Coleta+de+Lixo"
        },
        {
            id: 9,
            titulo: "Barulho excessivo em comércio",
            descricao: "Um bar na Rua do Comércio está com som muito alto após as 22h.",
            categoria: "Comercial",
            status: "Em análise",
            usuario: "Juliana Rocha",
            imagem: "https://placehold.co/600x400?text=Barulho"
        },
        {
            id: 10,
            titulo: "Animal abandonado na rua",
            descricao: "Cachorro aparentemente abandonado circulando pela Rua Primavera há dias.",
            categoria: "Outros",
            status: "Aberto",
            usuario: "Bruno Carvalho",
            imagem: "https://placehold.co/600x400?text=Animal+Abandonado"
        }
    ]

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
                    <a href="/reclamacoes" class="list-group-item list-group-item-action"> Criar solicitação </a>
                    <a href="/minhas_solicitacoes" class="list-group-item list-group-item-action"> Minhas solicitações </a>

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
                            <input class="form-control" placeholder="Pesquisar..." />
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

                <div className="row mt-3">
                    {listaSolicitacoes.map((solicitacao) => (
                        <div className="col-md-3 mb-3" key={solicitacao.id}>
                            <div className="card h-100">
                                <img
                                    src={solicitacao.imagem}
                                    className="card-img-top"
                                    alt={solicitacao.titulo}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{solicitacao.titulo}</h5>
                                    <p className="card-text">{solicitacao.descricao}</p>

                                    <div className="mt-auto">
                                        <button className="btn btn-success"> 👍 </button>
                                        <button className="btn btn-danger ms-1"> 👎 </button>
                                        <button className="btn btn-primary ms-3"> Comentar... </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                {/*
                {
                    listaSolicitacoes.map(
                        solicitacoes => <div class="tst mt-3">
                            <div className="card me-5">
                                <img src={solicitacoes.imagem} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{solicitacoes.titulo}</h5>
                                    <p className="card-text">{solicitacoes.descricao}</p>
                                    <a href="#" className="btn btn-success"> 👍 </a>
                                    <a href="#" className="btn btn-danger ms-1" > 👎 </a>
                                    <a href="#" className="btn btn-primary ms-5" > Comentar... </a>


                                </div>
                            </div>

                        </div>
                    )
                }*/}
            </div>
        </div>
    )
}