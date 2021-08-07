import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { analytics } from "../firebase/util";
import "./../style/global.scss";
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    analytics();
  }, []);
  return <Component {...pageProps} />;
}
