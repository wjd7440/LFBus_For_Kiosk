import { gql } from "apollo-boost";

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query KioskBusStationList {
    KioskBusStationList {
      busStations {
        id
        name
        busStationNo
      }
      count
    }
  }
`;
