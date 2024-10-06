import "../styles/sucessfull.css"
import { FaLocationDot } from "react-icons/fa6"
import { FaStopwatch } from "react-icons/fa6"
import { PiCurrencyDollar } from "react-icons/pi"

const SucessFull = () => {
  return <>
    <header>
        {/* Placeholder */}
    </header>
    <main>
        <section>
            <h1>Compra realizada!</h1>
            <p>Agora é só aguardar que logo as suas comics chegam ai!</p>
        </section>
        <section id="purchargeInfo">
            <section id="local">
                <FaLocationDot />
                <p>Entrega em <strong>Rua João Daniel Martinelli</strong>, 102 Farrapos - Porto Alegre, RS</p>
            </section>
            <section id="time">
                <FaStopwatch />
                <p>Previsão de entrega <strong>2 dias</strong></p>
            </section>
            <section id="payment">
                <PiCurrencyDollar />
                <p>Pagamento na entrega <strong>Cartão de Crédito</strong></p>
            </section>
        </section>
        <button>Voltar para o início</button>
    </main>
  </>
}

export default SucessFull