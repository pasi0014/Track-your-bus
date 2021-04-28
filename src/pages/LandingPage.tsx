import React from "react";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="container mx-auto">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="lg:flex lg:mx-auto w-full lg:w-10/12 mb-4 mt-4 justify-center lg:space-x-3 p-3">
            <div className="flex flex-col lg:w-10/12 sm:w-12/12">
              <div className="lg:w-full bg-gray-800 text-white rounded-lg mx-auto my-3 p-16 shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Truck Your Bus</h1>
                {/* <h2 className="font-medium text-base text-indigo-400 mb-4 uppercase tracking-wide"></h2> */}
                <p className="text-base">
                  You can search for the bus stops and check when the next bus
                  will arive.
                </p>
                <Link to="/stopInfo">
                  <button className="bg-indigo-600 p-2 mt-5 rounded-lg font-medium px-3 hover:bg-indigo-500 hover:text-gray-100 transition duration-300 ease">
                    Search for stop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default LandingPage;
