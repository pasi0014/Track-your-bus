export interface RouteList {
    GetRouteSummaryForStopResult: GetRouteSummaryForStopResult;
}

export interface GetRouteSummaryForStopResult {
    StopNo:          string;
    Error:           string;
    StopDescription: string;
    Routes:          Routes;
}

export interface Routes {
    Route: Route[];
}

export interface Route {
    RouteNo:      string;
    RouteHeading: string;
    Direction:    string;
    DirectionID:  number;
}
