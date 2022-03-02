import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY } from "../Queries";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ({
  busExist,
  setBusExist,
  CAR_REG_NO,
  ROUTE_NO,
  STATUS_POS,
  EXTIME_MIN,
  DESTINATION,
  ROUTE_TP,
  STOP_NAME,
}) => {
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  if (loading) {
    return null;
  } else {
    if (!busExist && data.KioskBusInfo) {
      setBusExist(true);
    }

    console.log(data);

    if (data.KioskBusInfo) {
      return (
        <View style={{ ...styles.container }}>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cell1]}>
              {ROUTE_TP == 1 && (
                <Image
                  style={{ ...styles.busIcon, resizeMode: "contain" }}
                  source={require("../../assets/bus_red.png")}
                />
              )}
              {ROUTE_TP == 2 && (
                <Image
                  style={{ ...styles.busIcon, resizeMode: "contain" }}
                  source={require("../../assets/bus_blue.png")}
                />
              )}
              {ROUTE_TP == 3 && (
                <Image
                  style={{ ...styles.busIcon, resizeMode: "contain" }}
                  source={require("../../assets/bus_green.png")}
                />
              )}

              <Text style={styles.cellFont} numberOfLines={1}>
                {ROUTE_NO}
              </Text>
            </View>
            <View style={[styles.cell, styles.cell2]}>
              <Text
                style={{
                  ...styles.cellFont,
                }}
                numberOfLines={2}
              >
                {DESTINATION}
              </Text>
            </View>
            <View style={[styles.cell, styles.cell3]}>
              <LinearGradient
                style={styles.numberBox}
                colors={["#00427E", "#002548"]}
              >
                <Text
                  style={{ ...styles.cellFont, color: "#fff" }}
                  numberOfLines={1}
                >
                  {EXTIME_MIN}
                </Text>
              </LinearGradient>
            </View>
            {STATUS_POS > 0 ? (
              <View style={[styles.cell, styles.cell4]}>
                <Text style={styles.cellFont} numberOfLines={1}>
                  {STATUS_POS} 정류장 전 {STOP_NAME}
                </Text>
              </View>
            ) : (
              <View style={[styles.cell, styles.cell4]}>
                <Text style={styles.redFont} numberOfLines={1}>
                  진입중
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
};

const cell1 = "20%";
const cell2 = "25%";
const cell3 = "20%";
const cell4 = "35%";

const basicDimensions = {
  height: 1115,
  width: 1965.4,
};
const windowWidth = (
  Dimensions.get("screen").width *
  (1 / basicDimensions.width)
).toFixed(2);
const windowHeight = (
  Dimensions.get("screen").height *
  (1 / basicDimensions.height)
).toFixed(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    padding: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#ddd",
  },
  cell1: {
    width: cell1,
    borderLeftWidth: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cell2: {
    width: cell2,
  },
  cell3: {
    width: cell3,
  },
  cell4: {
    width: cell4,
    alignItems: "baseline",
  },
  cellFont: {
    fontSize: windowWidth > 768 ? 30 : 48,
    fontWeight: "bold",
    color: "#111",
  },
  numberBox: {
    width: 120,
    height: 110,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  busIcon: {
    width: windowWidth > 768 ? 30 : 48,
    height: windowWidth > 768 ? 30 : 48,
  },
  redFont: {
    fontSize: windowWidth > 768 ? 30 : 48,
    fontWeight: "bold",
    color: "red",
  },
});
