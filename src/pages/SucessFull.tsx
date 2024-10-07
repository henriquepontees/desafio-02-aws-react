import "../styles/sucessfull.css"
import { FaLocationDot } from "react-icons/fa6"
import { FaStopwatch } from "react-icons/fa6"
import { PiCurrencyDollar } from "react-icons/pi"
import { useAddressStore } from "../store/useAddress"
import { usePaymentMethod } from "../store/usePayMethod"

const SucessFull = () => {
    const {addressData} = useAddressStore()
    const {paymentMethod} = usePaymentMethod()

    return <>
        <main>
            <section id="description">
                <h1 id="purchargeTitle">Compra realizada!</h1>
                <p id="purchargeDescription">Agora é só aguardar que logo as suas comics chegam ai!</p>
            </section>
            <section id="purchargeInfo">
                <section id="local">
                    <FaLocationDot style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                    <p id="localDescription">Entrega em <strong>{addressData.street}, {addressData.number}</strong> {addressData.district} - {addressData.city}, {addressData.state}</p>
                </section>
                <section id="time">
                    <FaStopwatch style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                    <p id="timeDescription">Previsão de entrega <strong>{`${Math.ceil(Math.random() * 8 + 2)}`} dias</strong></p>
                </section>
                <section id="payment">
                    <PiCurrencyDollar style={{borderRadius: "1000px", width: "32px", height: "32px", padding: "8px", backgroundColor: "#FF8100", color: "white", alignSelf: "center"}}/>
                    <p id="paymentDescription">Pagamento na entrega <strong>{paymentMethod}</strong></p>
                </section>
            </section>
            <button id="confirmButton"><span id="buttonText">Voltar para o início</span></button>
        </main>
    </>
}

export default SucessFull