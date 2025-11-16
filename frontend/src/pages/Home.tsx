import Landing from "./Landing";
import Signup from "./Signup";

export default function Home() {
  return (
    <div className = "s-full flex flex-col">
        <Landing />
        <Signup />
    </div>
  );
}
