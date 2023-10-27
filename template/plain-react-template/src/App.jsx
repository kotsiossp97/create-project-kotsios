import { ThemeProvider } from "@emotion/react";
import Intro from "./components/Intro";
import theme from "./context/theme";
import { CssBaseline } from "@mui/material";

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Intro />
        </ThemeProvider>
    )
}

export default App;
