import { gql } from "apollo-boost";

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query KioskBusStationList($keyword: String) {
    KioskBusStationList(keyword: $keyword, orderBy: "id_DESC") {
      busStations {
        id
        name
        busStationNo
      }
      count
    }
  }
`;
