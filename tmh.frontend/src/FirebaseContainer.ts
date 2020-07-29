import Firebase from "./firebase";
import { createContainer } from "unstated-next";

const firebase = new Firebase();

function useFirebase() {
    return firebase;
}

const FirebaseContainer = createContainer(useFirebase);

export default FirebaseContainer;
