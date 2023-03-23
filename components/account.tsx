import type { NextPage } from "next";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import Styles from "../src/styles/acc.module.css";
const AccountComponent: NextPage = () => {
    const { user, data } = useContext(UserContext);
    console.log(data);
    return (
        <main className={Styles.main}>
            <h1>Hello, {data?.displayName}</h1>
        </main>
    );
};
export default AccountComponent;
