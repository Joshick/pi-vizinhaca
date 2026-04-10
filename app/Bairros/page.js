"use client"
import supabase from "../conexao/supabse"
import { useEffect, useState } from "react"
import Menu_lateral from "../principal/menu_lateral";
import styles from "./bairros.module.css";

export default function Bairros() {
    
    if(typeof window === "undefined") return null


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
            <div className="row m-0">
                <Menu_lateral/>

                <main className={`col-10 ${styles.pageContainer}`}>
                    <h2 className={styles.title}>🏠 Bairros</h2>

                    <div className={styles.card}>
                        <p className={styles.formDescription}>
                            {editando != null ? "Atualizar bairro selecionado" : "Cadastrar um novo bairro"}
                        </p>
                        
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.inputField} 
                                value={nomeBairro} 
                                onChange={e => alteraNomeBairro(e.target.value)} 
                                placeholder="Digite o nome do bairro..."
                            />

                            {editando != null ? (
                                <>
                                    <button onClick={atualizar} className={styles.btnPrimary}>Atualizar</button>
                                    <button onClick={() => cancelaEdicao(false)} className={styles.btnSecondary}>Cancelar</button>
                                </>
                            ) : (
                                <button onClick={salvar} className={styles.btnPrimary}>Cadastrar</button>
                            )}
                        </div>
                    </div>

                    <div className={styles.tableCard}>
                        <table className={`table table-hover ${styles.customTable}`}>
                            <thead>
                                <tr>
                                    <th scope="col">Bairros</th>
                                    <th scope="col" style={{ width: "200px", textAlign: "right" }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bairros.length == 0 ? (
                                    <tr>
                                        <td colSpan="2">
                                            <div className={styles.loadingContainer}>
                                                <div className="spinner-border text-success" role="status"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    bairros.map(item => (
                                        <tr key={item.id}>
                                            <td><div className={styles.bairroName}>{item.bairro}</div></td>
                                            <td style={{ textAlign: "right" }}>
                                                <button onClick={() => editar(item)} className={styles.btnEdit}>Editar</button>
                                                <button onClick={() => excluir(item.id)} className={styles.btnDelete}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}