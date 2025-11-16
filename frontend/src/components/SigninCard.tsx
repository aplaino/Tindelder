import { RxArrowTopRight } from "react-icons/rx";

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
        <button
          className="bg-black text-white w-35 cursor-pointer
                py-2 rounded-3xl
                flex justify-center items-center"
        >
          Sign up <RxArrowTopRight />
        </button>
        <button
          className="bg-[#f8f4eb] text-black w-35 border-2 cursor-pointer
                py-2 rounded-3xl
                flex justify-center items-center"
        >
          Register
        </button>
      </div>
    </div>
  );
}
