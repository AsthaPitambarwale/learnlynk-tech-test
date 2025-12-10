import React from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: 200,
          background: "#eee",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <h2>Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link href="/dashboard/today">Today</Link>
          </li>
          <li>
            <Link href="/dashboard/upcoming">Upcoming</Link>
          </li>
        </ul>
      </nav>
      <div style={{ flex: 1, padding: 20 }}>{children}</div>
    </div>
  );
}
