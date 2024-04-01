import React, {ReactNode} from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">{children}</main>
  );
}

export default Layout;