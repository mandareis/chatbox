import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import useScreenSize from "./useScreenSize";

const LandingPage: React.FC<{}> = () => {
  const user = useAppSelector(selectUser);
  const screenSize = useScreenSize();

  return (
    <>
      <div
        className="container mx-auto mt-24"
        style={{ backdropFilter: "blur(15px)" }}
      >
        {user ? `Hello, ${user.name}` : null}
        <p>I will have all the content of the website</p>
      </div>
    </>
  );
};

export default LandingPage;
