import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../fontawesome";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-3 bg-yellow-500 text-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" className=" text-sm font-bold leading-relaxed flex items-center inline-block mr-4 py-2 whitespace-nowrap uppercase">
                <span className="mr-2">
                    <FontAwesomeIcon icon={["fas", "bus"]} size="3x" />
                </span>
                <span className="text-lg">
                    Track Your Bus
                </span>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
            <FontAwesomeIcon icon={["fas", "bars"]} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-yellow-600 lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <Link to="/routes">
              <li className="flex items-center">
                <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-50 hover:text-gray-500 py-2 px-3 rounded font-medium"
                    style={{ transition: "all .15s ease" }}>
                    List of bus routes
                </button>

              </li>
              </Link>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#pablo"
                >
                  <i
                    className=" fab fa-facebook text-lg leading-lg "
                  />
                  <FontAwesomeIcon icon={["fab", "facebook"]} size="lg"/>
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#pablo"
                >
                  <i
                    className=" fab fa-twitter text-lg leading-lg "
                  />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className=" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#pablo"
                >
                  <i
                    className= "fab fa-github text-lg leading-lg "
                  />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-yellow-600 hover:bg-yellow-100 hover:text-gray-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                    <span className="mr-2">
                        <FontAwesomeIcon icon={["fas", "arrow-alt-circle-down"]} size="lg" />
                    </span>
                    Download
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}