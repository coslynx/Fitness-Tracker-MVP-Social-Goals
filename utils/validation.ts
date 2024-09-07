import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email format" });
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
  });
export const goalTitleSchema = z
  .string()
  .min(3, { message: "Goal title must be at least 3 characters long" });
export const goalTypeSchema = z.enum(["weightLoss", "muscleGain", "distanceRun"], {
  message: "Invalid goal type",
});
export const goalTargetDateSchema = z.string().date({ message: "Invalid date format" });
export const activityTypeSchema = z.enum(["walking", "running", "cycling", "swimming", "other"], {
  message: "Invalid activity type",
});
export const activityDurationSchema = z.number().min(1, { message: "Duration must be at least 1 minute" });
export const activityCaloriesBurnedSchema = z.number().min(1, { message: "Calories burned must be at least 1" });
export const activityDateSchema = z.string().date({ message: "Invalid date format" });