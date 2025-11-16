import profile1 from "../assets/images/profile1.png";
export default function DeckCard() {
  return (
    <div
      className="bg-gray-400 h-90 w-70 rounded-2xl bg-cover absolute -rotate-5
      -left-10 "
      style={{ backgroundImage: `url(${profile1})` }}
    ></div>
  );
}
