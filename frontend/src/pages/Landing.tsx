import landingImg from "../assets/images/landing.png";
import {useEffect} from "react"

export default function Landing() {
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register/");
    if (!res.ok) throw new Error("Got Error: HTTP");
    const data = await res.json();
    console.log(data);
  };

  useEffect(()=>{
    const fetchFunction = async()=>{
      fetchData();
    }
    fetchFunction();
  })
  
  return (
    <div className="bg-[#F8F4EB] h-auto min-w-screen">
      {/* ---- upper text section for landing tedxt and its surrounding texts ---- */}
      <section
        className="w-full h-[60vh] font-gs
      flex relative z-0"
      >
        {/* left */}
        <div
          className=" w-[25%] h-full
        flex justify-center items-center"
        >
          <h3 className="flex text-center">
            Stupid <br /> Hackathon <br /> 2025 UWO
          </h3>
        </div>
        {/* centre */}
        <div
          className=" w-[50%] h-full
        flex justify-center items-center"
        >
          <h1 className="font-mw text-8xl flex text-center">
            Rediscover <br />
            Love
          </h1>
        </div>
        {/* right */}
        <div
          className=" w-[25%] h-full
        flex justify-center items-center"
        >
          <h3 className="flex text-center">
            Tinder for <br /> the elderly
          </h3>
        </div>
      </section>
      {/* ---- Lower section for the collage: old ppl in a row (transition) */}
      <section className="w-full h-40 relative z-20">
        <img
          className="w-full h-100 absolute object-cover -top-30"
          src={landingImg}
          alt="hi"
        />
      </section>
    </div>
  );
}
