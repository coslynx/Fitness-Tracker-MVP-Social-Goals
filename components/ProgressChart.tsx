import { useState, useEffect } from "react";
import { useStore } from "../store";
import { api } from "../utils/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { goals, user } = useStore();
  const [activityData, setActivityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/progress/${goalId}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        setActivityData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goalId, user]);

  const goal = goals.find((g) => g.id === goalId);

  if (isLoading || !goal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Progress for {goal.title}</h2>
      <LineChart
        width={600}
        height={300}
        data={activityData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="caloriesBurned" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ProgressChart;