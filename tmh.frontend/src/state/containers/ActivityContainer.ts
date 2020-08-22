import { createContainer } from "unstated-next";
import * as uuid from "uuid";
import _ from "lodash";
import { IActivity } from "../data/Activity";
import useEntity from "./useEntity";
import nameof from "ts-nameof.macro";
import { IUserData } from "../data/UserData";

function useActivities() {
    const activityRepository = useEntity<IActivity>(
        nameof<IUserData>((d) => d.activities),
        { id: uuid.v4(), description: null, isMandatory: false, label: "New Activity", tagIds: [], taskId: null }
    );

    return activityRepository;
}

const ActivityContainer = createContainer(useActivities);

export default ActivityContainer;
