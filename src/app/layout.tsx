import QueryProvider from "@/components/Reactquery/QueryProvider";
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <title>سامانه خرید بلیط | گیتی‌نورد</title>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}