// import type {ReactNode} from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
// import Heading from '@theme/Heading';

// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home(): ReactNode {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }



import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Physical AI & 
              <span className={styles.heroTitleAccent}> Humanoid Robotics</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              The Complete Guide to Building Intelligent Robotic Systems That Think, Learn, and Interact
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Chapters</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Code Examples</span>
              </div>
            </div>
            <div className={styles.heroButtons}>
              <Link
                className={styles.heroButtonPrimary}
                to="/docs/intro">
                Start Reading Free
              </Link>
             
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.robotAnimation}>
              <div className={styles.robotHead}></div>
              <div className={styles.robotBody}></div>
              <div className={styles.robotLeftArm}></div>
              <div className={styles.robotRightArm}></div>
              <div className={styles.robotLeftLeg}></div>
              <div className={styles.robotRightLeg}></div>
            </div>
          </div>
        </div>
      </div>
     
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Physical AI & Humanoid Robotics - Complete Guide"
      description="Master Physical AI and Humanoid Robotics with comprehensive tutorials, projects, and real-world applications. Learn ROS 2, AI integration, and advanced robotics systems.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}