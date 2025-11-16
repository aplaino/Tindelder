import DeckCard from "../components/DeckCard";
import {useEffect, useState} from "react"
import profile1 from "../assets/images/profile1.png"


export default function Profile({accessToken} : any) {

  // NEED TO REDIRECT TO NULL PAGE IF ACCESS TOKEN IS NULL

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [age, setAge] = useState("90")
  const updatedProfileData = { display_name : displayName, bio, location, birth_date: age || "" };


  console.log("updated:", updatedProfileData);

  
  
  const fetchData = async()=>{
    const res = await fetch(`http://127.0.0.1:8000/api/profile/me`, {
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) throw new Error("Res is not ok. " + res.status);
    const data = await res.json();
    // when page mounts, set profile info based on returned data
    setDisplayName(data.display_name);
    setBio(data.bio)
    setAge(data.birth_date)
    setLocation(data.location)

    console.log("fetch from db (not update):", data);
  }

  useEffect(()=>{
    const fetchFunction =async()=>{
      fetchData()
    }
    fetchFunction();
  }, [])

  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    

    const res = await fetch(`http://127.0.0.1:8000/api/profile/me/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfileData),
    });

    if(!res.ok) throw new Error("res is not ok! "+ res.status)

    const data = await res.json();
    console.log("data from db (updated):", data)
  }

  return (
    <div className="bg-[#F8F4EB] min-h-screen min-w-screen px-20 font-gs">
      <div
        className="flex flex-col w-full min-h-full h-auto py-20 
      "
      >
        <h1 className="text-2xl mb-10 flex items-baseline ">EDIT PROFILE</h1>
        <div
          className="w-full gap-20 h-full 
        flex justify-center items-center"
        >
          {/** display profile image */}
          <section>
            <DeckCard />
          </section>
          {/** display edit options */}
          <section className="s-full p-4">
            <form
              className="s-full flex flex-col gap-14"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>NAME</label>
                <input
                  className="bg-black/10 p-2"
                  placeholder="Consuela"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </div>
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>AGE</label>
                <input
                  className="bg-black/10 p-2"
                  placeholder="143"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </div>
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>LOCATION</label>
                <input
                  className="bg-black/10 p-2"
                  placeholder="santa monica"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>ABOUT ME</label>
                <textarea
                  className="bg-black/10 p-2"
                  placeholder="Hola amigos...."
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                />
              </div>
              <button type="submit"> Update Profile </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
