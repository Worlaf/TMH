import _ from "lodash";

export interface IRoute {
    title: string;
    template: string;
    key: string;
    build: (params: { [key: string]: string }) => string;
}

class Route implements IRoute {
    template: string;
    title: string;
    key: string;

    constructor(template: string, title: string, key: string) {
        this.template = template;
        this.title = title;
        this.key = key;
    }

    build(params: { [key: string]: string }) {
        var result = this.template;

        _.keys(params).forEach((key) => {
            result = this.template.replace(`/:${key}/`, `/${params[key]}/`);
        });

        return result;
    }
}

interface IRouteContainer {
    [key: string]: IRoute & (IRouteContainer | {});
}

interface IChildRoute {
    parent?: IRoute;
}

type RouteNode<T extends IRouteContainer> = IRoute & T & IChildRoute;

function createRoute<T extends IRouteContainer>(route: string, key: string, title: string, children: T): RouteNode<T> {
    let routeContainer = new Route(route, title, key) as RouteNode<T>;
    _(children)
        .keys()
        .forEach((key) => {
            var child = children[key] as IRouteContainer;
            child.parent = routeContainer;
            (routeContainer as any)[key] = child;
        });

    return routeContainer;
}

function isRoute(obj: any): obj is IRoute {
    return _.isString(obj.template) && _.isFunction(obj.build);
}

function hasParent(route: IRoute): route is IRoute & { parent: IRoute } {
    return (route as any)["parent"] !== undefined;
}

function getChildren(container: RouteNode<any>, deepFlatten: boolean) {
    let children: IRoute[] = [];

    _(container)
        .keys()
        .forEach((key) => {
            var propertyValue = container[key];
            if (isRoute(propertyValue)) {
                children.push(propertyValue);

                if (deepFlatten) {
                    children = [...children, ...getChildren(propertyValue as RouteNode<any>, deepFlatten)];
                }
            }
        });

    return children;
}

const routes = {
    root: createRoute("/", "TMH", "root", {
        tasks: createRoute("/tasks", "Задачи", "tasks", {
            edit: createRoute("/tasks/:taskId/edit", "Редактирование", "edit", {}),
        }),
    }),
};

export default routes;

export function findRouteByTemplate(template: string) {
    var flatRouteList = getChildren(routes.root, true);

    return flatRouteList.find((r) => r.template === template);
}

export function resolvePath(route: IRoute): IRoute[] {
    if (hasParent(route)) {
        return [...resolvePath(route.parent), route];
    } else {
        return [route];
    }
}
