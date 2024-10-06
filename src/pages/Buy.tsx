import { SubmitHandler, useForm } from 'react-hook-form'
import '../styles/buy.css'
import PaymentMethod from '../Components/PaymentMethod'
import { SlLocationPin } from "react-icons/sl"
import axios from 'axios'
import { AddressData } from '../types/addressData'
import { useAddressStore } from '../store/useAddress'


const Buy = () => {
  const {register, handleSubmit, setValue, setFocus} = useForm<AddressData>()
  const {addAddress} = useAddressStore()
  const onBuy: SubmitHandler<AddressData> = data => {
    addAddress(data)
  }
  const checkCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '')
    if (!e.target.value) return
    await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(res => {
      setValue("street", res.data.logradouro)
      setValue("district", res.data.bairro)
      setValue("city", res.data.localidade)
      setValue("state", res.data.uf)
      setFocus("number")
    }).catch(err => console.log(err))
  }
  

  return <>
    <header>
      {/* PlaceHolder */}
    </header>
    <main>
      <section id='buyTitle'>
        <h1 id='title'>Finalize a compra</h1>
      </section>
      <section id='addressInfo'>
        <section id="addressForm">
          <div>
            <SlLocationPin style={{color: "#FF8100", marginLeft: '4px', width: '22px', height: '22px'}}/>
            <h2 id="addressTitle">Endereço de Entrega</h2>
            <p id="addressDescription">Informe o endereço onde deseja receber seu pedido</p>
          </div>
          <form>
            <input type="text" {...register("cep", {required: true})} onBlur={checkCep} id="cep" placeholder="CEP" className="formInput"/>
            <input type="text" {...register("street", {required: true})} id="street" placeholder="Rua" className="formInput"/>
            <fieldset id='homeNumber'>
              <input type="text" {...register("number", {required: true})} id="number" placeholder="Número" className="formInput"/>
              <input type="text" {...register("complement", {required: false})} id="complement" placeholder="Complemento" className="formInput"/>
            </fieldset>
            <fieldset id='homeSpot'>
              <input type="text" {...register("district", {required: true})} id="district" placeholder="Bairro" className="formInput"/>
              <input type="text" {...register("city", {required: true})} id="city" placeholder="Cidade" className="formInput"/>
              <input type="text" {...register("state", {required: true})} id="state" placeholder="UF" className="formInput"/>
            </fieldset>
          </form>
        </section>
        <PaymentMethod />
      </section>
      <section id='buyButton'>
        <button onClick={handleSubmit(onBuy)}>Comprar</button>
      </section>
    </main>
  </>
}

export default Buy