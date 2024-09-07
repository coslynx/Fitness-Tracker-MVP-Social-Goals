import axios from "axios";
import { supabaseUrl, supabaseKey } from "./supabase";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API endpoints
export const getAuthSession = () => {
  return supabase.auth.getSession();
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signIn({
    provider: "google",
  });
  if (error) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

// Goals API endpoints
export const getGoals = async (userId: number) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createGoal = async (goalData: any) => {
  const { data, error } = await supabase
    .from("goals")
    .insert(goalData)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Progress API endpoints
export const getProgressData = async (goalId: number) => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("goal_id", goalId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const logActivity = async (activityData: any) => {
  const { data, error } = await supabase
    .from("activities")
    .insert(activityData)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Social Feed API endpoints
export const createSocialPost = async (postData: any) => {
  const { data, error } = await supabase
    .from("social_posts")
    .insert(postData)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getSocialFeed = async () => {
  const { data, error } = await supabase
    .from("social_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};