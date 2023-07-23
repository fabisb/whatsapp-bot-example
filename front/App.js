import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import { Button } from "@rneui/themed";
import { styles } from "./components/styles/safeArea";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { PieChart } from "react-native-chart-kit";
import { chartConfig } from "./components/styles/Chart/chartConfig";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

try {
  StatusBar.setHidden(true);
} catch (error) {
  console.log(error);
  console.log(StatusBar.currentHeight);
}

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  const [selectedPrinter, setSelectedPrinter] = useState();

  const [char, setChar] = useState("");
  const [monto, setMonto] = useState(0);
  const [celdas, setCeldas] = useState([]);
  const [ultimoGanador, setUltimoGanador] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const getdata = await getData("aportes");
      if (getdata) {
        setDatos(getdata);
        setAporte(getdata);
      }
      const ganadorData = await getData("ganador");
      if (ganadorData) {
        console.log(
          "🚀 ~ file: App.js:47 ~ fetchData ~ ganadorData:",
          ganadorData
        );
        setUltimoGanador(ganadorData);
      }
    }
    fetchData();
  }, []);

  const agregarCelda = (nombre, monto) => {
    const fecha = new Date().toLocaleString();
    console.log("🚀 ~ file: App.js:175 ~ agregarCelda ~ fecha:", fecha);
    celdas.push(`
    <tr>
    <td>${nombre}</td>
    <td>${fecha}</td>
    <td>${monto}</td>
  </tr>
  `);
    console.log("🚀 ~ file: App.js:165 ~ agregarCelda ~ celdas:", celdas);
  };
  const [visible, setVisible] = useState(false);
  const [aporte, setAporte] = useState([]);
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

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    let cadenaCeldas = "";
    let totalMonto = 0;
    celdas.forEach((celda) => (cadenaCeldas += celda));
    aporte.forEach((montoaporte) => (totalMonto += montoaporte.montoAporte));
    console.log(
      "🚀 ~ file: App.js:221 ~ printToFile ~ cadenaCeldas:",
      cadenaCeldas
    );
    if (cadenaCeldas === "") {
      return Alert.alert(
        "No se han encontrado contribuciones",
        "Ingrese una contribucion e intente de nuevo"
      );
    }
    const htmlApp = `
    <html>
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      />
      <style>
        html,
        body {
          height: 100%;
        }
  
        body {
          margin: 0;
          background: linear-gradient(45deg, #49a09d, #5f2c82);
          font-family: sans-serif;
        }
  
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
  
        table {
          border-collapse: collapse;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
  
        th,
        td {
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
  
        th {
          text-align: left;
        }
  
        thead {
          th {
            background-color: #55608f;
          }
        }
  
        tbody {
          tr {
            &:hover {
              background-color: rgba(255, 255, 255, 0.3);
            }
          }
          td {
            position: relative;
            &:hover {
              &:before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: -9999px;
                bottom: -9999px;
                background-color: rgba(255, 255, 255, 0.2);
                z-index: -1;
              }
            }
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>REGISTRO DE APORTE</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Cantidad a aportar</th>
            </tr>
          </thead>
          <tbody>
          ${cadenaCeldas}
          </tbody>
          <tfoot>
            <td>TOTAL APORTACION:</td>
            <td></td>
            <td>
              <p
                style="font-weight: bolder !important; text-decoration: underline"
              >
              ${totalMonto}
              </p>
            </td>
          </tfoot>
        </table>
      </div>
    </body>
  </html>
    `;
    console.log("htmlApp: ", htmlApp);
    const { uri } = await Print.printToFileAsync({ html: htmlApp });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

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

  const seleccionarGanador = async () => {
    if (aporte.length == 0) {
      return Alert.alert(
        "No se han encontrado participantes",
        "No es posible seleccionar un ganador"
      );
    }
    console.log("🚀 ~ file: App.js:253 ~ seleccionarGanador ~ datos:", datos);
    const maxVal = aporte.length;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    console.log(
      "🚀 ~ file: App.js:253 ~ seleccionarGanador ~ randomNumber:",
      randomNumber
    );
    console.log(aporte[randomNumber]);
    Alert.alert(
      "GANADOR SELECCIONADO",
      `El ganador del sorteo de los empleados de la empresa Polar es: ${aporte[randomNumber].name}`
    );
    setAporte([]);
    setCeldas([]);
    setUltimoGanador(aporte[randomNumber].name);
    storeData("ganador", aporte[randomNumber].name);
    removeValue("aportes");
  };
  const removeValue = async (value) => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      // remove error
      console.log(e);
    }

    console.log(value, "Borrado.");
  };
  const handleBtn = async () => {
    try {
      if (isNaN(monto) || char == "" || monto == 0) {
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

      await storeData("aportes", aporte);

      agregarCelda(char, monto);
      Alert.alert(
        "Aportacion exitosa",
        "Su aportacion ya fue realizada y se guardará en los registros de la empresa"
      );
      setChar("");
      setMonto(0);
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
        {ultimoGanador !== "" && (
          <Text className="text-2xl px-1">Ultimo ganador: {ultimoGanador}</Text>
        )}
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
        <View className={"m-1"}>
          <Button color={"red"} title="Generar PDF" onPress={printToFile} />
          {Platform.OS === "ios" && (
            <>
              <View style={styles.spacer} />
              <Button title="Select printer" onPress={selectPrinter} />
              <View style={styles.spacer} />
              {selectedPrinter ? (
                <Text
                  style={styles.printer}
                >{`Selected printer: ${selectedPrinter.name}`}</Text>
              ) : undefined}
            </>
          )}
        </View>
        <View className={"m-1"}>
          <Button
            color={"blue"}
            title="Seleccionar ganador"
            onPress={seleccionarGanador}
          />
        </View>
        <Text
          onPress={() => {
            console.log(datos);
            Alert.alert("Aplicaciones Moviles C-913 :)");
          }}
          className=" text-xl font-semibold mb-5 m-1 border rounded-md bg-slate-50 p-2"
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
