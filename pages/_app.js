import "@/styles/globals.css";
import { ThemeProvider } from "@/utils/Theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
