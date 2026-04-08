'use client'

import Link from "next/link";
import "./ajuda.css";

export default function Ajuda() {
    return (
        <div className="ajuda-container">

            {/* Cabeçalho */}
            <div className="ajuda-header text-center">
                <h1>💚 Central de Ajuda</h1>
                <p>Aprenda a usar o site de forma simples e rápida</p>
            </div>

            <hr />

            {/* Seções */}
            <div className="container">

                <div className="row">

                    <div className="col-md-4">
                        <div className="card-ajuda">
                            <h3>🔐 Login e Cadastro</h3>
                            <p>
                                Para começar, clique em <b>LOGIN</b> se já tiver conta.
                                Caso contrário, clique em <b>CADASTRAR</b> e preencha seus dados.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-ajuda">
                            <h3>📍 Como usar</h3>
                            <p>
                                Após entrar, você pode registrar problemas no seu bairro
                                e visualizar informações importantes.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-ajuda">
                            <h3>🤝 Contribuir</h3>
                            <p>
                                Ajude outros usuários adicionando informações úteis
                                e mantendo o ambiente atualizado.
                            </p>
                        </div>
                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col-md-6">
                        <div className="card-ajuda destaque">
                            <h3>⚠️ Dicas Importantes</h3>
                            <ul>
                                <li>Use informações claras</li>
                                <li>Evite dados incorretos</li>
                                <li>Seja respeitoso</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card-ajuda destaque">
                            <h3>📞 Suporte</h3>
                            <p>
                                Se tiver dúvidas ou problemas, procure o suporte
                                dentro do site ou fale com o administrador.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <br />

            <div className="text-center">
                <Link href="/">
                    <button className="btn btn-success">Voltar para início</button>
                </Link>
            </div>

        </div>
    );
}