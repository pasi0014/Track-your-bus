import { useState, useEffect } from "react";
import "../interfaces/RouteList";
import axios from "axios";
import { RouteList, Routes } from "../interfaces/RouteList";
import Search from "../components/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RoutesPage = () => {

    const [ items, setItems ] = useState<RouteList>();
    const [ routes, setRoutes ] = useState<Routes>();
    const [ stop, setStop ] = useState("5291");
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ search, setSearch ] = useState<string>("test");

    const apiID = process.env.REACT_APP_API_APP_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const proxy = process.env.REACT_APP_PROXY_LINK;

    const baseAPIUrl = "https://api.octranspo1.com/v2.0/GetRouteSummaryForStop";

    useEffect( ()=> {
      // Fetch Data from the API
      const fetchData = async () => {
        // const result = await axios.get(proxy + apiLink);
        const result = await axios({
          method: 'get',
          baseURL: proxy + baseAPIUrl,
          url: '?appID='+apiID+'&apiKey='+apiKey+'&stopNo='+stop+'&format=json',
          timeout:3000
        });
        if(result.status === 200){
          console.log(result.status)
          setItems(result.data);
          setRoutes(result.data.GetRouteSummaryForStopResult.Routes);
          setIsLoaded(true);
        }else{
          setError(true);
        }
      };

      fetchData().catch(e => {
        console.log(e);
        setError(true);
        setIsLoaded(true);
        console.log("ERROR HAPPANED");
        console.log(error);
      });
  },[stop])

  const clickEventHandle = (e:any) => {
    console.log(search);
    setStop(search);
  } 
  const handleChange = (e:any) => {
    console.log("TEST HERE",e);
    setSearch(e.target.value);
  }

  if (!isLoaded) {
    return(
       <div className="bg-green-100 p-10 mx-auto container text-center font-medium">
        Loading...
      </div>)
  } else if(error){
    return (
      <div className="bg-red-100 p-10 mx-auto container text-center font-medium">
        Something bad has happened. Try again later...
      </div>
    )
  }else{

  return(
    <div className="container mx-auto border border-green-700">
      <div className="flex justify-center flex-col">
      <div className="relative mt-1">
        {/* <Search value={search} onChange={ (e:any) => console.log(e) }/> */}
        <input
          type="text"
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200
            rounded-xl hover:border-gray-300 focus:outline-none
            focus:border-blue-500 transition-colors"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button 
            onClick={ clickEventHandle }
            className="block w-7 h-7 text-center text-xl leading-0 absolute
            top-2 right-2 text-gray-400 focus:outline-none
            hover:text-gray-900 transition-colors">
            <FontAwesomeIcon icon={["fas", "search"]} />
        </button>
        </div>
        <h1 className="text-center">There is Routes page for {items?.GetRouteSummaryForStopResult.StopNo + " " + items?.GetRouteSummaryForStopResult.StopDescription} </h1>
        <h2 className="font-bold text-center">
          Stop Name: { items?.GetRouteSummaryForStopResult.StopDescription }
        </h2>
        <ul className="font-medium text-gray-500 text-center">
          {
            routes?.Route.map(item => (
              <li key={item.RouteNo}>
                {item.RouteNo}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
  }
};

export default RoutesPage;
