"use client";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import NavLink from "./NavLink";
import { useState } from "react";

const Profile = () => {
  const [userAuth, setUserAuth] = useState({
    id: "abc",
    name: "Moja",
    isAdmin: true,
  });

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.status === 200) {
        setUserAuth(null);
        toast.success("Logged out successfully");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  const handleVisible = () => {
    const profile = document.getElementById("profile");
    if (profile.classList.contains("hidden")) {
      profile.classList.remove("hidden");
    } else {
      profile.classList.add("hidden");
    }
  };
  return (
    <div className="dropdown dropdown-end mr-5" onClick={handleVisible}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-14 rounded-full">
          <Image
            alt={userAuth?.name || "User"}
            src={userAuth?.avatar || "/defaultAvatar.jpg"}
            width={40}
            height={40}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        id="profile"
        className="menu menu-sm dropdown-content bg-base-200 w-40 rounded-box z-40 mt-3 p-2 shadow"
      >
        <NavLink name={`${userAuth?.name}'s Profile`} route="/dashboard" />
        <NavLink name="Add Blog" route="/add-blog" />
        <NavLink name="Add Event" route="/add-event" />
        <NavLink name="Add Photo" route="/add-img" />
        <li>
          <button onClick={handleLogout}>LOGOUT</button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
