import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../store";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { user, setUser } = useStore();

  const handleLogout = async () => {
    await session?.user.id
      ? setUser(null)
      : router.push("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">
            Fitness Tracker
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {status === "authenticated" ? (
              <>
                <li>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;