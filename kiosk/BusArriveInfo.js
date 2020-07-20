import React from "react";
import Loading from "./Loading";

const API_KEY =
  "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const parseString = require("react-native-xml2js").parseString;

    fetch(
      `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=8001378`
    )
      .then((response) => response.text())
      .then((response) => {
        parseString(response, function (err, result) {
          const busArriveInfoArray = result.ServiceResult.msgBody;
          return busArriveInfoArray;
        });
      })
      .catch((err) => {
        console.log("fetch", err);
      });
  };
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
