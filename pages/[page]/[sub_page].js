import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
    const router = useRouter()
    const { page, sub_page: currentPage } = router.query

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">
                <h1 className="title">
                    {currentPage} page, <Link href="/">back to Home!</Link>
                </h1>

                <p className="description">
                    Currently you're in {' '}
                    <code className="code">pages/{page}/{currentPage}</code>
                </p>
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
