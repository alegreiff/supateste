import { handleAuth } from "@supabase/auth-helpers-nextjs";

console.log("Impacta laapi");
export default handleAuth({ logout: { returnTo: "/" } });
