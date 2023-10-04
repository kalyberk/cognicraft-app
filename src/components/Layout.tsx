import { Header } from "./Header";
import { Heading } from "./Heading";
import { Footer } from "./Footer";

export const Layout = ({ pageProps, children }) => {
  return (
    <>
      <Header showConnectWallet={pageProps?.showConnectWallet} />
      <Heading showExplain={pageProps?.showExplain} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
