import { BsCurrencyDollar } from "react-icons/bs"
import { CiBank } from "react-icons/ci"
import { PiCreditCard, PiMoneyLight } from "react-icons/pi"
import { usePaymentMethod } from "../../../store/usePayMethod"

const PaymentMethod = () => {
  const {setPaymentMethod} = usePaymentMethod()

  return <>
    <fieldset id="paymentSelection">
      <legend id="paymentTitle"><BsCurrencyDollar style={{color: "#FF8100"}}/>Pagamento</legend>
      <p id="paymentDescription">O pagamento é feito na entrega. Escolha a forma que desejar pagar.</p>
      <button className="paymentMethod" onClick={() => setPaymentMethod("credit")}><PiCreditCard style={{color: "#FF8100"}}/>CARTÃO DE CRÉDITO</button>
      <button className="paymentMethod" onClick={() => setPaymentMethod("debit")}><CiBank style={{color: "#FF8100"}}/>CARTÃO DE DÉBITO</button>
      <button className="paymentMethod" onClick={() => setPaymentMethod("money")}><PiMoneyLight style={{color: "#FF8100"}}/>DINHEIRO</button>
    </fieldset>
  </>
}

export default PaymentMethod