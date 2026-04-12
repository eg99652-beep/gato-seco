import AnnouncementBar from "@/components/nike/AnnouncementBar";
import Header from "@/components/nike/Header";
import Hero from "@/components/nike/Hero";
import CategoryBar from "@/components/nike/CategoryBar";
import FeaturedDuo from "@/components/nike/FeaturedDuo";
import AboutUs from "@/components/nike/AboutUs";
import ProductGrid from "@/components/nike/ProductGrid";
import MemberBanner from "@/components/nike/MemberBanner";
import Footer from "@/components/nike/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <section id="nosotros">
          <AboutUs />
        </section>

        <FeaturedDuo />

        <MemberBanner />
      </main>
      <Footer />
    </>
  );
}
