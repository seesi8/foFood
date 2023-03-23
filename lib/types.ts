import { Timestamp } from "firebase/firestore";

export type UserData = {
    username: string;
    simpleUsername: string;
    displayName: string;
    creationData: Timestamp;
    photoURL: string;
};
