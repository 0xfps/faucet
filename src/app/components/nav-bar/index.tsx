import { useAccount, useConnect, useDisconnect } from "wagmi"
import ConnectWalletModal from "../connect-wallet-modal"
import { useModal } from "@/store/modal-slice"
import { FaPowerOff } from "react-icons/fa";
import styles from "./index.module.css"
import truncateAddress from "@/utils/truncate-address";

export default function NavBar() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { setModal } = useModal()

    return (
        <div className="text-end">
            {
                address
                    ?
                    <>
                        <span>{truncateAddress(address)}</span>{" "}
                        <button className={`${styles.btn}`} onClick={() => disconnect()}><FaPowerOff size={25} /></button>
                    </>
                    : <button onClick={() => setModal("CONNECTWALLET")} className={`${styles.btn}`}>Connect Wallet</button>
            }
        </div>
    )
}