import { useState } from "react";
import { Modal } from 'react-responsive-modal';
import styles from "./index.module.css"
import ParentModal from "../parent-modal";
import { useModal } from "@/store/modal-slice";
import { useConnect } from "wagmi";
import { connect } from '@wagmi/core'
import { config } from "@/configurations/wagmi-config";

export default function ConnectWalletModal() {
    const { removeModal } = useModal()
    const { connectors } = useConnect()
    const [METAMASK_X_RABBY, WALLET_C0NNECT, SAFE] = connectors

    async function connectWallet(connector: any) {
        await connect(config, { connector })
        removeModal()
    }

    return (
        <ParentModal>
            <h4 className="text-center">Choose Your Wallet</h4>
            <div style={{ width: "inherit", height: "inherit" }}>
                <div className="d-flex justify-content-around align-items-center" style={{ width: "inherit", height: "50%" }}>
                    <img src="images/metamask.svg" alt="Metamask" className={`${styles.img}`} onClick={() => connectWallet(METAMASK_X_RABBY)} />
                    <img src="images/walletconnect.svg" alt="Wallet Connect" className={`${styles.img}`} onClick={() => connectWallet(WALLET_C0NNECT)} />
                </div>
                <div className="d-flex justify-content-around align-items-center" style={{ width: "inherit", height: "50%" }}>
                    <img src="images/rabby.png" alt="Rabby" className={`${styles.img}`} onClick={() => connectWallet(METAMASK_X_RABBY)} />
                    <img src="images/safe.png" alt="Safe" className={`${styles.img}`} onClick={() => connectWallet(SAFE)} />
                </div>
            </div>
        </ParentModal>
    )
}