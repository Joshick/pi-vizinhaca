import Image from "next/image";
import Pq_usar from "./tela_inicial/pq_usar";
import Como_usar from "./tela_inicial/Como_usar";
import "./tela_inicial/Home.css"
import Link from "next/link";
import supabase from "./conexao/supabse";

export default function Home() {
    return (
        <div>

            <div className="cabecalho" >

                <h1>Amigo da Vizinhança 🕷 </h1>
                <p>Ajude a melhorar o seu bairro.</p>
                <Link href="/login"><button class="btn btn-outline-success btn-sm me-2">LOGIN</button></Link> 
                <Link href="/cadastrar"><button class="btn btn-outline-secondary btn-sm ms-2">CADASTRAR</button></Link>

            </div>
            <br/>
            <br/>
            <hr />
            <br/>

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