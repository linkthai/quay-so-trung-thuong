import { DefaultHead } from "../default-head";
import { Footer } from "./components/footer";
import { HeaderPropsType } from "./components/header";
import { DefaulLayoutProvider } from "./provider/default-layout-provider";

interface PropsType extends ReactProps, HeaderPropsType {}
export function DefaultLayout({ ...props }: PropsType) {
  return (
    <DefaulLayoutProvider>
      <div className="flex flex-col min-h-screen relative">
        <>
          <DefaultHead />
          <div className="w-full flex-1">{props.children}</div>
          <Footer />
        </>
      </div>
    </DefaulLayoutProvider>
  );
}
