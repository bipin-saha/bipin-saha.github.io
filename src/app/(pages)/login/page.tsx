"use client";
import { useUserAuth } from "@/context/userAuth";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [auth, setAuth] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const route = useRouter();
  const { setUser } = useUserAuth();
  const handleLogin = async () => {
    if (!auth.email || !auth.password) {
      toast.error("Email and password are required.");
      return;
    }

    const loadingToastId = toast.loading("Logging in...");

    try {
      const res = await account.createEmailPasswordSession(
        auth?.email,
        auth?.password
      );

      console.log("Login response:", res);
      // Fetch user details after successful login
      const user = await account.get();
      toast.dismiss(loadingToastId); // Dismiss the specific loading toast
      toast.success("Login successful!");
      setUser(user); // Set the user in context
      route.push("/"); // Redirect to home page after successful login
    } catch (error) {
      toast.dismiss(loadingToastId); // Dismiss the specific loading toast
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(`Login failed: ${errorMessage || "Unknown error"}`);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="hero min-h-screen max-w-5xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                onChange={(e) =>
                  setAuth({
                    ...auth,
                    email: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) =>
                  setAuth({
                    ...auth,
                    password: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
