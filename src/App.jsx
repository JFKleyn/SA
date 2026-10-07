import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { AboutPage } from "./pages/about/AboutPage";
import { GalleryPage } from "./pages/gallery/GalleryPage";
import { ContactPage } from "./pages/contact/ContactPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
      <Footer />
      </>
  );
}
