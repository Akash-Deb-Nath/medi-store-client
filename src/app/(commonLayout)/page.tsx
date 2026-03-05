import Hero from "@/components/layout/Hero";
import { userService } from "@/services/user.service";

export default async function Home() {
  const {data,error}=await userService.getSession();
  return (
    <div>
      <Hero/>
    </div>
  );
}
