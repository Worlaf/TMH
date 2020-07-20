import _ from "lodash";

class Route {
    template: string;

    constructor(template: string) {
        this.template = template;
    }

    build(params: { [key: string]: string }) {
        var result = this.template;

        _.keys(params).forEach((key) => {
            result = this.template.replace(`/:${key}/`, `/${params[key]}/`);
        });

        return result;
    }
}

const routes = {
    home: new Route("/"),
    editTask: new Route("/task/:id/edit"),
} as { [key: string]: Route };

export default routes;
