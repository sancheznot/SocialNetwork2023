import "./globals.css";
import  Provider  from "@/components/Providers";

export const metadata = {
  title: "Photo gallery",
  description: "Photo gallery with nextjs and tailwindcss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
