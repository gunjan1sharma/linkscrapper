import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { ColorContext } from "./extras/ColorContext";
import UpMenu from "./components/UpMenu";
import Particle from "./components/Particle";
import Home from "./pages/HomePage";
import SimpleIntro from "./components/SimpleIntro";
import FeatureIntro from "./components/FeatureIntro";
import FaqComponent from "./components/FaqComponent";
import FaqList from "./components/FaqList";

function App() {
  const [color, setColor] = useState<string>("");
  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <div className="overflow-hidden">
      <UpMenu />

      <ColorContext.Provider
        value={{
          color: color,
          setColor: handleColorChange,
        }}
      >
        <SimpleIntro
          tag="FREE TOOL"
          heading="Link Scrapper Tool"
          subtitle="Extract Links of Any Website"
          btntext="Scrap Links"
        />
        <Home />
      </ColorContext.Provider>
      <FaqList />
      <Footer />
    </div>
  );
}

export default App;
