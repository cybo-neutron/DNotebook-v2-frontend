import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { NotesProvider } from "../context/NotesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NotesProvider>
        <Component {...pageProps} />
      </NotesProvider>
    </AuthProvider>
  );
}
