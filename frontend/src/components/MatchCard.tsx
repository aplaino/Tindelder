import profile2 from "../assets/images/profile2.png"
export default function MatchCard() {
  return (
    <div className="relative group">
      {/** -- card back (photo) */}
      <div
        className="bg-gray-400 border-2 h-75 w-60 rounded-2xl absolute
      transform transition duration-300 group-hover:-translate-y-20"
        style={{ backgroundImage: `url(${profile2})` }}
      ></div>
      {/** -- card front (words) */}
      <div
        className="text-black bg-[#f8f4eb] border-2 h-75 w-60 rounded-2xl font-gs
    flex flex-col justify-between p-4 absolute
    transform transition duration-300 group-hover:translate-y-10
    "
      >
        <div className="flex flex-col">
          <h1 className="text-xl font-mw">Clifford</h1>
          <h3 className="">92</h3>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipscing elit, sed do eiusmod
          tempor incididunt ut labore
        </p>
      </div>
    </div>
  );
}
