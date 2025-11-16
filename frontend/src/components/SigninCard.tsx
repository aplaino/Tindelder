import { RxArrowTopRight } from "react-icons/rx";
import {Link} from "react-router-dom";

export default function SigninCard() {
  return (
    <div
      className="absolute h-full w-80 
        left-0 right-0 ml-auto mr-auto
        flex flex-col justify-between"
    >
      <h2 className="text-6xl text-center">
        Sounds <br /> good to me
      </h2>
      <div className="flex flex-col justify-between items-center h-25 text-xl">
        <Link to="authSignIn  "
          className="bg-black text-white w-35 cursor-pointer
                py-2 rounded-3xl
                flex justify-center items-center"
        >
          Sign up <RxArrowTopRight />
        </Link>
        <Link to="authRegister"
          className="bg-[#f8f4eb] text-black w-35 border-2 cursor-pointer
                py-2 rounded-3xl
                flex justify-center items-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
