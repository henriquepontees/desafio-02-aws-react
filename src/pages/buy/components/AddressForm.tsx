import { SlLocationPin } from "react-icons/sl"

const AddressForm = () => {
    return <>
    <section id="adressForm">
      <h2><SlLocationPin />Endereço de Entrega</h2>
      <p>Informe o endereço onde deseja receber seu pedido</p>
      <form>
          <input type="text" name="cep" id="cep" placeholder="CEP"/>
          <input type="text" name="street" id="street" placeholder="Rua"/>
          <input type="text" name="number" id="number" placeholder="Número"/>
          <input type="text" name="complement" id="complement" placeholder="Complemento"/>
          <input type="text" name="district" id="district" placeholder="Bairro"/>
          <input type="text" name="city" id="city" placeholder="Cidade"/>
          <input type="text" name="state" id="state" placeholder="Estado"/>
      </form>
    </section>
  </>
}

export default AddressForm