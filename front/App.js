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
  StatusBar,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { styles } from "./components/styles/safeArea";
import { useState, ChangeEvent, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

try {
  StatusBar.setHidden(true);
} catch (error) {
  console.log(error);
  console.log(StatusBar.currentHeight);
}

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  const [char, setChar] = useState("");
  const [monto, setMonto] = useState(0);
  const [visible, setVisible] = useState(false);
  const [aporte, setAporte] = useState([
    {
      name: "Fabian Silva",
      montoAporte: 100,
      color: generateRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Stephany Arambulo",
      montoAporte: 70,
      color: generateRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ]);
  /*
  const [dataAportes, setDataAportes] = useState(
    async () => await getData("aportas")
  );
  console.log("🚀 ~ file: App.js:55 ~ App ~ dataAportes:", dataAportes)
  */
  const showDialog = (seleccion) => {
    console.log(seleccion);
    setChar(seleccion);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  /*
  try {
    async () => {
      const aporteData = await getData("aportes");
      console.log(aporteData);
    };
  } catch (error) {
    console.log(error);
  }
  */

  const storeData = async (name, value) => {
    if (name == "" || value == "") {
      console.log(name);
      console.log(value);
      return Alert.alert(
        "Ha ocurrido un error",
        "Occurio un error en los parametros enviados"
      );
    }
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const getData = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  const handleBtn = async () => {
    try {
      if (isNaN(monto) || char == "") {
        console.log(monto);
        console.log(char);
        return Alert.alert(
          "Ha ocurrido un error",
          "Occurio un error en la seleccion del monto o del empleado"
        );
      }
      //...//
      console.log("🚀 ~ file: App.js:131 ~ handleBtn ~ char:", char);
      console.log("🚀 ~ file: App.js:133 ~ handleBtn ~ monto:", monto);
      const aporteFind = aporte.find((obj, i) => {
        console.log("valor de la lista recorrido actualmente: ", obj);
        if (obj.name == char) {
          console.log("valor de la lista que coindice con el nombre: ", obj);
          aporte[i].montoAporte += monto;
          return true;
        }
      });
      console.log(
        "🚀 ~ file: App.js:140 ~ aporteFind ~ aporteFind:",
        aporteFind
      );
      if (!aporteFind) {
        aporte.push({
          name: char,
          montoAporte: monto,
          color: generateRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }
      //console.log("🚀 ~ file: App.js:140 ~ handleBtn ~ aporte:", aporte);
      /*
      await storeData("aportes", aporte);
      console.log(
        "🚀 ~ file: App.js:103 ~ handleBtn ~ getData('aportes'):",
        await getData("aportes")
      );
      */
      Alert.alert(
        "Aportacion exitosa",
        "Su aportacion ya fue realizada y se guardará en los registros de la empresa"
      );
      setChar("");
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          color="blue"
          title="App de empleados de Polar"
          onPress={() =>
            Alert.alert(
              "Sorteo",
              "Registre su aporte al sorteo que se realiza cada año. Seleccione su nombre y la cantidad que aporta."
            )
          }
        ></Button>
        <Text className="text-xl px-1">Empleado que desea aportar</Text>
        <View className="bg-slate-300 mx-1 my-1 border-2">
          <Picker
            selectedValue={char}
            onValueChange={(currChar) => showDialog(currChar)}
          >
            <Picker.Item label="Seleccione a un empleado" />
            <Picker.Item label="Fabian" value="Fabian Silva" />
            <Picker.Item label="Stephany" value="Stephany Arambulo" />
            <Picker.Item label="Hugo" value="Hugo Niebles" />
            <Picker.Item label="Yenny" value="Yenny Quiñonez" />
            <Picker.Item label="Elvis" value="Elvis Fuenmayor" />
          </Picker>
        </View>
        <Text className={"text-lg px-2"}>
          Distribucion de contribucion de empleados
        </Text>

        <PieChart
          data={aporte}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"montoAporte"}
          backgroundColor={"transparent"}
          //paddingLeft={"1"}
          //absolute
          avoidFalseZero
        />
        <Text
          onPress={() => Alert.alert("Aplicaciones Moviles C-913 :)")}
          className=" text-xl font-semibold mb-5 border rounded-md bg-slate-50 p-2"
        >
          Fabian Silva V-28.146.771
        </Text>
      </ScrollView>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Aportacion al sorteo</Dialog.Title>
        <Dialog.Description>
          Cuanta cantidad de Dolares desea aportar {char} al sorteo
        </Dialog.Description>
        <Dialog.Input
          inputMode="numeric"
          id="monto-input"
          autoFocus={true}
          onChangeText={(e) => setMonto(Number(e))}
          placeholder="Monto a aportar"
        ></Dialog.Input>
        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Aportar" onPress={handleBtn} />
      </Dialog.Container>
    </SafeAreaView>
  );
}

/*
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
*/
