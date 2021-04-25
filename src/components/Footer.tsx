import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-700 pt-8 pb-6 text-gray-200">
        {/* <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div> */}
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">
                Truck your bus
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-100">
                Developed by Nazar Pasika
              </h5>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto sm:mt-5">
                  <span className="block uppercase text-gray-100 text-lg font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-gray-100 hover:text-gray-400 font-semibold block pb-2 text-sm"
                         href="https://www.creative-tim.com/presentation">About 
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-100 hover:text-gray-400 font-semibold block pb-2 text-sm"
                         href="https://www.github.com/creativetimofficial">Github
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-400 font-semibold py-1">
                {new Date().getFullYear()}{" "} Nazar Pasika
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}