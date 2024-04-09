import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return <main className="w-full h-screen flex flex-col  bg-white">{children}</main>;
}

export default Layout;