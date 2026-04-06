//   <Link href="/principal">  <Link href="/"

'use client'

import { useState } from "react";
import supabase from "../conexao/supabse";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter();

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar(e) {
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if (data.user == null) {
            alert("Dados inválidos...")
            return
        }

        alert("Autenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)

        router.push("/principal")

    }


    return (
        <div className="borda">

            <h1 class="text-center mt-5"> Login de Usuários </h1>
            <hr />
            <form class="formLogin text-center">


                <label for="inputEmail" class="col-sm-2 col-form-label">
                    Digite o e-mail:
                    <br />
                    <input class="form-control" id="inputEmail"
                        required type onChange={e => alteraEmail(e.target.value)} />
                </label>
                <br /><br />

                <label for="inputSenha" class="col-sm-2 col-form-label">
                    Digite a senha:
                    <br />
                    <input class="form-control" id="inputSenha"
                        type="password" onChange={e => alteraSenha(e.target.value)} />
                </label>
                <br /><br />

                <button onClick={autenticar} class="btn btn-outline-success me-2" type="submit">Entrar</button>
                <Link href="/" ><button className="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>


            </form>

        </div>
    )
}