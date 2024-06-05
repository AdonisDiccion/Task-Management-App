import { Link } from "react-router-dom";
import luffy from "../assets/background/luffy.png";
import strawhat from "../assets/background/strawhat.png";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center bg-[#11171b] h-screen w-screen z-10">
      <div>
        <img src={luffy} alt="luffy" />
      </div>
      <div className="font-Jolly font-extrabold text-[350px] text-white">
        <p className="flex items-center justify-start text-start tracking-tighter">
          <div>4</div>
          <span>
            <img src={strawhat} alt="strawhat" className="w-[450px]" />
          </span>
          <div>4</div>
        </p>
        <p className="text-[40px] tracking-wide">
          Oops! The page youre looking for seems to have sailed away.
        </p>
        <p className="text-2xl tracking-wider cursor-pointer text-center pt-5 hover:opacity-80 underline hover:scale-105 transition ease-in-out duration-300">
          <Link to="/">Sail Back Home</Link>
        </p>
      </div>
    </div>
  );
}
