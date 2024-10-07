import { create } from "zustand";
import { PaymentStore } from "../types/paymentStore";

export const usePaymentMethod = create<PaymentStore>((set) => ({
    paymentMethod: 'Cartão de Crédito',
    setPaymentMethod: (newPaymentMethod: string) => set(() => ({
        paymentMethod: newPaymentMethod
    }))
}))