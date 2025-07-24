import Banner from "./components/Banner";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <div>
      <Banner />
      <HomePage />
      <footer className="bg-black/60 text-white text-center">Developed by Mahaveer @2025 | LinkedIn | This site is made use NextJS</footer>
    </div>
  );
}
