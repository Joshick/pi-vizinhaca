"use client"
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"

export default function Bairros() {


    const [bairros, alteraBairros] = useState([]);

    const [nomeBairro, alteraNomeBairro] = useState("")
    
    async function buscar() {

       const { data, error } = await supabase
           .from('bairros')
           .select()
       console.log(data)
       alteraBairros(data)

   }

    async function salvar(e) {
        e.preventDefault()

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
            }
     }

    useEffect(() => {
        buscar()
    }, [])



    return (


        <div>
            <div class="container-fluid">
                <div class="row">


                    <aside class="col-2 border-end min-vh-100 p-3">
                        <div className="text-center">

                            <h5>Amigo da Vizinhança</h5>
                        </div>

                        <div className="list-group list-group-flush mt-4">

                            <a href="./principal" className="list-group-item list-group-item-action">Home</a>

                            <button className="list-group-item list-group-item-action text-start" data-bs-toggle="modal"
                                data-bs-target="#modalCriar">
                                Criar solicitação
                            </button>

                            <a href="./minhas_solicitacoes" className="list-group-item list-group-item-action">
                                Minhas Solicitações
                            </a>

                            <a href="./usuarios" className="list-group-item list-group-item-action active">
                                Usuários
                            </a>

                            <a href="./Bairros" className="list-group-item list-group-item-action">
                                Bairros
                            </a>


                        </div>
                    </aside>


                    <main className="col-10 p-4">
                        <h2>🏠 Bairros</h2>

                        <form onSubmit={salvar}>
                            <p>Digite o nome do Bairro</p>
                            
                            <input onChange={e => alteraNomeBairro(e.target.value)} />

                            <br />
                            <button>Salvar</button>

                        </form>

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
                                <td scope="col"><button  >Editar</button><button onClick={ ()=> excluir(item.id) } class = "ms-1" >Excluir</button></td>

                                </tr>
                            </thead>
                        )
                }
         
                        </table>
                    </main>

                </div>
            </div>

            <div className="modal fade" id="modalCriar" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Nova Solicitação</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Título *</label>
                                <input className="form-control" placeholder="Ex: Buraco na rua" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categoria *</label>
                                <select className="form-select" required>
                                    <option hidden>Selecione...</option>
                                    <option>Infraestrutura</option>
                                    <option>Saúde</option>
                                    <option>Segurança</option>
                                    <option>Educação</option>
                                    <option>Trânsito</option>
                                    <option>Serviços públicos</option>
                                    <option>Comercial/Outros</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrição *</label>
                                <textarea className="form-control" rows="4" placeholder="Descreva o problema..." required></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Bairro / Rua</label>
                                <input className="form-control" placeholder="Ex: Centro - Rua X, 123" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Prioridade</label>
                                <select className="form-select">
                                    <option>Normal</option>
                                    <option>Média</option>
                                    <option>Alta</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagem do problema</label>
                                <input type="file" className="form-control" accept="image/*" />
                            </div>


                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )
}