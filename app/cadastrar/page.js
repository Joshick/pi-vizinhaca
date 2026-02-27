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
                    Digite o e-mail:
                    <br />
                    <input required type="email" class="inputEmail" />
                </label>

                <br /><br />


                <label>
                    Digite a data de nascimento:
                    <br />
                    <input required type="date" class="inputData" />
                </label>

                <br /><br />

                <label>
                    Digite a Senha:
                    <br />
                    <input required type="password" class="inputSenha" />
                </label>

                <br /><br />

                <label>
                    Digite o Bairro:
                    <br />
                    <input required type="text" class="inputBairro" />
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
                <Link href= "/" > <button class="btn btn-outline-danger ms-2" type="reset">Cancelar</button></Link>

            </form>

        </div>
    )
}