import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/config/styles/globals.css";
import { RestApiProvider } from "@/pkg/libraries/rest-api";

import { type Locale, NextIntlClientProvider } from "next-intl";

import { FC, ReactNode } from "react";
import { HeaderComponent } from "@/app/(client)/(app)/widgets/header";

import { setRequestLocale } from "next-intl/server";

interface IProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <RestApiProvider>
            <HeaderComponent />

            {children}
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
