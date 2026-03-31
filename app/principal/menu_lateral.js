import "./principal.css"


function Menu_lateral() {
    return ( 

            <div className="col-2" >
               {/* LOGO + NOME */}
                <div className="text-center mt-3">
                    <img src="https://placehold.co/100"></img>
                    <h1> Amigo da Vizinhança</h1>
                </div>
            {/* LISTAGEM DAS PÁGINAS */}
                <div className="list-group list-group-flush">
                    <a href="./principal" className="list-group-item list-group-item-action"><i className="bi bi-house"></i> Home </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modalCriar"><i className="bi bi-plus-lg"></i> Criar solicitação </a>
                    <a href="./usuarios" className="list-group-item list-group-item-action"><i className="bi bi-people-fill"></i> Usuários </a>
                    <a href="./Bairros" className="list-group-item list-group-item-action"><i className="bi bi-pin-map"></i> Bairros </a>
                    <a href="./aprovacao" className="list-group-item list-group-item-action"><i className="bi bi-check-all"></i> Aprovações </a>
                </div>
             {/* PERFIL INFERIOR */}
                <div className="text-center">
                    <div>
                        <button  data-bs-toggle="modal" data-bs-target="#modalPerfil"> <i className="bi bi-person-circle"></i> Perfil </button> 
                        <a href="/" ><button>Sair</button></a>
                    </div>
                </div>
            </div>
       
     );
}

export default Menu_lateral;
