import ConnectWalletModal from "@/app/components/connect-wallet-modal";
import { useModal } from "@/store/modal-slice";
import { Modals } from "@/utils/constants";
import Success from "../success-modal";

export default function Modal() {
    const { modal } = useModal()

    return (
        <>
            {modal == "CONNECTWALLET" && <ConnectWalletModal />}
            {modal == "SUCCESS" && <Success/>}
            {modal == "" && ""}
        </>
    )
}