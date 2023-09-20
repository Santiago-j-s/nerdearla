import localFont from "next/font/local";

const riftSoftFont = localFont({
  src: "../fonts/RiftSoft-Regular.woff2",
  display: "swap",
  variable: "--font-rift-soft",
});

export const metadata = {
  title: "Agenda nerdearla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={riftSoftFont.variable}>
      <body>{children}</body>
    </html>
  );
}
