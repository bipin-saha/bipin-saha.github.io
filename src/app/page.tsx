"use client";
import Hero from "@/components/Home/Hero";
import Slider from "@/components/Home/Slider/Swiper";
import EarlyResearch from "@/components/Home/Early_Research";
import Video from "@/components/Home/Video";
import LifeAcademia from "@/components/Home/Life_Academia";
import ChildhoodAcademic from "@/components/Home/Childhood_Academic";
import News from "@/components/Home/News";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Slider />
      <EarlyResearch />
      <Video />
      <LifeAcademia />
      <ChildhoodAcademic />
      <News />
    </>
  );
};

export default HomePage;
