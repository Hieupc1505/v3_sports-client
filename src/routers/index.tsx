import { FunctionComponent } from "react";
import Matches from "~/pages/Matches/index";
import Standings from "~/pages/Standings";
type Router = {
    path: string;
    component: FunctionComponent;
};

type PublicRouters = Router[];

const publicRouters: PublicRouters = [
    { path: "/", component: Matches },
    { path: "/standings", component: Standings },
    // { path: "/statistic", component: " Statistic" },
    // { path: "/lists", component: " HightLight" },
    // { path: "/header", component: " Header" },
    // { path: "/live", component: " Live", layout: null },
    // { path: "*", component: " Match" },
];

const privateRotuers: PublicRouters = [];

export { publicRouters, privateRotuers };
