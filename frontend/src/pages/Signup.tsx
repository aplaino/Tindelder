import signinBg from "../assets/images/signinBg.png"
import pic1 from "../assets/images/signin1.png"
import pic2 from "../assets/images/signin2.png"
import pic3 from "../assets/images/signin3.png"
import pic4 from "../assets/images/signin4.png"
import pic5 from "../assets/images/signin5.png"
import pic6 from "../assets/images/signin6.png"
import SigninCard from "../components/SigninCard"


export default function Signup() {
  return (
    <div
      className="min-h-[180vh] w-full justify-center items-center
      flex flex-col"
      style={{ backgroundImage: `url(${signinBg})`, backgroundSize: `cover` }}
    >
      {/* --- row 1 (2 images) --- */}
      <div
        className="w-full h-[35vh] 
     relative"
      >
        <img src={pic1} className="absolute rotate-350 left-[30%] scale-120"></img>
        <img src={pic3} className="absolute rotate-10 right-[35%]"></img>
      </div>

      {/* --- row 2 (2 images + sign in options) --- */}
      <div
        className="w-full h-[40vh]
     relative"
      >
        <img src={pic2} className="absolute rotate-355 left-[10%] bottom-30"></img>
        {/* inner text div*/}
        <SigninCard />
        <img src={pic6} className="absolute rotate-5 right-[10%] scale-110 bottom-25"></img>
      </div>
      {/* --- row 3 (2 images) --- */}
      <div
        className="w-full h-[10vh] 
     relative"
      >
        <img src={pic4} className="absolute rotate-350 left-[25%] scale-120 "></img>
        <img src={pic5} className="absolute rotate-10 right-[25%]"></img>
      </div>
    </div>
  );
}
