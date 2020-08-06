import Firebase from "../../firebase";
import { createContainer } from "unstated-next";

export const firebaseInstance = new Firebase();

function useFirebase() {
    return firebaseInstance;
}

const FirebaseContainer = createContainer(useFirebase);

export default FirebaseContainer;
