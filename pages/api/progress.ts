import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/next-auth.config";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ message: "Goal ID is required" });
  }

  try {
    const { data: activityData, error } = await supabase
      .from("activities")
      .select("*")
      .eq("goal_id", goalId);

    if (error) {
      console.error("Error fetching activity data:", error);
      return res.status(500).json({ message: "Failed to fetch data" });
    }

    if (!activityData) {
      return res.status(404).json({ message: "Activity data not found" });
    }

    return res.status(200).json(activityData);
  } catch (error) {
    console.error("Error handling activity data request:", error);
    return res.status(500).json({ message: "Server error" });
  }
}