"use client";
import { useEffect, useState } from "react";
// import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useUserAuth } from "@/context/userAuth";

const NavRoutes = () => {
  const { user } = useUserAuth();

  interface Route {
    $id: string;
    name: string;
    route: string;
    isActive?: boolean;
  }

  const [routes, setRoutes] = useState<Route[]>();
  useEffect(() => {
    databases
      .listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_NAV_ID!,
        [Query.equal("isActive", true)]
      )
      .then((res) => {
        setRoutes(
          res.documents.map((doc) => ({
            $id: doc.$id,
            name: doc.name,
            route: doc.route,
            isActive: doc.isActive,
          }))
        );
      });
  }, []);

  return (
    <>
      {routes?.map((route) => (
        <NavLink key={route.$id} name={route.name} route={route.route} />
      ))}

      {user?.$id && <NavLink name="Admin" route="/admin" />}
    </>
  );
};

export default NavRoutes;
