import Head from 'next/head'
import Link from 'next/link'

export default function Home({ slug }) {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">
                <h1 className="title">
                    {slug} page, <Link href="/">back to Home!</Link>
                </h1>

                <p className="description">
                    Currently you're in {' '}
                    <code className="code">pages/{slug}</code>
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

// This function gets called at build time
export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'about' }, },
            { params: { slug: 'faq' }, },
        ],
        fallback: false
    }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    const { slug } = params
    // Pass post data to the page via props
    return { props: { slug } }
}
