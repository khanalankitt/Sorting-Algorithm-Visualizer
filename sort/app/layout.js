import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal"],
});

export const metadata = {
  title: "Sorting Algorithm Visualizer",
  description:
    "A simple and interactive app to visualize different sorting algorithms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {children}
      </body>
    </html>
  );
}
