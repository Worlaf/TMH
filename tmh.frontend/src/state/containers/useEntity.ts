import { useState, useEffect } from "react";
import * as uuid from "uuid";
import _ from "lodash";
import UserDataContainer from "./UserDataContainer";
import { IUserData } from "../data/UserData";
import { IEntity } from "../data/Entity";

interface IRepository<TData extends IEntity> {
    entities: TData[];
    get: (id: string) => TData;
    safeGet: (id: string) => TData | undefined;
    create: (entity: Partial<TData>) => void;
    update: (entity: Partial<TData> & IEntity) => void;
    save: (entity: Partial<TData>) => void;
    remove: (id: string) => void;
}

export default function useEntity<TData extends IEntity>(userDataPropertyName: string, newEnityPropertiesProvider: TData | ((entities: TData[]) => TData)) {
    const { userData, updateUserData } = UserDataContainer.useContainer();
    const [entities, setEntities] = useState<TData[]>((userData as { [key: string]: any })[userDataPropertyName] as TData[]);

    useEffect(() => {
        const userDataDict = userData as { [key: string]: any };

        if (userDataDict[userDataPropertyName] !== entities) updateUserData({ [userDataPropertyName]: entities } as Partial<IUserData>);
    }, [entities]);

    const safeGet = (id: string) => {
        return entities.find((d) => d.id === id);
    };

    const get = (id: string) => {
        const result = safeGet(id);
        if (result === undefined) throw Error("Failed to find entity by id");

        return result;
    };

    const create = (entity: Partial<TData>) => {
        let properties: TData;

        if (_.isFunction(newEnityPropertiesProvider)) properties = newEnityPropertiesProvider(entities);
        else properties = newEnityPropertiesProvider;

        const newEntity = { ...properties, ...entity, id: uuid.v4() };

        setEntities([...entities, newEntity]);
    };

    const update = (entity: Partial<TData> & IEntity) => {
        const existingEntity = get(entity.id);

        const updatedEntity = { ...existingEntity, ...entity };
        const index = entities.indexOf(existingEntity);
        entities[index] = updatedEntity;

        setEntities([...entities]);
    };

    const save = (entity: Partial<TData>) => {
        if (entity.id !== undefined) update({ ...entity, id: entity.id });
        else create(entity);
    };

    const remove = (id: string) => setEntities([...entities.filter((d) => d.id !== id)]);

    return {
        safeGet,
        entities,
        get,
        create,
        update,
        save,
        remove,
    } as IRepository<TData>;
}
