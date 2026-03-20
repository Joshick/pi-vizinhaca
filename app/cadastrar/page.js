'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../conexao/supabse";


function Cadastro() {

    const [Nome, alteraNome] = useState("")
    const [Cpf, alteraCpf] = useState("")
    const [nascimento, alteraNascimento] = useState("")
    const [Email, alteraEmail] = useState("")
    const [bairro, alteraBairro] = useState("")
    const [Senha, alteraSenha] = useState("")
    const [Responsavel, alteraResponsavel] = useState()
    const [Ativo, alteraAtivo] = useState()
    const [seleciona, alteraSelecionaBairro] = useState([])


    const [listaCadastro, alteraListaCadastro] = useState([

        { 
            nome: "",
            cpf: "",
            nascimento: "",
            email: "",
            bairro: "",
            senha: "",
            responsavel: "",
            ativo: "",
        }

    ])

    
    async function salvar(e) {
        e.preventDefault()
        const cadastro = {
            nome: Nome,
            cpf: Cpf,
            nascimento: nascimento,
            email: Email,
            bairros: bairro,
            senha: Senha,
            responsavel: Responsavel,
            ativo: Ativo,

        }
        
        const { error } = await supabase
        .from('usuarios')
        .insert(cadastro)


        alteraListaCadastro(listaCadastro.concat(cadastro))
        
        console.log(cadastro)
        console.log(error)
        

        if (error == null) {
            alert("Solicitação enviada com sucesso!")
            alteraNome("")
            alteraCpf("")
            alteraNascimento("")
            alteraEmail("")
            alteraBairro("")
            alteraSenha("")
            alteraResponsavel()
            alteraAtivo()
        } else {
            alert("Dados inválidos!")

        }
    }


    async function buscaBairro() {
        const {data, error} = await supabase
            .from('bairros')
            .select('bairro')

        console.log(data)

        alteraSelecionaBairro(data)
    }



    useEffect(()=> {
            buscaBairro()
    }, [])


    return (
        <div>

            <h1 className="text-center mt-5"> Cadastro De Usuários </h1>

            <hr />

            <form onSubmit={salvar} className="formCadastro text-center">

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
                    <input type= "date" onChange={e => alteraNascimento(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    Digite o e-mail:
                    <br />
                    <input onChange={e => alteraEmail(e.target.value)} />
                </label>

                <br /><br />


                <label>
                    Selecione o bairro:
                    <br />
                      <select onChange={e => buscaBairro (e.target.value)} >
                        <option>Selecione...</option>
                        {
                            seleciona.map(
                                item=> <option value={item.bairros}> {item.bairro}</option>
                            )
                        }
                       
                        
                    </select>
                </label>

                <br /><br />

                <label>
                    Digite a senha:
                    <br />
                    <input type="password" onChange={e => alteraSenha(e.target.value)} />
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