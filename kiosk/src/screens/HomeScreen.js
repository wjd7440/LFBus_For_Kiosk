import React, { useState, Component, Fragment } from "react";
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
  var items = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];
  // this.state = {
  //   selectedItems: [
  //     {
  //       id: 7,
  //       name: "Go",
  //     },
  //     {
  //       id: 8,
  //       name: "Swift",
  //     },
  //   ],
  // };
  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);
  const blockSize = 5;
  const first = 5;
  const skip = first * (page - 1);
  // const [BusStation, setBusStation] = useState(null);

  const { data, loading, refetch } = useQuery(BUS_STATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      keyword: keyword,
      skip,
      first,
    },
  });

  return (
    <Fragment>
      <SearchableDropdown
        multi={true}
        // selectedItems={this.state.selectedItems}
        // onItemSelect={(item) => {
        //   const items = this.state.selectedItems;
        //   items.push(item);
        //   this.setState({ selectedItems: items });
        // }}
        containerStyle={{ padding: 5 }}
        // onRemoveItem={(item, index) => {
        //   const items = this.state.selectedItems.filter(
        //     (sitem) => sitem.id !== item.id
        //   );
        //   this.setState({ selectedItems: items });
        // }}
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
          onTextChange: (text) => alert(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </Fragment>
  );
};

// class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItems: [
//         {
//           id: 7,
//           name: "Go",
//         },
//         {
//           id: 8,
//           name: "Swift",
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" />
//         <View>
//           <Text style={{ fontSize: 25 }}>버스정류장 선택페이지</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() =>
//             NavigationService.navigate("저상버스도착현황", {
//               screen: "저상버스도착현황",
//               info: "information",
//             })
//           }
//           style={{
//             justifyContent: "flex-end",
//             backgroundColor: "rgb(87,174,198)",
//             padding: 20,
//             marginTop: 20,
//             borderRadius: 30,
//           }}
//         >
//           <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
//             다음
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <Fragment>
//         <SearchableDropdown
//           multi={true}
//           selectedItems={this.state.selectedItems}
//           onItemSelect={(item) => {
//             const items = this.state.selectedItems;
//             items.push(item);
//             this.setState({ selectedItems: items });
//           }}
//           containerStyle={{ padding: 5 }}
//           onRemoveItem={(item, index) => {
//             const items = this.state.selectedItems.filter(
//               (sitem) => sitem.id !== item.id
//             );
//             this.setState({ selectedItems: items });
//           }}
//           itemStyle={{
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: "#ddd",
//             borderColor: "#bbb",
//             borderWidth: 1,
//             borderRadius: 5,
//           }}
//           itemTextStyle={{ color: "#222" }}
//           itemsContainerStyle={{ maxHeight: 140 }}
//           items={items}
//           defaultIndex={0}
//           chip={true}
//           resetValue={false}
//           textInputProps={{
//             placeholder: "placeholder",
//             underlineColorAndroid: "transparent",
//             style: {
//               padding: 12,
//               borderWidth: 1,
//               borderColor: "#ccc",
//               borderRadius: 5,
//             },
//             onTextChange: (text) => alert(text),
//           }}
//           listProps={{
//             nestedScrollEnabled: true,
//           }}
//         />
//       </Fragment>
//     );
//   }
// }

// export default HomeScreen;
