import {useState, useContext} from "react"


export default function AuthSignin({setAccessToken}:any) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


    const handleSubmit = async (e:any) => {
      e.preventDefault();
      const formData = { username, password}
      console.log("form data:", formData);

      
      
      const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("HTTP error: " + res.status);
      const data = await res.json();
      console.log(data)

      setAccessToken(data.access)
      

    };
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center
     bg-[#F8F4EB]"
    >
      <form
        className="h-fit w-120 flex flex-col justify-center items-center
       gap-14 "
       onSubmit = {handleSubmit}
      >
        <h1 className="text-center text-2xl bold ">Log In</h1>
        <div className="flex flex-col gap-2 w-80 h-10">
          <label>NAME</label>
          <input
            className="bg-black/10 p-2"
            placeholder="Consuela"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-80 h-10">
          <label>PASSWORD (has to be 8 characters)</label>
          <input
            className="bg-black/10 p-2"
            placeholder="12345678"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-black text-white w-35 cursor-pointer
                        py-2 rounded-3xl
                        flex justify-center items-center"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
