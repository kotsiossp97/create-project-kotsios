import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./context/theme";
import Intro from "./components/Intro";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Intro />
        </ThemeProvider>
    );
};

export default App;
