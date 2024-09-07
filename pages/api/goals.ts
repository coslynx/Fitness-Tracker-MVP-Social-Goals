import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/next-auth.config';
import { supabase } from '@/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { userId, title, type, targetDate } = req.body;

  if (!userId || !title || !type || !targetDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data: goal, error } = await supabase
      .from('goals')
      .insert({
        user_id: userId,
        title,
        type,
        target_date: targetDate,
      })
      .select();

    if (error) {
      console.error('Error creating goal:', error);
      return res.status(500).json({ message: 'Failed to create goal' });
    }

    return res.status(201).json(goal);
  } catch (error) {
    console.error('Error handling goal request:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}