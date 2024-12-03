import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import AiPage from "@/components/AI";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();
  const userCookie = cookieStore.get("user"); // Replace "user" with your cookie key

  const isLoggedIn = userCookie ? true : false;

  return (
    
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header isLoggedIn={isLoggedIn} />
          <AiPage />
          {children}
          <Footer />
          
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
