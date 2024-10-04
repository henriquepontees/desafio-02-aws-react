import { BsCurrencyDollar } from "react-icons/bs"
import { CiBank } from "react-icons/ci"
import { PiCreditCard, PiMoneyLight } from "react-icons/pi"

const PaymentMethod = () => {
  return <>
    <section>
        <h2><BsCurrencyDollar />Pagamento</h2>
        <p>O pagamento é feito na entrega. Escolha a forma que desejar pagar.</p>
        <button><PiCreditCard />CARTÃO DE CRÉDITO</button>
        <button><CiBank/>CARTÃO DE DÉBITO</button>
        <button><PiMoneyLight/>DINHEIRO</button>
    </section>
  </>
}

export default PaymentMethod