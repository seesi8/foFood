import { User } from "firebase/auth";
import React from "react";
import { UserData } from "./types";

export const UserContext = React.createContext<{
    user: undefined | null | User;
    data: undefined | UserData;
}>({
    user: undefined,
    data: undefined,
});
export const ThemeContext = React.createContext({ vertical: false, width: 0 });
