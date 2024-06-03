import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ThankYou = () => {

  return (
    <>
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h1 className="text-[2rem] mt-[4rem]">
          Thank you for your purchase!
        </h1>
        <p className="text-[1.5rem] mt-10">
          We hope you love your new items! We appreciate your
          business and look forward to seeing you again soon.
        </p>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
            <Link to="/">&rarr; Shop More &larr;</Link>
        </ul>
      </div>
    </>
  );
};

export default ThankYou;
