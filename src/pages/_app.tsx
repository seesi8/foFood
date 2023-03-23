import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useUserData } from "../../lib/hooks";
import { UserContext } from "../../lib/context";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    const userData = useUserData();
    return (
        <UserContext.Provider value={userData}>
            <div className={rubik.className}>
                <Component {...pageProps} />
            </div>
        </UserContext.Provider>
    );
}
