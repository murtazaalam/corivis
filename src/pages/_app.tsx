import "@/styles/globals.css";
import posthog from "posthog-js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      posthog.capture("$pageview", {
        $current_url: window.location.origin + url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer
        draggable
        rtl={false}
        closeOnClick
        pauseOnHover
        autoClose={5000}
        pauseOnFocusLoss
        newestOnTop={false}
        hideProgressBar={false}
        position="bottom-right"
      />
    </Layout>
  );
}