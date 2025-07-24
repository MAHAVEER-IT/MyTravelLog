import Head from "next/head";
import Banner from "./components/Banner";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <>
    <Head>
      <title>My Travel Log</title>
      <meta name="description" content="Information about the south indian tourist places" />
      <link rel="icon" href="/mytravellog.png" type="image/png" />
    </Head>
      <main>
        <div>
          <Banner />
          <HomePage />
          <footer className="bg-black/60 text-white text-center">Developed by Mahaveer @2025 | LinkedIn | This site is made use NextJS</footer>
        </div>
      </main>
    </>
  );
}
