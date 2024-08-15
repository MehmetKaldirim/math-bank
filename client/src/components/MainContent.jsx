import styles from "../style.js";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Footer,
  Stats,
  Testimonials,
  Hero,
} from "./index.js";

const MainContent = () => (
  <>
    <div id="home" className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <div id="features">
          <Stats />
        </div>
        <div id="product">
          <Business />
        </div>
        <Billing />
        <CardDeal />
        <Testimonials />
        <div id="clients">
          <Clients />
        </div>
        <CTA />
        <Footer />
      </div>
    </div>
  </>
);

export default MainContent;
