import profile2 from "../assets/images/profile2.png";
export default function DeckCard() {
  return (
    <div
      className="bg-gray-400 h-90 w-70 rounded-2xl bg-cover absolute rotate-20
      -right-30 "
      style={{ backgroundImage: `url(${profile2})` }}
    ></div>
  );
}
