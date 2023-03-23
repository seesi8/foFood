import type { NextPage } from "next";
import Image from "next/image";
import styles from "../src/styles/login.module.css";
import { Inter, Rubik } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithGoogle } from "../lib/firebase";
import { sign } from "crypto";
import Router, { useRouter } from "next/router";
import { NextRouter } from "next/router";

const rubik = Rubik({ subsets: ["latin"] });
async function signInWithGoogleAndRedirect(router: NextRouter) {
    await signInWithGoogle();

    router.push("/");
}

const LoginComponent: NextPage = () => {
    const router = useRouter();

    return (
        <main className={`${styles.main} ${rubik.className}`}>
            <h1 className={styles.title}>Welcome to the next experience</h1>
            <div className={`${styles.imgC} ${styles.img1C}`}>
                <Image alt="img1" src={"/waffle.jpg"} fill></Image>
            </div>
            <div className={`${styles.imgC} ${styles.img2C}`}>
                <Image alt="img1" src={"/burger.jpg"} fill></Image>
            </div>
            <div className={`${styles.imgC} ${styles.img3C}`}>
                <Image alt="img1" src={"/edamame.jpg"} fill></Image>
            </div>
            <div className={`${styles.imgC} ${styles.img4C}`}>
                <Image alt="img1" src={"/salad.jpg"} fill></Image>
            </div>
            <div className={styles.signInButtons}>
                <button
                    onClick={() => signInWithGoogleAndRedirect(router)}
                    className={styles.googleSignIn}
                >
                    <div className={styles.googleImageContainer}>
                        <Image
                            alt="google logo"
                            src={"/google.webp"}
                            fill
                        ></Image>
                    </div>
                    <h2>Sign in with google</h2>
                </button>
            </div>
        </main>
    );
};
export default LoginComponent;
