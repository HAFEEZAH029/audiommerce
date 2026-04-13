"use client";

import { Provider } from "react-redux";
import { store } from "./redux";


{/** This file exists because layout.tsx is a (MUST BE) Server Component, but <Provider> from react-redux requires a Client Component. You need to extract the Provider into its own "use client" wrapper. */}
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
