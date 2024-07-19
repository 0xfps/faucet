import "bootstrap/dist/css/bootstrap.css";
import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import { MIN_WIDTH } from "@/utils/constants";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ children }: any) {
    const width = useGetWindowSize()

    return (
        <html lang="en">
            <head>
                <title>Dray Token Faucet, ERC20, ERC721</title>
            </head>

            <body className={inter.className}>
                {(width >= MIN_WIDTH) ? children : <p>This faucet is not supported on small screens</p>}
            </body>
        </html>
    );
}