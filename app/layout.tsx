import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";
import {ContextProvider} from "../context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
