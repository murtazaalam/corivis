import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
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