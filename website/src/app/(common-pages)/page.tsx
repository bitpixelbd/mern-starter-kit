import AdSection from "../../components/pages/home/AdSection";
import ApparelsSection from "../../components/pages/home/ApparelsSection";
import BannerSection from "../../components/pages/home/BannerSection";
import CategoriesSection from "../../components/pages/home/CategoriesSection";
import ConsumerSection from "../../components/pages/home/ConsumerSection";
import DealsSection from "../../components/pages/home/DetailSection";
import DownloadAppImgSection from "../../components/pages/home/DownloadAppImgSection";
import GardenAndKitchen from "../../components/pages/home/GardenAndKitchen";
import NewArrivals from "../../components/pages/home/NewArrivals";
import SecondAdSection from "../../components/pages/home/SecondAdSection";
import ThirdAdSection from "../../components/pages/home/ThirdAdSection";

export const metadata = {
  title: "home",
};

const HomePage = () => {
  return (
    <div className="homepage-1">
      {/* <BannerSection /> */}
      <AdSection />
      <DealsSection />
      <SecondAdSection />
      <CategoriesSection />
      <ConsumerSection />
      <ApparelsSection />
      <GardenAndKitchen />
      <ThirdAdSection />
      <DownloadAppImgSection />
      <NewArrivals />
    </div>
  );
};

export default HomePage;
