import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";

const LandingPage: React.FC<{}> = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <div className="" style={{ backdropFilter: "blur(15px)" }}>
        {user ? `Hello, ${user.name}` : null}
        <p>I will have all the content of the website</p>
      </div>
    </>
  );
};

export default LandingPage;
