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
  
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { styles } from "./components/styles/safeArea";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
("@react-native-picker/picker");

export default function App() {
  const [char, setChar] = useState("Miles");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          color="red"
          title="Spider-man: Across the spider-verse"
        ></Button>
        <ImageBackground
          source={require("./assets/imgs/fondoPoster.jpg")}
          className="justify-center items-center h-full w-full "
        >
          <View className=" container justify-center items-center">
            <Image source={require("./assets/imgs/sp-title.png")}></Image>
          </View>

          <View className=" container justify-center items-center">
            <ScrollView className="gap-2 my-1" horizontal={true}>
              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL(
                    "https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)"
                  );

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL(
                      "https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)"
                    );
                  } else {
                    Alert.alert(
                      `Don't know how to open this URL: ${"https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)"}`
                    );
                  }
                }}
                className=" bg-white m-1 rounded-xl max-w-xs"
                style={[
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  },
                ]}
              >
                <Image
                  source={require("./assets/imgs/milesMorales.webp")}
                  className="w-full h-64 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-6">
                  <Text className="text-slate-900 text-lg font-bold">
                    Miles Morales (Tierra-1610B)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL(
                    "https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)"
                  );

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL(
                      "https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)"
                    );
                  } else {
                    Alert.alert(
                      `Don't know how to open this URL: ${"https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)"}`
                    );
                  }
                }}
                className=" bg-white m-1 rounded-xl max-w-xs"
                style={[
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  },
                ]}
              >
                <Image
                  source={require("./assets/imgs/spider-gwen.jpg")}
                  className="w-full h-64 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-6">
                  <Text className="text-slate-900 text-lg font-bold">
                    Gwen Stacy (Tierra-65B)
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL(
                    "https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara"
                  );

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL(
                      "https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara"
                    );
                  } else {
                    Alert.alert(
                      `Don't know how to open this URL: ${"https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara"}`
                    );
                  }
                }}
                className=" bg-white m-1 rounded-xl  max-w-xs"
                style={[
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  },
                ]}
              >
                <Image
                  source={require("./assets/imgs/miguel-spider-man-2099.webp")}
                  className="w-full h-64 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-6">
                  <Text className="text-slate-900 text-lg font-bold">
                    Miguel O'hara (Tierra-928B)
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <Text className="text-lg text-gray-500 ">ENCUESTA</Text>
            <Text className="text-base text-gray-500">¿Cual es tu personaje favorito?</Text>
            <View className="my-1 w-3/5">
              <View className="bg-slate-300 border-2 border-red-600 rounded-md">
                <Picker
                  selectedValue={char}
                  onValueChange={(currChar) => setChar(currChar)}
                >
                  <Picker.Item label="Miles" value="Miles Morales" />
                  <Picker.Item label="Gwen" value="Gwen Stacy" />
                  <Picker.Item label="Miguel" value="Miguel O'hara" />
                </Picker>
              </View>
              <View>
                <Text className="text-base my-1">Seleccionado: {char}</Text>
              </View>
              <Input placeholder="Opiniones de la pelicula"></Input>
              <Button
                title="Enviar Encuesta"
                loading={false}
                loadingProps={{ size: "small", color: "white" }}
                buttonStyle={{
                  backgroundColor: "rgb(255, 170, 170)",
                  borderRadius: 5,
                }}
                titleStyle={{ fontWeight: "bold", fontSize: 23 }}
                containerStyle={{
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                }}
                onPress={() =>
                  Alert.alert(
                    "Encuesta enviada",
                    "(En verdad no se envio nada porque no hay un servidor ni una base de datos pero esta bien como simulacion jaja)"
                  )
                }
              />
            </View>
            <Text
              onPress={() => Alert.alert("Aplicaciones Moviles C-913 :)")}
              className=" text-xl font-semibold mb-5 border rounded-md bg-slate-50 p-2"
            >
              Fabian Silva V-28.146.771
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
