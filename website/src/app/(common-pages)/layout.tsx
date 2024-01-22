import Footer from "@/src/components/header-footer/footer/Footer";
import Header from "@/src/components/header-footer/header/Header";

export const metadata = {
  title: {
    template: "%s | Dashboard",
  },
  description: "node-commerce",
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
