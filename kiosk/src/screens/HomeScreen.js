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
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { NavigationService } from "../common";
export default ({ navigation }) => {
  const [busStationNo, setBusStationNo] = useState(null);
  const [busStationName, setBusStationName] = useState(null);
  const [items, setItemsArray] = useState([]);
  const { data, loading, refetch } = useQuery(BUS_STATION_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const originItems = !loading && data.KioskBusStationList.busStations;

  useEffect(() => {
    if (!loading) {
      let tempItems = [];

      originItems.map((rowData, index) => {
        tempItems.push({
          id: rowData.BUS_NODE_ID,
          name: rowData.BUSSTOP_NM,
        });
      });
      setItemsArray(tempItems);
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={false}
        />
        <KeyboardAvoidingView>
          <View style={styles.logoBox}>
            <Image
              style={styles.loginLogo}
              source={require("../../assets/logo.png")}
            />
            <Text
              style={{
                fontSize: 15,
                marginTop: -8,
                fontWeight: "bold",
                color: "#4b56f1",
              }}
            >
              버스 정류장용
            </Text>
          </View>
          <Fragment>
            <SearchableDropdown
              multi={true}
              containerStyle={{ padding: 15 }}
              onItemSelect={(item) => {
                setBusStationNo(item.id);
                setBusStationName(item.name);
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: "#222", fontSize: 16 }}
              itemsContainerStyle={{ maxHeight: 216 }}
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
                  backgroundColor: "#fff",
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            {busStationNo ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() =>
                  navigation.navigate("저상버스도착현황", {
                    busStationNo,
                    busStationName,
                  })
                }
              >
                <Text style={styles.submitButtonText}>검색</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={styles.submitButton}
                onPress={() =>
                  navigation.navigate("저상버스도착현황", {
                    busStationNo,
                    busStationName,
                  })
                }
              >
                <Text style={styles.submitButtonText}>검색</Text>
              </TouchableOpacity>
            )}
          </Fragment>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
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
    marginTop: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingTxt: {
    fontSize: 32,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
  },
  loginLogo: {
    width: 180,
    resizeMode: "contain",
  },
});
