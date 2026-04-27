import type { ReactNode } from 'react';

export default function NavBar({
  brand, right,
}: { brand: ReactNode; right?: ReactNode }) {
  return (
    <div className="topbar">
      <div className="brand">{brand}</div>
      <div className="topbar-right">{right}</div>
    </div>
  );
}
