import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="w-full h-28 bg-[#F8F4EB]  font-mw
        px-20"
    >
      <div
        className="w-full h-full flex 
        border-b-2 border-black/10 py-4"
      >
        {/* ----- left section ----- */}
        <section
          className="w-full h-full
       flex justify-baseline"
        >
          <div
            className="w-60 h-full 
          flex justify-between items-center"
          >
            <Link to="match">Match</Link>
            <Link to="deck">Deck</Link>
            <Link to="profile">Profile</Link>
          </div>
        </section>
        {/* ----- middle section ----- */}
        <section
          className="w-full h-full 
        flex justify-center items-center"
        >
          <h1 className="text-center">
            Produced by
            <br />
            Andreas P. &<br />
            Christopher M.
          </h1>
        </section>
        {/* ----- right section ----- */}
        <section className="w-full h-full flex justify-end items-center">
          <Link to="">Tindelderly</Link>
        </section>
      </div>
    </header>
  );
}
