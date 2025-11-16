import MatchCard from "../components/MatchCard";

export default function Matches() {
  return (
    <div className="bg-[#F8F4EB] min-h-screen min-w-screen px-20 font-gs">
      <section className="w-full min-h-full h-auto flex flex-col py-20">
        {/** Sub Header */}
        <h1 className="text-2xl mb-20">YOUR MATCH</h1>
        {/** Grid System, 3 cols. */}
        <div
          className="w-full min-h-full h-auto
        grid grid-cols-3 gap-y-20"
        >
          <div className="relative h-75">
            <MatchCard />
          </div>
          <div className="relative h-75">
            <MatchCard />
          </div>
          <div className="relative h-75">
            <MatchCard />
          </div>
          <div className="relative h-75">
            <MatchCard />
          </div>
        </div>
      </section>
    </div>
  );
}
