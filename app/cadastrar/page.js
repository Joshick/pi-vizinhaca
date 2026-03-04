import Link from "next/link";

export default function Cadastro() {
    return (
        <div>

            <h1 class="text-center mt-5"> Cadastro De Usuários </h1>

            <hr />

            <form class="formCadastro text-center">

                <label>
                    Digite o nome:
                    <br />
                    <input required type="text" class="inputNome" />
                </label>

                <br /><br />

                <label>
                    Digite o CPF:
                    <br />
                    <input required type="email" class="inputcpf" />
                </label>

                <br /><br />


                <label>
                    Digite a data de nascimento:
                    <br />
                    <input required type="date" class="inputData" />
                </label>

                <br /><br />

                 <label>
                    Digite o e-mail:
                    <br />
                    <input required type="email" class="inputEmail" />
                </label>

                <br /><br />


                <label>
                    Digite o bairro:
                    <br />
                    <input required type="password" class="inputbairro" />
                </label>

                <br /><br />

                <label>
                    Digite a senha:
                    <br />
                    <input required type="text" class="inputSenha" />
                </label>

                <br /><br />

                <label>
                    É Responsável?
                    <br />
                    <select required class="inputResponsavel">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    É Premium?
                    <br />
                    <select required class="inputPremium">
                        <option>Sim</option>
                        <option>Não</option>
                    </select>
                </label>

                <br /><br />

                <Link href= "/login" ><button class="btn btn-outline-success me-2" type="submit">Salvar</button></Link>
                <Link href= "/" ><button class="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>

            </form>

        </div>
    )
}