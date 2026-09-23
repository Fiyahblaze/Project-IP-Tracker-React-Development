import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <h1>IP Address Tracker</h1>
      {children}
    </header>
  );
}

export default Header;