import { create } from "zustand";
import { PaymentStore } from "../types/paymentStore";

export const usePaymentMethod = create<PaymentStore>((set) => ({
    paymentMethod: '',
    setPaymentMethod: (newPaymentMethod: string) => set(() => ({
        paymentMethod: newPaymentMethod
    }))
}))