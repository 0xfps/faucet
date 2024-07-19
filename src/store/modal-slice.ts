import { Modals } from '@/utils/constants'
import { create } from 'zustand'

type ModalType = {
    modal: Modals
    received: "token" | "nft" | ""
    selectedNft: number
    numberMinted: number
    hash: string
    setModal: (name: Modals) => void
    removeModal: () => void
    setReceived: (type: "token" | "nft") => void
    setSelectedNft: (number: number) => void
    setNumberMinted: (number: number) => void
    setHash: (hash: string) => void
}

export const useModal = create<ModalType>(function (set) {
    return {
        modal: "",
        selectedNft: 0,
        received: "",
        numberMinted: 0,
        hash: "",
        setModal: (name) => set((state) => ({ modal: name })),
        removeModal: () => set((state) => ({ modal: "" })),
        setReceived: (type) => set((state) => ({ received: type })),
        setSelectedNft: (number) => set((state) => ({ selectedNft: number })),
        setNumberMinted: (number) => set((state) => ({ numberMinted: number })),
        setHash: (hash: string) => set((state) => ({ hash: hash }))
    }
})