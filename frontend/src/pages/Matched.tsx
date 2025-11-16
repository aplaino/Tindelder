import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import DeckCard1 from "../components/DeckCard1";
import DeckCard2 from "../components/DeckCard2";
import {Link} from "react-router-dom"

export default function Deck() {
  return (
    <div
      className="bg-[#F8F4EB] h-[140vh] min-w-screen relative
    flex justify-center items-center"
    >
      <section className="flex flex-col items-center h-fit justify-between relative bottom-5
      mt-20">
        <h1 className="mb-20 text-8xl font-mw">A Match!</h1>
        <div className="relative h-100 w-100">
          <DeckCard1 />
          <DeckCard2 />
        </div>

        <p className="max-w-60 text-center mb-20">
          You and Clifford both liked each other’s profile, it’s time to have a
          chat! Click the button below to talk to Clifford.
        </p>

        {/** button plate */}
        <div className="flex w-fit justify-center bg-black/20 h-10 rounded-2xl p-1">
          <Link
            to="/match"
            className="bg-white w-35 h-full rounded-2xl
          text-black/40 flex justify-center items-center"
          >
            Go to Message
          </Link>
        </div>
      </section>
    </div>
  );
}
