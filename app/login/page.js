export default function Login() {
    return (
        <div>
           
            <h1 class="text-center mt-5"> Login de Usuários </h1>

            <form class="formLogin text-center">

                <label>
                    Digite o e-mail:
                    <br />
                    <input required type="email" class="inputEmail" />
                </label>

                <br /><br />

                <label>
                    Digite a Senha:
                    <br />
                    <input required type="password" class="inputSenha" />
                </label>


                <br /><br />

                <button class="btn btn-outline-success" type="submit">Entrar</button>

            </form>

        </div>
    )
}