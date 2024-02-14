import "@/styles/globals.css";
import { ThemeProvider } from "@/utils/Theme";
import { ContextProvider } from "@/utils/WarkawikContext";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ContextProvider>
  );
}
