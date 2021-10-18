import { createContext } from "react";

export const DefaultLayoutContext = createContext<any>({});
export function DefaulLayoutProvider(props) {
  return (
    <DefaultLayoutContext.Provider value={{}}>
      {props.children}
    </DefaultLayoutContext.Provider>
  );
}
