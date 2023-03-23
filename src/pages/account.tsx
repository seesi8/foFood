import type { NextPage } from "next";
import { useContext } from "react";
import AccountComponent from "../../components/account";
import LoginComponent from "../../components/login";
import { UserContext } from "../../lib/context";

const Account: NextPage = () => {
    const { user, data } = useContext(UserContext);
    console.log(user, data);
    if (!user) {
        return <LoginComponent></LoginComponent>;
    } else {
        return <AccountComponent></AccountComponent>;
    }
};
export default Account;
