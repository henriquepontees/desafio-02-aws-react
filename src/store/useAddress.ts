import { create } from "zustand";
import { AddressStore } from "../types/addressStore";
import { AddressData } from "../types/addressData";

export const useAddressStore = create<AddressStore>((set) => ({
    addressData: {
        cep: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
    },
    addAddress: (newAddress: AddressData) => set(() => ({
        addressData: {...newAddress}
    }))
}))