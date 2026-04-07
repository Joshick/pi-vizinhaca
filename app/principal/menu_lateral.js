'use client'

import "./principal.css"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const supabase = createClient(
  'https://edgdqwzpczmrsatrprxi.supabase.co',
  'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-'
)

function Menu_lateral() {

  const [admin, alteraAdmin] = useState(false)
  const [responsavel, alteraResponsavel] = useState(false)

  async function verificarPerfil() {
    const { data: { user }, error: erroAuth } = await supabase.auth.getUser()

    if (erroAuth || !user) {
      console.log(erroAuth)
      alteraAdmin(false)
      alteraResponsavel(false)
      return
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('admin, responsavel')
      .eq('id', user.id)
      .single()

    if (error) {
      console.log(error)
      alteraAdmin(false)
      alteraResponsavel(false)
      return
    }

    alteraAdmin(data?.admin === true)
    alteraResponsavel(data?.responsavel === true)
  }

  useEffect(() => {
    verificarPerfil()
  }, [])

  return (
    <div className="col-2">
      <div className="text-center mt-3">
        <img src="https://placehold.co/100" alt="Logo" />
        <h1>Amigo da Vizinhança</h1>
      </div>

      <div className="list-group list-group-flush">
        <a href="./principal" className="list-group-item list-group-item-action">
          <i className="bi bi-house"></i> Home
        </a>

        <a
          className="list-group-item list-group-item-action"
          data-bs-toggle="modal"
          data-bs-target="#modalCriar"
        >
          <i className="bi bi-plus-lg"></i> Criar solicitação
        </a>

        {admin && (
          <>
            <a href="./usuarios" className="list-group-item list-group-item-action">
              <i className="bi bi-people-fill"></i> Usuários
            </a>

            <a href="./bairros" className="list-group-item list-group-item-action">
              <i className="bi bi-pin-map"></i> Bairros
            </a>
          </>
        )}

        {(admin || responsavel) && (
          <a href="./aprovacao" className="list-group-item list-group-item-action">
            <i className="bi bi-check-all"></i> Aprovações
          </a>
        )}
      </div>

      <div className="text-center">
        <div>
          <button data-bs-toggle="modal" data-bs-target="#modalPerfil">
            <i className="bi bi-person-circle"></i> Perfil
          </button>
          <a href="/"><button>Sair</button></a>
        </div>
      </div>
    </div>
  )
}

export default Menu_lateral