import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import styles from "../style";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section if there's a hash in the URL
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Conditionally render the main content or the page based on the route */}
      {location.pathname === "/" && <MainContent />}

      {/* Render children if not on the main page */}
      {location.pathname !== "/" && children}
    </div>
  );
};

export default Layout;
