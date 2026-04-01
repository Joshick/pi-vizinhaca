"use client"
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"
import Menu_lateral from "../principal/menu_lateral";

export default function Bairros() {


    const [bairros, alteraBairros] = useState([]);

    const [nomeBairro, alteraNomeBairro] = useState("")
    const [editando, alteraEditando] = useState(null)

    function editar(objeto) {

        alteraEditando(objeto.id)
        alteraNomeBairro(objeto.bairro)

    }

    async function atualizar(){

        const objeto = {
            bairro: nomeBairro,
        }

        const { error } = await supabase
            .from('bairros')
            .update(objeto)
            .eq('id', editando)
        
        if(error ==  null){
            alert("Atualização realizada com sucesso!")

            cancelaEdicao()
            buscar()
        }else{
            alert("Dados inválidos! Verifique os campos e tente novamente.")
        }
        
    }

    function cancelaEdicao() {

        alteraEditando(null)

        alteraNomeBairro("")

    }
    
    async function buscar() {

       const { data, error } = await supabase
           .from('bairros')
           .select()
       console.log(data)
       alteraBairros(data)

   }

    async function salvar() {
        
        if (!nomeBairro.trim()) return;

        const novo = {
            bairro: nomeBairro.trim(),
        }

        

        alteraBairros(bairros.concat(novo))
        alteraNomeBairro("")

        const { error } = await supabase
            .from('bairros')
            .insert(novo)

        console.log(error)
        alteraNomeBairro(novo)

        if (error == null) {
            alert("Bairro cadastrado com sucesso!!!")
            alteraNomeBairro("")

            buscar()
           
        } else {
            alert("Dados inválidos, verifique os campos e tente novamente...")
        }
    }

     async function excluir(id){
            const opcao = confirm("Tem certeza que deseja excluir?")
            if(opcao == false){
                return
            } else {
                const response = await supabase
                .from('bairros')
                .delete()
                .eq('id', id)

                buscar()
            }
     }

    useEffect(() => {
        buscar()
    }, [])



    return (


        <div>
            <div className="row">
                
                <Menu_lateral/>

                    <main className="col-10 p-4">
                        <h2>🏠 Bairros</h2>

                        <div >
                            <p>Cadastrar um novo bairro</p>
                            
                            <input value={nomeBairro} onChange={e => alteraNomeBairro(e.target.value)} />

                            <br />

                            {
                    editando != null ?
                        <div>
                            <button onClick={atualizar} class="ms-2 me-2" >Atualizar</button>
                            <button onClick={() => cancelaEdicao(false)} >Cancelar</button>
                        </div>
                        :
                        <button onClick={salvar} >Cadastrar</button>
                }
                            {/* <button>Cadastrar</button> */}

                        </div>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Bairros</th>
                                    <th scope="col">Ações</th>

                                </tr>
                            </thead>

                            
                {

                    bairros.length == 0 ?
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        bairros.map(
                            item => 
                            <thead>
                                <tr>
                                <td scope="col"><li>{item.bairro}</li></td>
                                <td scope="col"><button onClick={ ()=> editar(item) } >Editar</button><button onClick={ ()=> excluir(item.id) } class = "ms-1" >Excluir</button></td>

                                </tr>
                            </thead>
                        )
                }
         
                        </table>
                    </main>

                </div>
           
        </div>



    )
}