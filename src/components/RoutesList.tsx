import React from "react";
import { RouteList, Routes } from "../interfaces/RouteList";
import axios from "axios";
import { NextBusInfo, RouteDirection, Trips } from "../interfaces/NextBusInfo";
import SearchInput from "./BusSearch/SearchInput";
import { EmptyMessage } from "./Messages/EmptyMessage";
import { InvalidInputMessage } from "./Messages/InvalidInputMessage";
import { Loading } from "./Alerts/Loading";
import { SearchContainer } from "./BusSearch/SearchContainer";
import * as api from "../API/API";
import { NoBusInfo } from "./Alerts/NoBusInfo";

// eslint-disable-next-line no-lone-blocks
{
  /* 
  Dear future me, please forgive me for wriring this piece of messy code.
  I'm just trying to learn React with TypeScript.
  Hope, you are doing great these days :)
*/
}

/**
 * TODO:
 * 1. Finish FetchNextArrivalData Function - done
 * 2. Implement Next Bus Arrival schedule for selected bus - done
 * 3. Improve UI
 * 4. Refactor code and separate all of the logic into separate file
 */

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
  gettingNextArrivalInfo: boolean;
  nextArrivalInfo: any;
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
      gettingNextArrivalInfo: false,
      nextArrivalInfo: {},
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);

    this.FetchStopData = this.FetchStopData.bind(this);
    this.FetchNextArrivalData = this.FetchNextArrivalData.bind(this);
  }

  componentDidMount() {
    // console.log(api.API.getAPI());
    this.setState({ isLoading: false });
  }

  /**
   * Fetch stop data of routes list
   */
  FetchStopData = async () => {
    this.setState({ isLoading: true });
    let apiObjectInfo = api.API.getAPI();
    //Axios GET Request
    const result = await axios({
      method: "GET",
      baseURL: apiObjectInfo.baseAPIUrl,
      url: `?appID=${apiObjectInfo.apiID}&apiKey=${apiObjectInfo.apiKey}&stopNo=${this.state.stop}&format=json`,
      timeout: 3000,
    });

    await this.setState({ items: result.data });
    await this.FetchNextArrivalData(this.state.stop, this.state.route);

    let flagMessage = api.API.checkForAPIResponseErrors(this.state.items);
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

  /**
   * Fetchs next arrival data
   * @param stop
   * @param route
   */
  async FetchNextArrivalData(stop: any, route: any) {
    let apiObjectInfo = api.API.getAPI();
    //Axios GET Request
    const result = await axios({
      method: "get",
      baseURL: apiObjectInfo.baseNextBusURL,
      url: `?appID=${apiObjectInfo.apiID}&apiKey=${apiObjectInfo.apiKey}&stopNo=${this.state.stop}&routeNo=${this.state.route}&format=json`,
    });
    await this.setState({ nextArrivalInfo: result.data });
  }

  async handleClickEvent(e: any) {
    e.preventDefault();
    await this.setState({ stop: this.state.search });
    this.FetchStopData();
  }

  handleChangeEvent(e: any) {
    e.preventDefault();
    this.setState({ search: e.target.value });
  }

  async handleKeyPressEvent(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      await this.setState({ stop: this.state.search });
      this.FetchStopData();
    }
  }

  /**
   * Handles validation
   * @returns - errorMessage
   */
  async handleValidation() {
    let searchField = this.state.search;
    if (typeof searchField !== undefined) {
      if (!searchField.match("^[0-9]{4}$")) {
        await this.setState({ errorMessage: true });
      }
    }
    return this.state.errorMessage;
  }

  /**
   * Displays routes for stop
   * @param items
   * @param loadRoutes
   * @param errorMessage
   * @returns
   */
  displayRoutesforStop(
    items: RouteList,
    nextTrip: NextBusInfo,
    loadRoutes: boolean,
    errorMessage: boolean
  ) {
    if (errorMessage) return <InvalidInputMessage />;
    if (!loadRoutes) return <EmptyMessage />;
    let nextTripsArray =
      nextTrip.GetNextTripsForStopResult.Route.RouteDirection;
    return (
      <>
        <h2 className="font-bold text-center p-3 uppercase">
          Stop Name: {items.GetRouteSummaryForStopResult.StopDescription}
        </h2>
        {this.rendeListOfRoutes(
          items.GetRouteSummaryForStopResult.Routes,
          nextTripsArray
        )}
      </>
    );
  }

  /**
   * Conditionaly renders array of Routes or plain Route object(happens when only 1 route available for a stop)
   * @param routes
   * @returns
   */
  rendeListOfRoutes(routes: Routes, RouteDirection: RouteDirection) {
    const routeObject: any = routes.Route;
    
    if (routes.Route != null && routes.Route instanceof Array) {
      return (
        <ul className="font-medium text-gray-500 text-center divide-y-2">
          {routes.Route.map((item) => (
            <li
              key={"#" + item.RouteNo + " - " + item.RouteHeading}
              className="hover:text-gray-900 p-5 hover:bg-green-100 cursor-pointer flex flex-col"
            >
              Route - {item.RouteNo + " " + item.RouteHeading}
              <span className="text-green-700 mr-2">Next Arrival in:</span>
              {!Array.isArray(RouteDirection) &&
              RouteDirection.Trips !== undefined &&
              item.RouteNo === RouteDirection.RouteNo
                ? RouteDirection.Trips.Trip.map((trip) => (
                    <span key={Math.random()}>
                      {trip.AdjustedScheduleTime}min,{" "}
                    </span>
                  ))
                : ""}
              {RouteDirection instanceof Array && RouteDirection !== undefined
                ? RouteDirection.map((route) => {
                    return item.RouteNo === route.RouteNo
                      ? this.renderNextTripsForArrayOfRoutes(route.Trips)
                      : "";
                  })
                : ""}
            </li>
          ))}
        </ul>
      );
    }

    if (!Array.isArray(routes.Route) && routes.Route !== null) {
      return (
        <ul className="font-medium text-gray-500 text-center divide-y-2">
          <li className="hover:text-gray-900 p-5 hover:bg-green-100 cursor-pointer">
            Route - {routeObject.RouteNo + " " + routeObject.RouteHeading}
          </li>
        </ul>
      );
    }
    return(
      <NoBusInfo/>
    )
  }

  renderNextTripsForArrayOfRoutes(trips: Trips) {
    let singleTrip: any = trips.Trip;
    if (!Array.isArray(trips.Trip)) {
      return <span>{singleTrip.AdjustedScheduleTime}min</span>;
    }
    if (Array.isArray(trips.Trip)) {
      // let sortedArrivigTime = trips.Trip.sort((a: any, b: any) => a - b);
      // console.log("SortedList:", sortedArrivigTime);
      return trips.Trip.map((trip: any, index: number) => (
        //  console.log(trip.AdjustedScheduleTime),
        // trip.AdjustedScheduleTime > trip.AdjustedScheduleTime[index - 1] ? (
        //   <span className="text-gray-500">{trip.AdjustedScheduleTime}min,</span>
        // ) : (
        //   <span className="text-green-500">
        //     {trip.AdjustedScheduleTime}min,
        //   </span>
        // )
        <span>{trip.AdjustedScheduleTime}min,</span>
      ));
    }
  }

  /**
   * Renders next bus arrival info
   * @param nextTrip
   * @returns
   */
  renderNextBusArrivalInfo(nextTrip: Trips) {
    let renderArray: boolean = false;
    let renderObject: boolean = false;
    const trip: any = nextTrip.Trip;
    if (nextTrip.Trip instanceof Array && nextTrip !== undefined)
      renderArray = true;
    if (!Array.isArray(nextTrip.Trip) && nextTrip !== undefined)
      renderObject = true;

    if (renderArray) {
      return (
        <span>
          {nextTrip.Trip.map((trip) => (
            <>{trip.AdjustedScheduleTime}</>
          ))}
        </span>
      );
    }

    if (renderObject) {
      return <span>{trip.AdjustedScheduleTime}</span>;
    }
  }

  render() {
    if (this.state.isLoading) return <Loading />;
    return (
      <SearchContainer
        displayRoutesforStop={this.displayRoutesforStop(
          this.state.items,
          this.state.nextArrivalInfo,
          this.state.loadRoutes,
          this.state.errorMessage
        )}
      >
        <SearchInput
          keyword={this.state.search}
          setKeyword={this.handleChangeEvent}
          setStop={this.handleClickEvent}
          handleEnterKey={this.handleKeyPressEvent}
        />
      </SearchContainer>
    );
  }
}

export default RoutesList;
