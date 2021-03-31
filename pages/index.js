import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ characters, info }) {
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
          <h3 style={{ marginRight: 15 }}>
            <Link href="/">
              <a>Main</a>
            </Link>
          </h3>
          <h3 style={{ marginRight: 15 }}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </h3>
          <h3 style={{ marginRight: 15 }}>
            <Link href="/faq">
              <a>FAQ</a>
            </Link>
          </h3>
        </div>

        <div className="grid">
          {characters.map((character) => (
            <Link href="/" key={character.id}>
              <a className={`card ${styles.card}`}>
                <h3>{character.name}</h3>
              </a>
            </Link>
          ))}
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

export async function getServerSideProps(context) {
  const res = await fetch(`https://rickandmortyapi.com/api/character`)
  const data = await res.json()
  const { results: characters, info } = data

  console.log(data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      characters,
      info
    }, // will be passed to the page component as props
  }
}
