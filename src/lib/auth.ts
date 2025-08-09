import { account } from "@/lib/appwrite";

export interface User {
  $id: string;
  name: string;
  email: string;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await account.get();
    return user as User;
  } catch (error) {
    // If user is not authenticated or any other error occurs, return null
    // This prevents the SSR from crashing when no user is logged in
    console.log("No authenticated user found", error);
    return null;
  }
}
