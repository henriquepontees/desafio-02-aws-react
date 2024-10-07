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
        <section id="description">
            <h1 id="purchargeTitle">Compra realizada!</h1>
            <p id="purchargeDescription">Agora é só aguardar que logo as suas comics chegam ai!</p>
        </section>
        <section id="purchargeInfo">
            <section id="local">
                <FaLocationDot style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                <p id="localDescription">Entrega em <strong>Rua João Daniel Martinelli, 102</strong> Farrapos - Porto Alegre, RS</p>
            </section>
            <section id="time">
                <FaStopwatch style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                <p id="timeDescription">Previsão de entrega <strong>2 dias</strong></p>
            </section>
            <section id="payment">
                <PiCurrencyDollar style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                <p id="paymentDescription">Pagamento na entrega <strong>Cartão de Crédito</strong></p>
            </section>
        </section>
        <button id="confirmButton"><span id="buttonText">Voltar para o início</span></button>
    </main>
  </>
}

export default SucessFull