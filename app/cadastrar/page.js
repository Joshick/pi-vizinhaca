'use client'

import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react";
import Link from "next/link";
import "./cadastrar.css/"
import { useRouter } from "next/navigation";
const supabase = createClient('https://edgdqwzpczmrsatrprxi.supabase.co', 'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-')

function Cadastro() {


    const router = useRouter();


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

        // PRIMEIRO VALIDA TODOS OS DADOS DO FORMULÁRIO
        if (Nome.length < 3) {
            alert("Preencha o nome corretamente para continuar.")
            return
        }
        if (bairro == null || bairro == "" || bairro < 0) {
            alert("Selecione o bairro antes de continuar.")
            return
        }
        if (Cpf.length != 11) {
            alert("O CPF deve ter 11 caracteres para prosseguir.")
            return
        }
        if (data_nascimento == null || data_nascimento == "") {
            alert("Selecione uma data de nascimento para continuar.")
            return
        }

        // DEPOIS ENVIA PARA O AUTHENTICATION DO SUPABASE
        const { data, error } = await supabase.auth.signUp({
            email: Email,
            password: Senha,
        })
        if (data == null || data.user == null) {
            alert("Email ou senha inválidos! Tente novamente.")

            return
        }else{
            console.log(error)
        }

        // CADASTRA NA TABELA DE USUÁRIOS :)
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

        if (resposta.status == 201) {
            alert("Cadastrado com sucesso!")
            router.push("/login")
        } else {
            alert("Verifique os dados e tente novamente.")
        }


        alteraListaCadastro(listaCadastro.concat(cadastro))

        console.log(cadastro)
        console.log(error)

        if (error == null) {

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

            <h1 className="text-center mb-2" style={{ color: "black" }}> <i class="bi bi-person-fill-add"> </i>Cadastro De Usuários</h1>
            <hr />
            <form onSubmit={salvar} className="formCadastro text-center" >

                <label for="inputNome" class="col-sm-2 col-form-label">
                    Digite o nome:
                    <br />
                    <input class="form-control" id="inputNome"
                        onChange={e => alteraNome(e.target.value)} />
                </label>

                <br /><br />

                <label for="inputCPF" class="col-sm-2 col-form-label">
                    Digite o CPF:
                    <br />
                    <input class="form-control" id="inputCPF"
                        onChange={e => alteraCpf(e.target.value)} />
                </label>

                <br /><br />

                <label for="inputData" class="col-sm-2 col-form-label">
                    Digite a data de nascimento:
                    <br />
                    <input class="form-control" id="inputData"
                        type="date" onChange={e => alteraDataNascimento(e.target.value)} />
                </label>

                <br /><br />

                < label for="inputEmail" class="col-sm-2 col-form-label">
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

                <label for="inputBairro" class="col-sm-2 col-form-label">
                    Selecione o bairro:
                    <br />
                    <select class="form-control" id="inputBairro"
                        onChange={e => alteraBairro(e.target.value)} >
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