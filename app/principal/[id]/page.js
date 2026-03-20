"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import supabase from "@/app/conexao/supabse"

function ConsultaMinhasSolicitacoes() {


    const [minhasSolicitacoes, alteraMinhasSolicitacoes] = useState([])
    const params = useParams()
    async function buscarMinhasSolicitacoes() {

        const { data, error } = await supabase
            .from('solicitacoes')
            .select(`
                *,
                id_usuario (*),
                id_bairro (*)
                `)
            .eq('id_usuario', params.id)

        console.log(error)
        alteraMinhasSolicitacoes(data)
    }

    return (
        <div>

        </div>
    )
}

export default ConsultaMinhasSolicitacoes;
