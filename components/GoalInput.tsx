import { useState } from "react";
import { useStore } from "../store";
import { api } from "../utils/api";
import Button from "./Button";

interface GoalInputProps {
  onClose: () => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onClose }) => {
  const { goals, addGoal, user } = useStore();
  const [goalTitle, setGoalTitle] = useState("");
  const [goalType, setGoalType] = useState("");
  const [goalTargetDate, setGoalTargetDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/api/goals", {
        userId: user?.id,
        title: goalTitle,
        type: goalType,
        targetDate: goalTargetDate,
      });

      addGoal({
        id: goals.length + 1, // Assuming IDs are sequential for simplicity
        title: goalTitle,
        type: goalType,
        targetDate: goalTargetDate,
      });

      setGoalTitle("");
      setGoalType("");
      setGoalTargetDate("");
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Set a New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="goalTitle" className="block text-gray-700 font-bold mb-2">
              Goal Title:
            </label>
            <input
              type="text"
              id="goalTitle"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="goalType" className="block text-gray-700 font-bold mb-2">
              Goal Type:
            </label>
            <select
              id="goalType"
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Goal Type</option>
              <option value="weightLoss">Weight Loss</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="distanceRun">Distance Run</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="goalTargetDate" className="block text-gray-700 font-bold mb-2">
              Target Date:
            </label>
            <input
              type="date"
              id="goalTargetDate"
              value={goalTargetDate}
              onChange={(e) => setGoalTargetDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Goal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalInput;