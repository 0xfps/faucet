import { useModal } from "@/store/modal-slice";
import ParentModal from "../parent-modal";
import data from "../../../configurations/uris.json"
import { useAccount } from "wagmi";
import truncateAddress from "@/utils/truncate-address";
import styles from "./index.module.css"

export default function Success() {
    const { address } = useAccount()
    const { selectedNft, numberMinted, hash, received } = useModal()
    // @ts-ignore
    const imageName = received == "nft" && data[selectedNft].name

    return (
        <ParentModal>
            <h4 className="text-center">Success</h4>

            {
                received == "nft" &&
                <>
                    <div className="text-center">
                        <img src={`images/${selectedNft}.jpg`} alt={imageName} className={`${styles.image}`} />
                    </div>
                    <p className="text-center">
                        You have received {numberMinted} {imageName}{numberMinted == 1 ? "" : "s"} to your wallet
                        at {truncateAddress(address as string)}.
                        <br />
                    </p>
                </>
            }

            {
                received == "token" && <p className="text-center">
                    You have received {numberMinted} yUSDC to your wallet
                    at {truncateAddress(address as string)}.
                    <br /><br />
                </p>
            }
            <p className="text-center"><a href={hash} target="_blank" style={{ color: "blue" }}>Go to transaction.</a></p>
        </ParentModal>
    )
}