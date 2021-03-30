import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Learn <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Currently you're in {' '}
          <code className="code">pages/index.js</code>
        </p>

        <div className="grid">
          <Link href="/about">
            <a className={`card ${styles.card}`}>
              <h3>About me &rarr;</h3>
              <p>Find in-depth information about me.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}
