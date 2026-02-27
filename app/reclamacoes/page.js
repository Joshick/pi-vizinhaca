import "./Reclamacoes.css"


export default function Reclamacoes() {
  return (

    <div>

      <div>
        <label>
          <p>digite sua reclamação</p>

          <textarea type="textoMensagem"></textarea>
        </label>
        <br />

        <p>Data da ocorrência</p>
        <input type="date" />

        <br />

        <p>categoria:</p>
        <select >
          <option>...</option>

          <option>Serviços Publicos</option>

          <option>infraestrutura</option>

          <option>saúde</option>

          <option>segurança</option>

          <option>educação</option>

          <option>trânsito</option>

          <option>comercial/outros</option>

        </select>

        <br/>

        <label>
          <p>Digite o endereço:</p>
          <textarea type="textoMensagem"></textarea>
        </label>

        

        <label>
          <p>Numero:</p>
          <textarea type="textoMensagem"></textarea>
        </label>







      </div>

    </div>


  );
}


