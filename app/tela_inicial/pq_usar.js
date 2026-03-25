import "./Home.css"
export default function Pq_usar() {
    return (
        <div>
            <h2>Por que usar?</h2>
            <p>Uma plataforma completa</p>
            <br/>
           <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://cdn-icons-png.flaticon.com/512/40/40054.png" class="img-fluid rounded-start; img" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Relatos por Bairro</h5>
                            <p class="card-text"> Veja e reporte problemas específicos do seu bairro</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="data:image/png;base64,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" class="img-fluid rounded-start; img" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Acompanhamento</h5>
                            <p class="card-text"> Acompanhe o status de resolução dos problemas em andamento</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="data:image/png;base64,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" class="img-fluid rounded-start; img" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Sistema de Votação</h5>
                            <p class="card-text"> Vote nos problemas mais urgentes da sua região</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}