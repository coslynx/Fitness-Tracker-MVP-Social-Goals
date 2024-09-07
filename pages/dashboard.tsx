import { useSession } from "next-auth/react";
import { useStore } from "../store";
import { api } from "../utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import ProgressChart from "../components/ProgressChart";
import SocialShareButton from "../components/SocialShareButton";
import GoalInput from "../components/GoalInput";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    goals,
    user,
    addGoal,
    setActivityData,
    activityData,
    goalId,
    setGoalId,
  } = useStore();
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user?.accessToken && goalId) {
        try {
          setIsLoading(true);
          const response = await api.get(`/api/progress/${goalId}`, {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          });
          setActivityData(response.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user, goalId, setActivityData]);

  const handleGoalClick = (goalId: number) => {
    setGoalId(goalId);
  };

  const handleOpenGoalInput = () => {
    setShowGoalInput(true);
  };

  const handleCloseGoalInput = () => {
    setShowGoalInput(false);
  };

  if (status !== "authenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">Fitness Tracker</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={handleOpenGoalInput}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add New Goal
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {showGoalInput && (
          <GoalInput onClose={handleCloseGoalInput} />
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Fitness Goals</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={() => handleGoalClick(goal.id)}
            />
          ))}
        </div>
        {goalId && (
          <>
            <SocialShareButton
              activityData={activityData}
              goalId={goalId}
            />
            {isLoading ? (
              <div className="mt-4">Loading...</div>
            ) : (
              <ProgressChart goalId={goalId} />
            )}
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}
      </main>
    </div>
  );
}