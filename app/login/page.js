'use client'

import { useState } from "react";
import supabase from "../conexao/supabse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css"

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
        <div className="auth-bg">

            <div className="auth-card">

                <h1 className="auth-title">Login de Usuários</h1>

                <form onSubmit={autenticar}>

                    <label className="auth-label">Digite o e-mail:</label>
                    <input
                        className="auth-input"
                        placeholder="Seu e-mail"
                        onChange={e => alteraEmail(e.target.value)}
                        required
                    />

                    <label className="auth-label">Digite a senha:</label>
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Sua senha"
                        onChange={e => alteraSenha(e.target.value)}
                        required
                    />

                    <button className="auth-btn" type="submit">
                        Entrar
                    </button>

                    <Link href="/">
                        <button type="button" className="auth-btn-outline">
                            Cancelar
                        </button>
                    </Link>

                </form>

            </div>

        </div>
    )
}