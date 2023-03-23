import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    setDoc,
    where,
    doc,
    FieldValue,
    serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Filter from "bad-words";

var filter = new Filter({ placeHolder: "" });

const firebaseConfig = {
    apiKey: "AIzaSyAleeP9GD6NgwWJU-tFGDsy7XLIt9IDnN4",
    authDomain: "fofood-8a035.firebaseapp.com",
    projectId: "fofood-8a035",
    storageBucket: "fofood-8a035.appspot.com",
    messagingSenderId: "755994716564",
    appId: "1:755994716564:web:a9676d2755d9399e348781",
    measurementId: "G-55FBERH9VJ",
};
const app = initializeApp(firebaseConfig);

// export function getProviderForProviderId(
//     id: string
// ): GoogleAuthProvider | undefined {
//     const providers = {
//         password: undefined,
//         phone: undefined,
//         "google.com": googleAuthProvider,
//         "facebook.com": undefined,
//         "twitter.com": undefined,
//         "github.com": undefined,
//         "apple.com": undefined,
//         "yahoo.com": undefined,
//         "hotmail.com": undefined,
//     };

//     if (providers.hasOwnProperty(id)) {
//         return providers[id];
//     } else {
//         return undefined;
//     }
// }

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

async function getUsername(username: string) {
    const usernamesRef = collection(firestore, "users");
    const q = query(
        usernamesRef,
        where("simpleUsername", "==", username),
        orderBy("username", "desc"),
        limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0]) {
        const highestUsername: String =
            querySnapshot.docs[0].data()["username"];
        const userNameIndex: number = parseInt(
            highestUsername.split(username)[1]
        );

        const currentUserIndex = userNameIndex + 1;

        return username + currentUserIndex;
    } else {
        return username;
    }
}

function formatUsername(username: string) {
    const clean = filter.clean(username).toLowerCase();

    return clean.replace(" ", "");
}

function makeUsernameSafe(username: string) {
    const clean = filter.clean(username);
    return clean;
}

//Functions
export async function signInWithGoogle() {
    const cred = await signInWithPopup(auth, googleAuthProvider);
    const user = cred.user;
    const simpleUsername = formatUsername(user.displayName ?? "user");
    const username = await getUsername(simpleUsername);

    await setDoc(doc(firestore, "users", user.uid), {
        username: username,
        simpleUsername: simpleUsername,
        displayName: makeUsernameSafe(user.displayName ?? "user"),
        creationData: serverTimestamp(),
        photoURL: user.photoURL,
    });
}
