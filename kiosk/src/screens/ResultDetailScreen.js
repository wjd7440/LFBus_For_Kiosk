import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY } from "../Queries";
import { LinearGradient } from "expo-linear-gradient";

export default ({
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

  if (loading) {
    return null;
  } else {
    if (data.KioskBusInfo) {
      return (
        <View style={{ ...styles.container }}>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cell1]}>
              {ROUTE_TP == 1 && (
                <Image
                  style={styles.busIcon}
                  source={require("../../assets/bus_red.png")}
                />
              )}
              {ROUTE_TP == 2 && (
                <Image
                  style={styles.busIcon}
                  source={require("../../assets/bus_blue.png")}
                />
              )}
              {ROUTE_TP == 3 && (
                <Image
                  style={styles.busIcon}
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
                  lineHeight: 54 * 0.95,
                  paddingTop: 20,
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
                  {STATUS_POS}정류장 전 {STOP_NAME}
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
    fontSize: 54,
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
    width: 52,
    height: 52,
  },
  redFont: {
    fontSize: 54,
    fontWeight: "bold",
    color: "red",
  },
});
