import { gql } from "apollo-boost";

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query KioskBusStationList {
    KioskBusStationList {
      busStations {
        BUSSTOP_NM
        BUS_NODE_ID
      }
      count
    }
  }
`;

// BusInfo
export const BUS_INFO_QUERY = gql`
  query KioskBusInfo($CAR_REG_NO: String!) {
    KioskBusInfo(CAR_REG_NO: $CAR_REG_NO) {
      BUS_TYPE
      CAR_REG_NO
    }
  }
`;
