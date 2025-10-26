import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main>
      <h1>Welcome {session?.user?.name}</h1>
    </main>
  );
}
