import BannerSlider from "@/components/Banner";
import StatsSection from "@/components/StateSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <BannerSlider />
      <StatsSection />
    </div>
  );
}
