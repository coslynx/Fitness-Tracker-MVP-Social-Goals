import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/next-auth.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "Authenticated" });
}