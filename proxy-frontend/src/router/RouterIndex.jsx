import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";
import { IndividualsView } from "../views/individuals-view/IndividualsView";
import { OrganizationsView } from "../views/organizations-view/OrganizationsView";
import { VoditelsView } from "../views/voditels-view/VoditelsView";
import { StudListView } from "../views/stud-view/stud-list-view/StudListView";
import { StudView } from "../views/stud-view/stud-view/StudView";
import { StudCreateView } from "../views/stud-view/stud-view/StudCreateView";
import { ProductsView } from "../views/product-view/ProductsView";
import { ProxyListView } from "../views/proxy-view/proxy-list-view/ProxyListView";
import { ProxyView } from "../views/proxy-view/proxy-view/ProxyView";
import { ProxyCreateView } from "../views/proxy-view/proxy-view/ProxyCreateView";
import { ROUTE_PATHS } from "./paths";

export const RouterIndex = (props) => {
    return (
        <BrowserRouter>
            <Navigation>
                <Routes>
                    <Route
                        path={'/'}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={'|'}
                        element={<StudListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.products}
                        element={<ProductsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.individuals}
                        element={<IndividualsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.organizations}
                        element={<OrganizationsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.voditels}
                        element={<VoditelsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.list}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.proxy}
                        element={<ProxyView />}
                    />
                    <Route 
                     path={ROUTE_PATHS.create} 
                       element={<ProxyCreateView />} 
                     /> 
                    <Route
                        path={ROUTE_PATHS.stud.list}
                        element={<StudListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.stud.stud}
                        element={<StudView />}
                    />
                    <Route 
                     path={ROUTE_PATHS.create1} 
                       element={<StudCreateView />} 
                     /> 
                </Routes>
            </Navigation>
        </BrowserRouter>
    )
}