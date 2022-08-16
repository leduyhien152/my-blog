import { SmoothScroll } from "~/components/SmoothScroll";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { Header } from "~/layout/Header";
import { Home } from "~/layout/Home";

export default function Index() {
  return (
    <ThemeProvider>
      <main>
        <Header />
        <SmoothScroll>
          <Home />
          <footer className="py-5 text-center text-white bg-primary font-extralight">
            Website by Hien Le
          </footer>
        </SmoothScroll>
      </main>
    </ThemeProvider>
  );
}
