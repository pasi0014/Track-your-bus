import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Route, RouteList, Routes } from "../interfaces/RouteList";
import axios from "axios";
import { NextBusInfo } from "../interfaces/NextBusInfo";

// eslint-disable-next-line no-lone-blocks
{
  /* 
  Dear future me, please forgive me for wriring this piece of messy code.
  I'm just trying to learn React with TypeScript, and I must admit I was wrong about React.
  It is awesome, and I'm starting to like it more and more from day to day. 
  Also I feel that I'm getting better at it.
  Hope, you are doing great these days :)
*/
}

interface MyState {
  items: any;
  stop: string;
  route: string;
  error: boolean;
  search: string;
  isLoading: boolean;
  loadRoutes: boolean;
  errorMessage: boolean;
  errors: Errors;
  nextArrivalInfo?: NextBusInfo;
}

interface Errors {
  message?: string;
  isValid?: boolean;
}

class RoutesList extends React.Component<RouteList, MyState> {
  constructor(props: RouteList) {
    super(props);
    this.state = {
      items: {},
      stop: "",
      route: "",
      error: false,
      search: "",
      isLoading: true,
      loadRoutes: false,
      errorMessage: false,
      errors: {},
      nextArrivalInfo: undefined,
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleRouteClickEvent = this.handleRouteClickEvent.bind(this);

    this.FetchStopData = this.FetchStopData.bind(this);
    this.FetchNextArrivalData = this.FetchNextArrivalData.bind(this);
  }

  componentDidMount() {
    const array = this.initializeApiObject();
    console.log(array);
    this.setState({ isLoading: false });
  }

  componentDidUpdate() {
    // console.log("Hello I Did Update")
    console.log(this.state.stop);
  }

  initializeApiObject() {
    const apiID = process.env.REACT_APP_API_APP_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const proxy = process.env.REACT_APP_PROXY_LINK;

    const baseAPIUrl = `${proxy}https://api.octranspo1.com/v2.0/GetRouteSummaryForStop`;
    const baseNextBusURL = `${proxy}https://api.octranspo1.com/v2.0/GetNextTripsForStop`;

    const apiObject = {
      apiID: apiID,
      apiKey: apiKey,
      baseAPIUrl: baseAPIUrl,
      baseNextBusURL: baseNextBusURL,
    };
    return apiObject;
  }

  FetchStopData = async () => {
    this.setState({ isLoading: true });
    let apiObjectInfo = this.initializeApiObject();

    const result = await axios({
      method: "GET",
      baseURL: apiObjectInfo.baseAPIUrl,
      url: `?appID=${apiObjectInfo.apiID}&apiKey=${apiObjectInfo.apiKey}&stopNo=${this.state.stop}&format=json`,
    });
    await this.setState({ items: result.data });
    console.log(this.state.items);

    let flagMessage = this.checkResponseErrors(this.state.items);
    if (flagMessage === "") {
      console.log("Should render route list:", flagMessage);
      this.setState({ isLoading: false });
      this.setState({ loadRoutes: true });
      this.setState({ errorMessage: false });
    } else {
      console.log("Dont render route list for stop reason::", flagMessage);
      this.setState({ loadRoutes: false });
      this.setState({ isLoading: false });
      this.setState({ errorMessage: true });
    }
  };

  checkResponseErrors(items: RouteList) {
    let message: string = "";
    if (items.GetRouteSummaryForStopResult.Error === "10") {
      return (message = "Invalid Stop Number");
    } else if (items.GetRouteSummaryForStopResult.Error === "2") {
      return (message = "Undable to query data source");
    } else {
      return message;
    }
  }

  async FetchNextArrivalData(stop: any, route: any) {
    let apiObjectInfo = this.initializeApiObject();
    const result = await axios({
      method: "get",
      baseURL: apiObjectInfo.baseNextBusURL,
      url: `?appID=${apiObjectInfo.apiID}&apiKey=${apiObjectInfo.apiKey}&stopNo=${this.state.stop}&routeNo=${this.state.route}&format=json`,
    });
  }

  async handleClickEvent(e: any) {
    e.preventDefault();
    await this.setState({ stop: this.state.search });
    this.FetchStopData();
    if (await this.handleValidation()) console.log("Not valid");
    console.log(this.state.errorMessage);
  }

  handleChangeEvent(e: any) {
    e.preventDefault();
    this.setState({ search: e.target.value });
  }

  async handleRouteClickEvent(e: any) {
    e.preventDefault();
    console.log("Click");
  }

  async handleValidation() {
    let searchField = this.state.search;
    if (typeof searchField !== undefined) {
      if (!searchField.match("^[0-9]{4}$")) {
        await this.setState({ errorMessage: true });
      }
    }
    return this.state.errorMessage;
  }

  //<Summary>
  //Display list of routes for specific stop
  //@param {items: RouteList} - api response object
  //@param {loadRoutes: boolean} - bool value to conditionaly render method
  //</Summary>
  displayRoutesforStop(
    items: RouteList,
    loadRoutes: boolean,
    errorMessage: boolean
  ) {
    if (errorMessage) return this.displayInvalidInputMessage();
    if (!loadRoutes) return this.displayMessage();
    return (
      <>
        <h2 className="font-bold text-center p-3 uppercase">
          Stop Name: {items.GetRouteSummaryForStopResult.StopDescription}
        </h2>
        {this.rendeListOfRoutes(items.GetRouteSummaryForStopResult.Routes)}
      </>
    );
  }

  rendeListOfRoutes(routes: Routes) {
    let renderArrayRoutes: boolean = false;
    let renderObjectRoute: boolean = false;
    const routeObject: any = routes.Route;

    if (routes.Route != null && routes.Route instanceof Array) {
      renderArrayRoutes = true;
      renderObjectRoute = false;
    }
    if (!Array.isArray(routes.Route)) {
      renderArrayRoutes = false;
      renderObjectRoute = true;
    }
    if (renderArrayRoutes) {
      return (
        <ul className="font-medium text-gray-500 text-center divide-y-2">
          {routes.Route.map((item) => (
            <li
              key={item.RouteNo}
              className="hover:text-gray-900 p-5 hover:bg-green-100 cursor-pointer"
              onClick={this.handleRouteClickEvent}
            >
              Route - {item.RouteNo + " " + item.RouteHeading}
            </li>
          ))}
        </ul>
      );
    }

    if (renderObjectRoute) {
      return (
        <ul className="font-medium text-gray-500 text-center divide-y-2">
          <li
            className="hover:text-gray-900 p-5 hover:bg-green-100 cursor-pointer"
            onClick={this.handleRouteClickEvent}
          >
            Route - {routeObject.RouteNo + " " + routeObject.RouteHeading}
          </li>
        </ul>
      );
    }
  }

  displayNextBusArrivalInfo() {}

  displayInvalidInputMessage() {
    return (
      <div className="mt-2 bg-red-200 text-center font-medium text-red-700 p-3 rounded-lg shadow">
        <h1>Error, invalid stop number</h1>
      </div>
    );
  }

  displayMessage() {
    return (
      <div className="mt-2 bg-gray-200 text-center font-medium text-gray-700 p-3 rounded-lg shadow">
        <h1>Nothing to Display Yet.</h1>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="w-1/2 bg-green-200 p-10 container text-center mx-auto rounded-lg shadow-lg text-lg font-bold text-green-700">
          <h2>Loading</h2>
        </div>
      );
    } else {
      return (
        <div className="container mx-auto border w-1/2 border-green-700 p-2 rounded-lg shadow-md">
          <div className="flex justify-center flex-col">
            <h1 className="font-bold text-gray-500 p-2">Enter stop Number</h1>
            <div className="relative mt-1">
              <input
                type="text"
                className="w-full pl-3 pr-10 py-2 border-2 border-gray-200
          rounded-xl hover:border-gray-300 focus:outline-none
          focus:border-blue-500 transition-colors"
                value={this.state.search}
                onChange={this.handleChangeEvent}
                placeholder="Search..."
              />
              <button
                onClick={this.handleClickEvent}
                className="block w-7 h-7 text-center text-xl leading-0 absolute
        top-2 right-2 text-gray-400 focus:outline-none
        hover:text-gray-900 transition-colors"
              >
                <FontAwesomeIcon icon={["fas", "search"]} />
              </button>
            </div>

            {this.displayRoutesforStop(
              this.state.items,
              this.state.loadRoutes,
              this.state.errorMessage
            )}
          </div>
        </div>
      );
    }
  }
}

export default RoutesList;
