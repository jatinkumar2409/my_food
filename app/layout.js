import { Poppins } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "MyFood",
  description: "Get your favorite food in just minutes",
  icons : {
    icon : "/logo.svg"
  }
};
 const poppins = Poppins({
  subsets : ['latin'] ,
   weight: ['400', '700']
 })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
