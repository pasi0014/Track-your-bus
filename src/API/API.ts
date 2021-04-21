// import axios from "axios";
import { RouteList } from "../interfaces/RouteList";


interface APIObject {
  apiID?: string;
  apiKey?: string;
  proxy?: string;
  baseAPIUrl: string;
  baseNextBusURL: string;
}

export class API {
  public static printHello() {
    console.log("Hello from API");
  }

  public static getAPI(): APIObject {
    return this.initializeApiObject();
  }

  /**
   * Initializes api object
   * @returns
   */
  private static initializeApiObject() {
    const apiID = process.env.REACT_APP_API_APP_ID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const proxy = process.env.REACT_APP_PROXY_LINK;

    const baseAPIUrl = `${proxy}https://api.octranspo1.com/v2.0/GetRouteSummaryForStop`;
    const baseNextBusURL = `${proxy}https://api.octranspo1.com/v2.0/GetNextTripsForStop`;

    const apiObject: APIObject = {
      apiID: apiID,
      apiKey: apiKey,
      proxy: proxy,
      baseAPIUrl: baseAPIUrl,
      baseNextBusURL: baseNextBusURL,
    };
    return apiObject;
  }

  /**
   * Checks for API response errors
   * Reference: https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/dev-doc
   * @param items
   * @returns
   */
   public static checkForAPIResponseErrors(items: RouteList) {
    let responseMessage: string = "";
    if (items.GetRouteSummaryForStopResult.Error === "10") {
      return (responseMessage = "Invalid Stop Number");
    } else if (items.GetRouteSummaryForStopResult.Error === "2") {
      return (responseMessage = "Undable to query data source");
    } else {
      return responseMessage;
    }
  }
}
