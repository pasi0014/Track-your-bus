export interface NextBusInfo {
    GetNextTripsForStopResult: GetNextTripsForStopResult;
}

export interface GetNextTripsForStopResult {
    StopNo:    string;
    StopLabel: string;
    Error:     string;
    Route:     Route;
}

export interface Route {
    RouteDirection: RouteDirection;
}

export interface RouteDirection {
    RouteNo:               string;
    RouteLabel:            string;
    Direction:             string;
    Error:                 string;
    RequestProcessingTime: string;
    Trips:                 Trips;
}

export interface Trips {
    Trip: Trip[];
}

export interface Trip {
    Longitude:            string;
    Latitude:             string;
    GPSSpeed:             string;
    TripDestination:      string;
    TripStartTime:        string;
    AdjustedScheduleTime: string;
    AdjustmentAge:        string;
    LastTripOfSchedule:   boolean;
    BusType:              string;
}
