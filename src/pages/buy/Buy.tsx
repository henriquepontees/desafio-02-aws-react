import '../../styles/buy.css'
import AddressForm from './components/AddressForm'
import PaymentMethod from './components/PaymentMethod'

const Buy = () => {

  return <>
    <header>
      {/* Colocar Header no lugar dessa header */}
    </header>
    <main>
      <h1>Finalize a compra</h1>
      <AddressForm />
      <PaymentMethod />
      <hr />
      <button>Comprar</button>
    </main>
  </>
}

export default Buy