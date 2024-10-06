import { BsCurrencyDollar } from "react-icons/bs"
import { PiBank } from "react-icons/pi";
import { PiCreditCard, PiMoneyLight } from "react-icons/pi"
import { usePaymentMethod } from "../store/usePayMethod"

const PaymentMethod = () => {
  const {paymentMethod, setPaymentMethod} = usePaymentMethod()

  return <>
    <section id="paymentSelection">
      <section id="descriptionArea">
        <BsCurrencyDollar style={{color: "#FF8100", width: '22px', height: '22px', marginLeft: '4px'}}/>
        <h2 id="paymentTitle">Pagamento</h2>
        <p id="paymentDescription">O pagamento é feito na entrega. Escolha a forma que desejar pagar.</p>
      </section>
      <section id="methodsArea">
        <button style={paymentMethod == 'credit' ? {backgroundColor: '#FFE2C3', border: 'solid #FF8100'} : {backgroundColor: '#BABABA'}} className="paymentMethod" onClick={() => setPaymentMethod("credit")}><PiCreditCard style={{color: "#FF8100", width: '16px', height: '16px'}}/> CARTÃO DE CRÉDITO</button>
        <button style={paymentMethod == 'debit' ? {backgroundColor: '#FFE2C3', border: 'solid #FF8100'} : {backgroundColor: '#BABABA'}} className="paymentMethod" onClick={() => setPaymentMethod("debit")}><PiBank style={{color: "#FF8100"}}/> CARTÃO DE DÉBITO</button>
        <button style={paymentMethod == 'money' ? {backgroundColor: '#FFE2C3', border: 'solid #FF8100'} : {backgroundColor: '#BABABA'}} className="paymentMethod" onClick={() => setPaymentMethod("money")}><PiMoneyLight style={{color: "#FF8100", width: '16px', height: '16px'}}/> DINHEIRO</button>
      </section>
    </section>
  </>
}

export default PaymentMethod