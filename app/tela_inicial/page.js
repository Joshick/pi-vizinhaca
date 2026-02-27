import Como_usar from "./Como_usar"
import "./page.css"
import Pq_usar from "./pq_usar"

export default function tela_inicial() {
    return (
        <div>

            <div className="cabecalho" >

                <h1>Amigo da Vizinhança 🕷 </h1>
                <p>Ajude a melhorar o seu bairro.</p>
                <button class="btn btn-outline-success btn-sm me-2">LOGIN</button>
                <button class="btn btn-outline-secondary btn-sm ms-2">CADASTRAR</button>

            </div>

            <hr />
            <div>
                <div class="container text-rigth">
                    <div class="row ">
                        <div class="col">
                           
                           <Pq_usar/>

                            
                        </div>
                        <div class="col">
                           
                           <Como_usar/>

                        </div>
                       
                    </div>
                </div>

            </div>

        </div>
    )
}