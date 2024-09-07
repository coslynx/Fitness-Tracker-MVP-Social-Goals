import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { useStore } from "../store";
import { api } from "../utils/api";
import Header from "./Header";
import GoalInput from "./GoalInput";
import ProgressChart from "./ProgressChart";
import SocialShareButton from "./SocialShareButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { goals, user, addGoal, setActivityData, activityData, goalId, setGoalId } =
    useStore();
  const router = useRouter();
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

  return (
    <SessionProvider>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          {showGoalInput && (
            <GoalInput onClose={handleCloseGoalInput} />
          )}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Fitness Goals</h1>
            {user && (
              <button
                onClick={handleOpenGoalInput}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add New Goal
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                onClick={() => handleGoalClick(goal.id)}
              >
                <h2 className="text-xl font-semibold mb-2">{goal.title}</h2>
                <p className="text-gray-600 mb-2">Type: {goal.type}</p>
                <p className="text-gray-600 mb-2">
                  Target Date: {goal.targetDate}
                </p>
              </div>
            ))}
          </div>
          {goalId && (
            <>
              {user && (
                <SocialShareButton
                  activityData={activityData}
                  goalId={goalId}
                />
              )}
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
    </SessionProvider>
  );
};

export default Layout;