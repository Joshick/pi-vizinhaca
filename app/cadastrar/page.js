'use client'
import { useState } from "react";
import Link from "next/link";
import supabase from "../conexao/supabse";


function Cadastro() {

    const [Nome, alteraNome] = useState("")
    const [Cpf, alteraCpf] = useState("")
    const [Data, alteraData] = useState("")
    const [Email, alteraEmail] = useState("")
    const [Bairro, alteraBairro] = useState("")
    const [Senha, alteraSenha] = useState("")
    const [Responsavel, alteraResponsavel] = useState("")
    const [Premium, alteraPremium] = useState("")


    const [listaCadastro, alteraListaCadastro] = useState([

        { 
            nome: "",
            cpf: "",
            data: "",
            email: "",
            bairro: "",
            senha: "",
            responsavel: "",
            premium: "",
        }

    ])

    
    function salvar(e) {
        e.preventDefault()
        
        const cadastro = {
            nome: Nome,
            cpf: Cpf,
            data: Data,
            email: Email,
            bairro: Bairro,
            senha: Senha,
            responsavel: Responsavel,
            premium: Premium,
            
        }
        
        alteraListaCadastro(listaCadastro.concat(cadastro))
        
        console.log(cadastro)
    }

    return (
        <div>

            <h1 class="text-center mt-5"> Cadastro De Usuários </h1>

            <hr />

            <form onSubmit={salvar} class="formCadastro text-center">

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
                    <input onChange={e => alteraData(e.target.value)} />
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
                      <select onChange={e => alteraBairro(e.target.value)} required class="inputBairro">
                        <option hidden></option>
                        <option>Jockey Clube</option>
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
                    <input onChange={e => alteraSenha(e.target.value)} />
                </label>

                <br /><br />

                <label>
                    É Responsável?
                    <br />
                    {e => alteraResponsavel(e.target.value)}<select required class="inputResponsavel" >
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    É Premium?
                    <br />
                    {e => alteraPremium(e.target.value)}<select required class="inputPremium">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label>

                <br /><br />

              <button class="btn btn-outline-success me-2" type="submit">Salvar</button>
            <Link href="/" ><button class="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>

            </form>

            <br /><br />

            {/*<table class="table">
                <thead>
                    <tr>
                        <th scope="col">Bairros</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jockey Clube</td>
                        <td>Cidade Aracy</td>
                        <td>Jardim São Carlos</td>
                    </tr>
                    <tr>
                        <td>Jardim Lutfalla</td>
                        <td>Jardim Paulistano</td>
                        <td>Jardim Brasil</td>
                    </tr>
                    <tr>
                        <td>Botafogo</td>
                        <td>Zavaglia</td>
                        <td>Centro</td>
                    </tr>
                </tbody>
            </table>*/}




        </div >
    )


}
export default Cadastro;