import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './test-home.module.css';

const cardsData = [
  {
    title: 'Getting Started',
    icon: '🚀',
    description: 'Learn what Refract can do.',
    link: '/docs/Introduction',
  },
  {
    title: 'API Reference',
    icon: '⚙️',
    description: 'Consult reference docs for the Refract API',
    link: '/docs/API',
  },
  {
    title: 'Concepts',
    icon: '💡',
    description: 'The details of how Refract works.',
    link: '/docs/concepts',
  },
  {
    title: 'Tutorials',
    icon: '📖',
    description: 'Build a small scale project with Refract to get a feel for how it works. ',
    link: '/docs/tutorials',
  },
];

export default function TestHome() {
  return (
    <Layout
      title="Refract Docs"
      description="Name of the product">
      
      {/* Hero Section */}
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>Refract</h1>
          <p className={styles.heroSubtitle}>Break down complex code. Build beautiful UIs</p>
        </div>
      </header>

      {/* Cards List Section */}
      <main className={styles.mainContainer}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Read our docs</h2>
          
          <div className={styles.cardsWrapper}>
            {cardsData.map((card, idx) => (
              <Link to={card.link} key={idx} className={styles.cardItem}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <div className={styles.cardContent}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}