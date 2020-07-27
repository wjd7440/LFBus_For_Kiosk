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
  const [busStationNo, setBusStationNo] = useState(null);
  const { data, loading, refetch } = useQuery(BUS_STATION_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const items = !loading && data.KioskBusStationList.busStations;

  return (
    <Fragment>
      <SearchableDropdown
        multi={true}
        containerStyle={{ padding: 5 }}
        onItemSelect={(item) => {
          setBusStationNo(item.busStationNo);
        }}
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
          placeholder: "버스정류장을 검색해주세요.",
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
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() =>
          navigation.navigate("저상버스도착현황", { busStationNo })
        }
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});
