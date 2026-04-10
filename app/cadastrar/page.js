'use client'

import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react";
import Link from "next/link";
import "./cadastrar.css"
import { useRouter } from "next/navigation";

const supabase = createClient(
    'https://edgdqwzpczmrsatrprxi.supabase.co',
    'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-'
)

function Cadastro() {

    const router = useRouter();

    const [Nome, alteraNome] = useState("")
    const [Cpf, alteraCpf] = useState("")
    const [data_nascimento, alteraDataNascimento] = useState("")
    const [Email, alteraEmail] = useState("")
    const [bairro, alteraBairro] = useState("")
    const [Senha, alteraSenha] = useState("")
    const [seleciona, alteraSelecionaBairro] = useState([])

    async function salvar(e) {
        e.preventDefault()

        if (Nome.length < 3) {
            alert("Preencha o nome corretamente.")
            return
        }
        if (!bairro) {
            alert("Selecione o bairro.")
            return
        }
        if (Cpf.length != 11) {
            alert("CPF precisa ter 11 números.")
            return
        }
        if (!data_nascimento) {
            alert("Selecione a data.")
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email: Email,
            password: Senha,
        })

        if (!data?.user) {
            alert("Erro no cadastro! Email ou senhas inválidos.")
            return
        }

        const cadastro = {
            id: data.user.id,
            nome: Nome,
            cpf: Cpf,
            data_nascimento,
            bairro,
            ativo: true
        }

        const resposta = await supabase
            .from('usuarios')
            .insert(cadastro)

        if (resposta.status == 201) {
            alert("Cadastrado com sucesso!")
            router.push("/login")
        } else {
            alert("Erro ao salvar.")
        }
    }

    async function buscaBairro() {
        const { data } = await supabase
            .from('bairros')
            .select()

        alteraSelecionaBairro(data)
    }

    useEffect(() => {
        buscaBairro()
    }, [])

    return (
        <div className="auth-bg">

            <div className="auth-card">

                <h1 className="auth-title">💚 Cadastro de Usuário</h1>

                <form onSubmit={salvar}>

                    <label className="auth-label">Nome</label>
                    <input
                        className="auth-input"
                        onChange={e => alteraNome(e.target.value)}
                    />

                    <label className="auth-label">CPF</label>
                    <input
                        className="auth-input"
                        onChange={e => alteraCpf(e.target.value)}
                    />

                    <label className="auth-label">Data de nascimento</label>
                    <input
                        type="date"
                        className="auth-input"
                        onChange={e => alteraDataNascimento(e.target.value)}
                    />

                    <label className="auth-label">E-mail</label>
                    <input
                        className="auth-input"
                        onChange={e => alteraEmail(e.target.value)}
                    />

                    <label className="auth-label">Senha</label>
                    <input
                        type="password"
                        className="auth-input"
                        onChange={e => alteraSenha(e.target.value)}
                    />

                    <label className="auth-label">Bairro</label>
                    <select
                        className="auth-input"
                        onChange={e => alteraBairro(e.target.value)}
                    >
                        <option>Selecione...</option>
                        {
                            seleciona.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.bairro}
                                </option>
                            ))
                        }
                    </select>

                    <button className="auth-btn" type="submit">
                        Cadastrar
                    </button>

                    <Link href="/">
                        <button className="auth-btn-outline" type="button">
                            Cancelar
                        </button>
                    </Link>

                </form>

            </div>

        </div>
    )
}

export default Cadastro;