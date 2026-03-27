//   <Link href="/principal">  <Link href="/"

'use client'

import { useState } from "react";
import supabase from "../conexao/supabse";
import Link from "next/link";

export default function Login() {

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

        alert("Atenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)
    }


    return (
        <div>

            <h1 class="text-center mt-5"> Login de Usuários </h1>

            <form class="formLogin text-center">


                Digite o e-mail: <input onChange={e => alteraEmail(e.target.value)}></input>
                <br />
                <br />


                Digite a Senha: <input onChange={e => alteraSenha(e.target.value)}></input>
                <br />
                <br />

                <button onClick={autenticar} class="btn btn-outline-success me-2" type="submit">Entrar</button>
                <button type="button" class="btn  btn-outline-danger ms-2">Cancelar</button>


            </form>

        </div>
    )
}