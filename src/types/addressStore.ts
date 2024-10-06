import { AddressData } from "./addressData";

export interface AddressStore {
    addressData: AddressData
    addAddress: (newAddress: AddressData) => void
}