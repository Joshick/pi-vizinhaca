'use client'
import { useState, useEffect, useRef } from "react"
import Menu_lateral from "../principal/menu_lateral"

const dicas = [
  {
    id: 1,
    icone: "bi-tree",
    titulo: "Mantenha o bairro limpo",
    descricao: "Evite jogar lixo nas ruas e respeite os dias de coleta."
  },
  {
    id: 2,
    icone: "bi-people",
    titulo: "Ajude seus vizinhos",
    descricao: "Pequenas atitudes fortalecem a comunidade."
  },
  {
    id: 3,
    icone: "bi-exclamation-triangle",
    titulo: "Denuncie problemas",
    descricao: "Use a plataforma para relatar problemas no bairro."
  },
  {
    id: 4,
    icone: "bi-flower1",
    titulo: "Preserve áreas verdes",
    descricao: "Cuide dos espaços públicos e da natureza."
  },
  {
    id: 5,
    icone: "bi-heart",
    titulo: "Cuide dos animais",
    descricao: "Evite abandono e proteja seus pets."
  },
  {
    id: 6,
    icone: "bi-lightbulb",
    titulo: "Economize energia",
    descricao: "Evite desperdícios no dia a dia."
  },
]

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!ref.current) return
    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
      }
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return [ref, visible]
}

function Card({ dica }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className="col-md-4 mb-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: "0.4s ease"
      }}
    >
      <div className="card shadow-sm h-100 border-0 dica-card">
        <div className="card-body text-center">
          <i
            className={`bi ${dica.icone}`}
            style={{ fontSize: "32px", color: "#455c06" }}
          ></i>

          <h5 className="card-title mt-3">{dica.titulo}</h5>
          <p className="card-text text-muted">{dica.descricao}</p>
        </div>
      </div>
    </div>
  )
}

export default function Dicas() {
  return (
    <div className="row">
      <Menu_lateral />

      <div className="col-10 p-4">
        <h2 className="mb-4" style={{ color: "#455c06" }}>
          Dicas para um bairro melhor
        </h2>

        <div className="row">
          {dicas.map((dica) => (
            <Card key={dica.id} dica={dica} />
          ))}
        </div>

        <div
          className="mt-5 p-4 rounded text-white text-center"
          style={{ background: "#455c06" }}
        >
          <h5>Juntos fazemos a diferença</h5>
          <p className="mb-0">Cada pequena ação melhora nossa comunidade.</p>
        </div>
      </div>
    </div>
  )
}