import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { useAccount } from "wagmi"
import { switchChain } from '@wagmi/core'
import { config } from "@/configurations/wagmi-config"
import { erc20, erc721 } from "../../../configurations/config.json"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { simulateContract, writeContract } from '@wagmi/core'
import urls from "../../../configurations/chain-urls.json"
import { waitForTransactionReceipt } from '@wagmi/core'
import { useModal } from "@/store/modal-slice"
import { getChainName } from "@/utils/get-chain-name"

export default function AssetSelect() {
    const { setModal, setHash, setNumberMinted, setReceived, setSelectedNft } = useModal()
    const { chain, address, isConnected } = useAccount()
    const [erc20InDisplay, setErc20InDisplay] = useState<boolean>(false)
    const [selectedImg, setSelectedImg] = useState<number>(3)
    const [nftAddress, setNftAddress] = useState<string>("")
    const [erc20Address, setERC20Address] = useState<string>("")
    const [buttonText, setButtonText] = useState<string>("Get ERC20 Instead")
    const [selectedChainId, setSelectedChainId] = useState<number>(0)
    const [maxMint, setMaxMint] = useState<number>(0)
    const [placeholder, setPlaceholder] = useState<string>("")
    const [numberToMint, setNumberToMint] = useState<number>(0)
    const [inTransaction, setInTransaction] = useState<boolean>(false)
    const [isOnChain, setIsOnChain] = useState<boolean>(false)
    const [isOnChainWithNoDeployments,] = useState<boolean>(false)

    const customStyle = { border: "5px solid black", transform: "scale(1.1)" }
    const customStyleNFT = { ...customStyle, borderRadius: "500px" }

    useEffect(function () {
        if (!chain) return
        const chainName = getChainName(chain?.id)
        if (!chainName) return
        // @ts-ignore
        setERC20Address(erc20[chainName])
    }, [chain])

    useEffect(function () {
        if (!chain) return
        const chainName = getChainName(chain?.id)
        if (!chainName) return
        // @ts-ignore
        setNftAddress(erc721[chainName][selectedImg])
    }, [selectedImg, chain])

    useEffect(function () {
        if (selectedChainId != chain?.id) setIsOnChain(false)
        else setIsOnChain(true)
    }, [selectedChainId])

    useEffect(function () {
        if (!chain) {
            setSelectedChainId(0)
            setIsOnChain(false)
        } else {
            const chainName = getChainName(chain?.id)
            if (!chainName) {
                setIsOnChain(false)
                return
            }

            setSelectedChainId(chain.id)
            setIsOnChain(true)
        }
    }, [chain])

    useEffect(function () {
        if (erc20InDisplay) {
            setButtonText("Get NFTs for swap")
            setMaxMint(1000000)
            setPlaceholder("Enter amount of tokens to receive.")
        } else {
            setButtonText("Get yUSDC for swap fee.")
            setMaxMint(1000)
            setPlaceholder("Enter number of NFTs to receive.")
        }
    }, [erc20InDisplay])

    async function switchToChain(chainId: 421614 | 84532 | 97 | 534351 | 11155111) {
        if (chain?.id == chainId) return

        try {
            await switchChain(config, { chainId })
            setSelectedChainId(chainId)
        } catch {
            setSelectedChainId(chain ? chain.id : 0)
        }
    }

    function isDisabled(): boolean {
        if (!address) return true
        if (numberToMint == 0) return true
        if (numberToMint > maxMint) return true
        return false
    }

    async function transact() {
        setInTransaction(true)

        const abi = erc20InDisplay ? erc20.abi : erc721.abi
        const tokenAddress = erc20InDisplay ? erc20Address : nftAddress
        const amount = erc20InDisplay ? numberToMint * 1e6 : numberToMint
        // @ts-ignore
        const urlStart = urls[selectedChainId]

        const functionName = "mint"
        const args = [
            address,
            amount
        ]

        const data = {
            abi,
            address: tokenAddress,
            functionName,
            args,
            selectedChainId
        }

        const { request } = await simulateContract(config, data as any)

        setNumberMinted(numberToMint)
        if (erc20InDisplay) {
            setReceived("token")
        } else {
            setSelectedNft(selectedImg)
            setReceived("nft")
        }

        if (request) {
            try {
                const hash = await writeContract(config, request)
                if (hash) {
                    const rec = waitForTransactionReceipt(config, { hash })
                    const txUrl = `${urlStart}${hash}`
                    setHash(txUrl)
                    setModal("SUCCESS")
                }
            } catch {
                setInTransaction(false)
            }
        }

        setInTransaction(false)
    }

    return (
        <div className="mt-5 w-75 mx-auto">
            {
                !erc20InDisplay &&
                <>
                    <h3 className="text-center">Choose The NFT You'd Like To Receive</h3>
                    {/* NFT Images. */}
                    <div className={`p-1 ${styles.nftImages}`}>
                        <img src="images/1.jpg" alt="Brown Apes Club" className={`${styles.nftImg}`} style={selectedImg == 1 ? customStyle : {}} onClick={() => setSelectedImg(1)} />
                        <img src="images/2.jpg" alt="Cool Hat Apes Club" className={`${styles.nftImg}`} style={selectedImg == 2 ? customStyle : {}} onClick={() => setSelectedImg(2)} />
                        <img src="images/3.jpg" alt="Yello Hat Apes Club" className={`${styles.nftImg}`} style={selectedImg == 3 ? customStyle : {}} onClick={() => setSelectedImg(3)} />
                        <img src="images/4.jpg" alt="Waving Monkey Club" className={`${styles.nftImg}`} style={selectedImg == 4 ? customStyle : {}} onClick={() => setSelectedImg(4)} />
                        <img src="images/5.jpg" alt="Zombie Monkey Club" className={`${styles.nftImg}`} style={selectedImg == 5 ? customStyle : {}} onClick={() => setSelectedImg(5)} />
                    </div>
                </>
            }

            <div className="text-center mt-3">
                <button className={`${styles.txnButton}`} onClick={() => setErc20InDisplay(prev => !prev)}>{buttonText}</button>
            </div>

            {/* Chain select. */}
            <div className={`w-50 mx-auto mt-5 ${styles.chainImages}`}>
                <h3 className="text-center">Choose A Chain</h3>
                <div className={`p-1 ${styles.nftImages}`}>
                    <img src="images/arbitrum.png" alt="Arbitrum" className={`${styles.chainImg}`} style={selectedChainId == 421614 ? customStyleNFT : {}} onClick={() => switchToChain(421614)} />
                    <img src="images/base.png" alt="Base" className={`${styles.chainImg}`} style={selectedChainId == 84532 ? customStyleNFT : {}} onClick={() => switchToChain(84532)} />
                    <img src="images/bsc.png" alt="BSC" className={`${styles.chainImg}`} style={selectedChainId == 97 ? customStyleNFT : {}} onClick={() => switchToChain(97)} />
                    {/* <img src="images/scroll.png" alt="Scroll" className={`${styles.chainImg}`} style={selectedChainId == 534351 ? customStyleNFT : {}} onClick={() => switchToChain(534351)} /> */}
                    <img src="images/ethereum.png" alt="Ethereum" className={`${styles.chainImg}`} style={selectedChainId == 11155111 ? customStyleNFT : {}} onClick={() => switchToChain(11155111)} />
                </div>
            </div>
            {/* Amount box. */}
            <div className={`w-25 mx-auto ${styles.amountBox}`}>
                <input type="number" className={`w-100 ${styles.input}`} placeholder={placeholder} value={numberToMint} onChange={(e) => setNumberToMint(e.target.value as any)} />
            </div>

            {/* Finish button. */}
            <div className="text-center mt-3">
                {
                    isConnected
                        ? inTransaction
                            ? <AiOutlineLoading3Quarters size={30} className={`${styles.spinner}`} />
                            : !isOnChain
                                ? <button
                                    className={`${styles.txnButton}`}
                                    disabled={!isOnChain}
                                >Select A Supported Chain To Continue</button>
                                : isOnChainWithNoDeployments
                                    ? <button
                                        className={`${styles.txnButton}`}
                                        style={isDisabled() ? { cursor: "not-allowed", opacity: "0.3" } : {}}
                                        disabled={isDisabled()}
                                    >There's No Smart Contract On This Chain Yet</button>
                                    : <button
                                        className={`${styles.txnButton}`}
                                        style={isDisabled() ? { cursor: "not-allowed", opacity: "0.3" } : {}}
                                        disabled={isDisabled()}
                                        onClick={transact}
                                    >Send Transaction</button>
                        : <button
                            className={`${styles.txnButton}`}
                            style={{ cursor: "not-allowed" }}
                            disabled={true}
                        >There's No Connected Wallet</button>
                }
            </div>
        </div>
    )
}