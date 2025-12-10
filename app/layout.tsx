import React from "react";
import Providers from "../src/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header style={{ padding: 20, backgroundColor: "#f5f5f5" }}>
            <h1>LearnLynk Dashboard</h1>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
