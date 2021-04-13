export interface StopList {
    Query: Query;
    Gtfs:  Gtf[];
}

export interface Gtf {
    id:             string;
    stop_id:        string;
    stop_code:      string;
    stop_name:      string;
    stop_desc:      string;
    stop_lat:       string;
    stop_lon:       string;
    zone_id:        string;
    stop_url:       string;
    location_type:  string;
    parent_station: string;
}

export interface Query {
    table:  string;
    column: string;
    value:  string;
    format: string;
}
