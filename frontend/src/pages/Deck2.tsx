import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import DeckCard3 from "../components/DeckCard3.tsx";
import { Link } from "react-router-dom";

export default function Deck() {
  return (
    <div
      className="bg-[#F8F4EB] min-h-[90vh] min-w-screen relative
    flex justify-center items-center"
    >
      <section className="flex flex-col h-105 justify-between relative bottom-5">
        <DeckCard3 />
        {/** button plate */}
        <div className="flex w-full justify-between bg-black/20 h-10 rounded-2xl p-1">
          <Link to="/deck"
            className="bg-red-800 w-15 h-full rounded-2xl
          text-white flex justify-center items-center"
          >
            <RxCross1 />
          </Link>
          <Link to="/match"
            className="bg-white w-35 h-full rounded-2xl
          text-black/40 flex justify-center items-center"
          >
            message
          </Link>
          <Link
            to="/matched"
            className="bg-green-600 w-15 h-full rounded-2xl
          text-white flex justify-center items-center"
          >
            <IoMdCheckmark />
          </Link>
        </div>
      </section>
    </div>
  );
}
