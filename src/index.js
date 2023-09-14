import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme.js";

const token = Cookies.get("token");

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        {token ? (
          <>
            <Route path="/admin" component={AdminLayout} />
            <Redirect from="/" to="/admin/dashboard" />
          </>
        ) : (
          <>
            <Redirect from="/" to="/auth/signin" />
            <Route path="/auth" component={AuthLayout} />
            <Route path="/admin" component={AdminLayout} />
            <Route path="/rtl" component={RTLLayout} />
          </>
        )}
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
