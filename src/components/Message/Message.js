import React from "react";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="w-100 d-flex justify-content-center  align-items-center container">
      <div className="shadow-lg p-5" style={{ backgroundColor: "#F9C681" }}>
        <p className="h1 underline">Confirm Your Email Address</p>
        <p className="lead mt-4">
          A verification link has been sent to your email. Click on the link to
          verify your account.
        </p>
        <hr />
        <p className="text-muted">
          Already verified your email ? Click{" "}
          <Link to="/login">here to login.</Link>
        </p>
      </div>
    </div>
  );
};

export default Message;
