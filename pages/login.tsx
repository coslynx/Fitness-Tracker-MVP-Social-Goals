import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { providers } from '../config/next-auth.config';
import { useStore } from '../store';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setUser } = useStore();

  if (status === 'authenticated') {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Fitness Tracker Login</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}