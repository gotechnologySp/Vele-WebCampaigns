import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Props<T extends ElementType> = { as?: T; children: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({ as, children, className = "", ...props }: Props<T>) {
  const Tag = as ?? "div";
  return <Tag className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`} {...props}>{children}</Tag>;
}
