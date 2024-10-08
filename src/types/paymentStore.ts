export interface PaymentStore {
    paymentMethod: string
    setPaymentMethod:(newAddress: string) => void
}
