'use client'
import { useState } from "react";
import Link from "next/link";
import supabase from "../conexao/supabse";


function Cadastro() {

    const [Nome, alteraNome] = useState("")
    const [Cpf, alteraCpf] = useState("")
    const [nascimento, alteraNascimento] = useState("")
    const [Email, alteraEmail] = useState("")
    const [Bairro, alteraBairro] = useState("")
    const [Senha, alteraSenha] = useState("")
    const [Responsavel, alteraResponsavel] = useState()
    const [Ativo, alteraAtivo] = useState()


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
            id_bairros: 23,
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
                      <select onChange={e => alteraBairro(e.target.value)} required className="inputBairro">
                        <option hidden></option>
                        <option value={22}>Jockey Clube</option>
                        <option>Cidade Aracy</option>
                        <option>Jardim São Carlos</option>
                        <option>Jardim Lutfalla</option>
                        <option>Jardim Paulistano</option>
                        <option>Jardim Brasil</option>
                        <option>Botafogo</option>
                        <option>Zavaglia</option>
                        <option>Centro</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    Digite a senha:
                    <br />
                    <input type="password" onChange={e => alteraSenha(e.target.value)} />
                </label>

                <br /><br />

                {/* <label>
                    É Responsável?
                    <br />
                    {e => alteraResponsavel(e.target.value)}<select required className="inputResponsavel" >
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    Está ativo?
                    <br />
                    {e => alteraAtivo(e.target.value)}<select required className="inputAtivo">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label> */}

                <br /><br />

              <button className="btn btn-outline-success me-2" type="submit">Salvar</button>
            <Link href="/" ><button className="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>

            </form>

            <br /><br />

        </div >
    )


}
export default Cadastro;