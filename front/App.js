import {
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { styles } from "./components/styles/safeArea";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
("@react-native-picker/picker");
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { chartConfig } from "./components/styles/Chart/chartConfig";
import { color } from "@rneui/base";

export default function App() {
  const screenWidth = Dimensions.get("window").width;

  const [char, setChar] = useState("Miles");
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          color="red"
          title="Spider-man: Across the spider-verse"
        ></Button>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"5"}
          //absolute
        />
      </ScrollView>
    </SafeAreaView>
  );
}
