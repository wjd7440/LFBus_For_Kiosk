import React, { useState, useEffect, Component, Fragment } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { BUS_STATION_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationService } from "../common";

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(BUS_STATION_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const items = !loading && data.KioskBusStationList.busStations;

  loading ? console.log("로딩중") : console.log(data.KioskBusStationList.count);

  return (
    <Fragment>
      <SearchableDropdown
        multi={true}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={items}
        defaultIndex={0}
        chip={true}
        resetValue={false}
        textInputProps={{
          placeholder: "placeholder",
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </Fragment>
  );
};
