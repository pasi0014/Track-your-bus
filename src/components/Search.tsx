import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Search = ( { keyword, setKeyword }:any ) => {


  return (
    // <div className="relative mt-1">

    <input
      type="text"
      className="w-full pl-3 pr-10 py-2 border-2 border-gray-200
            rounded-xl hover:border-gray-300 focus:outline-none
            focus:border-blue-500 transition-colors"
      value={ keyword }
      onChange={ (e:any) => setKeyword(e.target.value) }
      placeholder="Search..."
    />
    // {/* <button 
      // onClick={ (e:any) => setStop(search) }
      // className="block w-7 h-7 text-center text-xl leading-0 absolute
      // top-2 right-2 text-gray-400 focus:outline-none
      // hover:text-gray-900 transition-colors">
      // <FontAwesomeIcon icon={["fas", "search"]} />
    // </button> 

    // {/* </div> */}
  );
};

export default Search;
