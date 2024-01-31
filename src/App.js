import "./App.css";
import NavBar from "./NavBar/NavBar";
import HeroSection from "./HeroSection/HeroSection";
import FeatureSection from "./FeatureSection/FeatureSection";
import ContactButton from "./ContactButton/ContactButton";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <ContactButton />
      <Footer />
    </div>
  );
}

export default App;
