import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";
import Button from "./Button";

interface SocialShareButtonProps {
  activityData: {
    type: string;
    duration: number;
    caloriesBurned: number;
    date: string;
  };
  goalId: number;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  activityData,
  goalId,
}) => {
  const { data: session } = useSession();
  const [isSharing, setIsSharing] = useState(false);

  const share = async () => {
    setIsSharing(true);
    try {
      await api.post("/api/social/post", {
        userId: session?.user.id,
        goalId,
        activityData,
      });
      setIsSharing(false);
    } catch (error) {
      console.error(error);
      setIsSharing(false);
    }
  };

  return (
    <Button
      onClick={share}
      disabled={isSharing}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      {isSharing ? "Sharing..." : "Share Progress"}
    </Button>
  );
};

export default SocialShareButton;