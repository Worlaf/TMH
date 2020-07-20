import React from "react";
import { IRoute, resolvePath as resolveRoutePath } from "../../utils/routes";
import { Link, LinkProps, Breadcrumbs } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

interface IBreadCrumbProps {
    route: IRoute;
    customRouteBreadCrumbs?: { [key: string]: React.ReactNode };
    routeData?: { [key: string]: string };
}

const BreadCrumbs: React.FC<IBreadCrumbProps> = (props) => {
    const routePath = resolveRoutePath(props.route);

    return (
        <Breadcrumbs>
            {routePath.map((route, index) => {
                var customBreadCrumb = props.customRouteBreadCrumbs && props.customRouteBreadCrumbs[route.key];
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
