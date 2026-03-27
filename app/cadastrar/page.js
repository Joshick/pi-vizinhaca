'use client'

import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react";
import Link from "next/link";
import "./cadastrar.css/"
const supabase = createClient('https://edgdqwzpczmrsatrprxi.supabase.co', 'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-')

function Cadastro() {

    const [Nome, alteraNome] = useState("")
    const [Cpf, alteraCpf] = useState("")
    const [data_nascimento, alteraDataNascimento] = useState("")
    const [Email, alteraEmail] = useState("")
    const [bairro, alteraBairro] = useState("")
    const [Senha, alteraSenha] = useState("")
    
    const [listaCadastro, alteraListaCadastro] = useState([])
    
    const [seleciona, alteraSelecionaBairro] = useState([])

    async function salvar(e) {
        e.preventDefault()

        const { data, error } = await supabase.auth.signUp({
            email: Email,
            password: Senha,
        })
        console.log(error)
        if (data == null) {
            alert("Dados inválidos...")
            return
        }

        const cadastro = {
            id: data.user.id,
            nome: Nome,
            cpf: Cpf,
            data_nascimento: data_nascimento,
            bairro: bairro,
        }

        const resposta = await supabase
            .from('usuarios')
            .insert(cadastro)

        if (resposta.error == null) {
            alert("Cadastrado com sucesso!")
        } else {
            alert("Verifique os dados e tente novamente...")
        }

        alteraListaCadastro(listaCadastro.concat(cadastro))

        console.log(cadastro)
        console.log(error)

        if (error == null) {
            alert("Solicitação enviada com sucesso!")
    
        } else {
            alert("Dados inválidos!" + error)

        }
    }

    async function buscaBairro() {
        const { data, error } = await supabase
            .from('bairros')
            .select()

        console.log(data)

        alteraSelecionaBairro(data)
    }

    useEffect(() => {
        buscaBairro()
    }, [])

    return (
        <div className="inicio">

            <h1 className="text-center mb-3" style={{ color: "#064837" }}> <i class="bi bi-person-fill-add"></i>Cadastro De Usuários</h1>
            <br /><br />
            <hr />
            <form onSubmit={salvar} className="formCadastro text-center" >

                <label>
                    Digite o nome:
                    <br />
                    <input onChange={e => alteraNome(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Digite o CPF:
                    <br />
                    <input onChange={e => alteraCpf(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Digite a data de nascimento:
                    <br />
                    <input type="date" onChange={e => alteraDataNascimento(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Digite o e-mail:
                    <br />
                    <input required type onChange={e => alteraEmail(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Digite a senha:
                    <br />
                    <input type="password" onChange={e => alteraSenha(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Selecione o bairro:
                    <br />
                    <select onChange={e => alteraBairro(e.target.value)} >
                        <option>Selecione...</option>
                        {
                            seleciona.map(
                                item => <option value={item.id}> {item.bairro}</option>
                            )
                        }

                    </select>
                </label>

                <br /><br />

                <button className="btn btn-outline-success me-2" type="submit">Salvar</button>
                <Link href="/" ><button className="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>

            </form>

            <br /><br />

        </div >
    )

}
export default Cadastro;