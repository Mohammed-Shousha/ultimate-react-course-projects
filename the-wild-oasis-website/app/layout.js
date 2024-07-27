import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>
        <Logo />
      <Navigation />
      </header>
      <body>{children}</body>
      <footer>Copyright by The Wild Oasis</footer>
    </html>
  );
}
