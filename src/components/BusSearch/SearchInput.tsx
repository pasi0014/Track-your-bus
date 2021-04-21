import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface MyProps{
  keyword: any;
  setKeyword(props:any): any;
  setStop(props:any): any;
  handleEnterKey(props:any):any;
}

class Search extends React.Component<MyProps> {
  render() {
    return (
      <div className="relative mt-1">
        <input
          type="text"
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200
            rounded-xl hover:border-gray-300 focus:outline-none
            focus:border-blue-500 transition-colors"
          value={this.props.keyword}
          onChange={this.props.setKeyword}
          onKeyPress={this.props.handleEnterKey}
          placeholder="Search..."
        />
        <button
          onClick={this.props.setStop}
          className="block w-7 h-7 text-center text-xl leading-0 absolute
      top-2 right-2 text-gray-400 focus:outline-none
      hover:text-gray-900 transition-colors"
        >
          <FontAwesomeIcon icon={["fas", "search"]} />
        </button>
      </div>
    );
  }
}

export default Search;
