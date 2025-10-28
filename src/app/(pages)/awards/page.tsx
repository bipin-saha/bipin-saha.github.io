import Title from "@/components/Title";
import React from "react";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Awards = () => {
  return (
    <div>
      <Title>Awards</Title>
      {data.map((item) => (
        <div className="card lg:card-side bg-base-100 shadow-sm my-10" key={item}>
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Listen</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Awards;
