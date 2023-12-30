"use client"; // because we are using browser capabilities

import { SessionProvider } from "next-auth/react";

// We will wrap other components with this components, thats why we are rendering the children
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
