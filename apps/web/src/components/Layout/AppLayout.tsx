import type { PropsWithChildren } from "react";
import { Content } from "../Content";
import { LeftMenu } from "../Menu/LeftMenu";
import { TopMenu } from "./TopMenu";

export async function AppLayout({
  children,
  query,
}: PropsWithChildren<{ query?: string }>) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-6 border-r border-gray-200">
      <LeftMenu />
      </aside>
      <div className="flex-1 p-8">
      <Content>
        <TopMenu query={query} />
        {children}
      </Content>
      </div>
    </div>
  );
}
