import DeckCard from "../components/DeckCard";

export default function Profile() {
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
            <form className="s-full flex flex-col gap-14">
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>NAME</label>
                <input className="bg-black/10 p-2" placeholder="Consuela" />
              </div>
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>Age</label>
                <input className="bg-black/10 p-2" placeholder="143" />
              </div>
              <div className="flex flex-col gap-2 w-80 h-10">
                <label>ABOUT ME</label>
                <textarea
                  className="bg-black/10 p-2"
                  placeholder="Hola amigos...."
                />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
