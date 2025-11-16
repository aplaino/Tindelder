import profile3 from "../assets/images/profile3.png";
export default function DeckCard() {
  return (
    <div
      className="bg-gray-400 h-90 w-70 rounded-2xl bg-cover   
      "
      style={{ backgroundImage: `url(${profile3})` }}
    ></div>
  );
}
