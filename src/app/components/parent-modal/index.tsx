import { useModal } from "@/store/modal-slice";
import styles from "./index.module.css"
import { IoCloseCircle } from "react-icons/io5";

export default function ParentModal({ children }: any) {
    const { removeModal } = useModal()

    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <div
                    style={{ cursor: "pointer" }}
                    className={`${styles.close} d-flex justify-content-end align-items-center`}
                    onClick={removeModal}
                >
                    <IoCloseCircle size={25} />
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}