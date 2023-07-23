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
import { useState, ChangeEvent } from "react";
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

try {
  StatusBar.setHidden(true);
} catch (error) {
  console.log(error);
  console.log(StatusBar.currentHeight);
}

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  const [char, setChar] = useState("");
  const [monto, setMonto] = useState("");
  const [visible, setVisible] = useState(false);
  const [aporte, setAporte] = useState([]);
  const showDialog = (seleccion) => {
    console.log(seleccion);
    setChar(seleccion);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleBtn = () => {
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
      console.log(monto);
      console.log(char);
      aporte.push({
        name: char,
        aporteMonto: monto,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
      console.log(aporte);
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
          color="blue"
          title="App de empleados de Polar"
          onPress={() =>
            Alert.alert(
              "Sorteo",
              "Registre su aporte al sorteo que se realiza cada año. Seleccione su nombre y la cantidad que aporta."
            )
          }
        ></Button>
        <Text className="text-xl">Empleado que desea aportar</Text>
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
        <PieChart
          data={aporte}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"aporteMonto"}
          backgroundColor={"transparent"}
          paddingLeft={"1"}
          absolute
  
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
          onChangeText={(e) => setMonto(e)}
          placeholder="Monto a aportar"
        ></Dialog.Input>
        <Dialog.Button label="Cancelar" onPress={handleCancel} />
        <Dialog.Button label="Aportar" onPress={handleBtn} />
      </Dialog.Container>
    </SafeAreaView>
  );
  //Alert.prompt()
}

/*

      <View style={styles.dialog}>
        <Button title="Show dialog" onPress={showDialog} />
        
      </View>
      
*/
