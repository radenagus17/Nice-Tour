import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { logOut } from "../(home)/lib/actions";

export default async function NavbarAuth() {
  const { session, user } = await getUser();
  return (
    <div className="inline-flex items-center gap-3">
      {session && user.role === "CUSTOMER" ? (
        <Link
          href="/my-tickets"
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
        >
          My Tickets
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
        >
          Sign In
        </Link>
      )}
      {session && user.role === "CUSTOMER" && (
        <form action={logOut}>
          <Button
            variant={"destructive"}
            className="rounded-full"
            size={"icon"}
          >
            <LogOut size={18} />
          </Button>
        </form>
      )}
    </div>
  );
}
