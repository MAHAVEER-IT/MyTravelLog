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
          <footer className="bg-black/60 text-white text-center py-2 px-3 text-xs sm:text-sm md:text-base">
            Developed by Mahaveer @2025 | <a href="https://www.linkedin.com/in/mahaveer-k" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">LinkedIn</a> | This site is made using NextJS
          </footer>
        </div>
      </main>
    </>
  );
}
