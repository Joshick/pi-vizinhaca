import supabase from "../conexao/supabse"
import Link from "next/link";


export default function Login() {
    return (
        <div>
           
            <h1 class="text-center mt-5"> Login de Usuários </h1>

            <form class="formLogin text-center">

                <label>
                    Digite o e-mail:
                    <br />
                    <input required type="email" class="inputEmail" />
                </label>

                <br /><br />

                <label>
                    Digite a Senha:
                    <br />
                    <input required type="password" class="inputSenha" />
                </label>


                <br /><br />

                <Link href= "/principal" ><button class="btn btn-outline-success me-2" type="submit">Entrar</button></Link>
                <Link href= "/" ><button type="button" class="btn btn-secondary ms-2">Cancelar</button></Link>

            </form>

        </div>
    )
}