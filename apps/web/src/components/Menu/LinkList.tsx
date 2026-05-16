import type { PropsWithChildren } from "react";

export function LinkList(props: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h3 className="font-bold" style={{color: "var(--text)"}}>
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
