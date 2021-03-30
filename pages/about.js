import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/About.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Detail App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className={`title ${styles.title}`}>
          About page, <Link href="/">back to Home!</Link>
        </h1>

        <p className="description">
          This is all information about me
        </p>

        <div className="grid">
          <div className="card">
            <h3>Addin Cendekia Wahid</h3>
            <p>
              <b>location</b>: Surabaya<br></br>
              <b>email</b>: addin.cendekia@sirclo.com<br></br>
            </p>
          </div>
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
