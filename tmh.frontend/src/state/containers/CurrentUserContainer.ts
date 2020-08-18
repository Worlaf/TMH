import { createContainer } from "unstated-next";
import { useState } from "react";
import { IUser } from "../data/User";

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    return { currentUser, setCurrentUser };
}

const CurrentUserContainer = createContainer(useCurrentUser);

export default CurrentUserContainer;
