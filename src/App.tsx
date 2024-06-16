// import { useState } from "react";

import theme from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { publicRouters } from "./routers";
import Providers from "~/api/provider";
import Header from "./components/Headers";
console.log(import.meta.env); // "123"
function App() {
    // const [count, setCount] = useState(0);

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Providers>
                    <Header />
                    <Routes>
                        {publicRouters.map((router, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={<router.component />}
                                />
                            );
                        })}
                    </Routes>
                </Providers>
            </BrowserRouter>
        </CssVarsProvider>
    );
}

export default App;
