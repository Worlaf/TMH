import { useState } from "react";
import { IUserData } from "../data/UserData";
import { createContainer } from "unstated-next";

function useUserData() {
    const [userData, setUserData] = useState<IUserData>({ tasks: [], tags: [] });

    const updateUserData = (data: Partial<IUserData>) => setUserData({ ...userData, ...data });

    return { userData, updateUserData };
}

const UserDataContainer = createContainer(useUserData);

export default UserDataContainer;
