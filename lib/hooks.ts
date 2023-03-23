import { auth, firestore } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserData } from "./types";
import { User } from "@firebase/auth";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [data, setData] = useState<UserData | undefined>(undefined);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            console.log(user.uid);
            const ref = doc(firestore, "users", user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                const data: UserData | undefined = doc.data() as
                    | UserData
                    | undefined;
                setData(data);
            });
        } else {
            setData(undefined);
        }

        return unsubscribe;
    }, [user]);

    return { user, data };
}
