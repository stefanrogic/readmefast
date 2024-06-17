import { ReadingContainer } from "@/components/ReadingContainer";

export default async function Home() {
  //? NEXT AUTH (WILL NEED LATER)
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  const paragraph =
    "Idi, pogledaj ponovo ruze. Shvatices da je tvoja jednistvena na svetu. Vrati se onda da mi kazes zbogom, a ja cu ti pokloniti jednu tajnu. Mali princ ode da ponovo vidi ruze. Vi uopste ne licite na moju ruzu, vi jos nista ne znacite, rece im on. Niko vas nije pripitomio, i vi niste nikoga pripitomile. Vi ste kao sto je bila moja lisica. Bila je to obicna lisica slicna stotinama hiljada drugih. Ali ja sam od nje napravio svog prijatelja, i ona je sada jedinstvena na svetu. Ruze su se osecale veoma nelagodno. Lepe ste, ali ste prazne, rece im on jos. Covek ne moze da umre za vas. Naravno, obican prolaznik poverovao bi da moja ruza lici na vas. Ali ona sama znacajnija je od svih vas zajedno zato sto sam ja nju zavoleo. Zato sto sam nju stavljao pod stakleno zvono. Zato sto sam njoj napravio zaklon. Zato sto sam radi nje poubijao gusenice (sem one dve-tri radi leptirova). Zato sto sam nju slusao kako se zali, hvalise ili kako ponekad cuti. Zato sto je to moja ruza. I on se vrati lisici.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ReadingContainer paragraph={paragraph?.split(" ")} />
    </main>
  );
}

//? NEXT AUTH (WILL NEED LATER)
// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
