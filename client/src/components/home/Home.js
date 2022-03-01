import React from "react";

function Home() {
  return (
    <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center ">
      <div className="p-16 flex flex-col justify-center items-center md:w-1/2">
        <h1 className="md:text-6xl text-4xl font-semibold py-10 title-grey">
          WELCOME
        </h1>
        <p className="para-grey text-xl  font-semibold py-8 text-center">
          If you love animals you are in the right place, you can use our
          website to adopt your favorite cat or dog.
        </p>
      </div>
      <div className="md:h-screen flex justify-center items-center p-4 md:pt-16">
        <img src="./images/cat.png" alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Home;
