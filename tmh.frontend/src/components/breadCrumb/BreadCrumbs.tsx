import React from "react";
import { IRoute, resolvePath as resolveRoutePath } from "../../utils/routes";
import { Link, LinkProps, Breadcrumbs } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

export const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

interface IBreadCrumbProps {
    route: IRoute;
    routePathProvider?: (originalPath: IRoute[]) => IRoute[];
    customBreadCrumbProvider?: (route: IRoute, collectionKey: number) => React.ReactNode;
    routeData?: { [key: string]: string };
}

const BreadCrumbs: React.FC<IBreadCrumbProps> = (props) => {
    const routePath = resolveRoutePath(props.route);
    const finalRoutePath = props.routePathProvider ? props.routePathProvider(routePath) : routePath;

    return (
        <Breadcrumbs>
            {finalRoutePath.map((route, index) => {
                var customBreadCrumb = props.customBreadCrumbProvider && props.customBreadCrumbProvider(route, index);
                if (customBreadCrumb !== undefined) {
                    return customBreadCrumb;
                } else {
                    return (
                        <LinkRouter key={index} to={route.build(props.routeData || {})}>
                            {route.title}
                        </LinkRouter>
                    );
                }
            })}
        </Breadcrumbs>
    );
};

export default BreadCrumbs;
