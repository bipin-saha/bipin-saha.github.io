import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full max-w-5xl mx-auto min-h-[calc(100vh-19rem)] py-20">
      {children}
    </main>
  );
};

export default PageLayout;
