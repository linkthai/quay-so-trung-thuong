import { DefaultSeo } from "next-seo";
import { Fragment } from "react";
import { AlertProvider } from "../lib/providers/alert-provider";
import { ToastProvider } from "../lib/providers/toast-provider";
import { TooltipProvider } from "../lib/providers/tooltip-provider";
import dynamic from "next/dynamic";
import "../style/style.scss";

export function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  return (
    <>
      <DefaultSeo
        defaultTitle="Quay số trúng thưởng"
        openGraph={{
          type: "website",
          locale: "vi_VN",
          site_name: "luckydraw",
        }}
      />
      <TooltipProvider>
        <ToastProvider>
          <AlertProvider>
            <Layout {...layoutProps}>
              <Component {...pageProps} />
            </Layout>
          </AlertProvider>
        </ToastProvider>
      </TooltipProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
