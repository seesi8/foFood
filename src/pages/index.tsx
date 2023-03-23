import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCompass, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { user, data } = useContext(UserContext);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    <FontAwesomeIcon
                        className={styles.headerIcon}
                        icon={faCamera}
                    />
                    {" Food"}
                </h2>
            </header>
            <footer className={styles.footer}>
                <h2 className={styles.title}>
                    <FontAwesomeIcon
                        className={styles.headerIcon}
                        icon={faCompass}
                    />
                </h2>
                <h2 className={styles.title}>
                    <FontAwesomeIcon
                        className={styles.headerIcon}
                        icon={faAdd}
                    />
                </h2>
                {!user ? (
                    <Link href="account" className={styles.link}>
                        <h2 className={styles.title}>
                            <FontAwesomeIcon
                                className={styles.headerIcon}
                                icon={faUserCircle}
                            />
                        </h2>
                    </Link>
                ) : (
                    <Link
                        href="account"
                        className={styles.userProfileContainer}
                    >
                        <Image
                            src={user.photoURL != null ? user.photoURL : ""}
                            alt="User Profile Image"
                            fill
                        />
                    </Link>
                )}
            </footer>
        </main>
    );
}
