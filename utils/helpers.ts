import { supabaseUrl, supabaseKey } from './supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getUserData = async (userId: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getGoalData = async (goalId: number) => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('id', goalId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getActivityDataForGoal = async (goalId: number) => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('goal_id', goalId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const calculateProgress = (activityData: any[], goalData: any) => {
  if (!activityData || !goalData) {
    return 0;
  }

  // Example: Calculate progress for calories burned goal
  if (goalData.type === 'caloriesBurned') {
    const totalCaloriesBurned = activityData.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
    const progressPercentage = (totalCaloriesBurned / goalData.targetValue) * 100;
    return progressPercentage;
  }

  // Add logic for other goal types here
  return 0;
};