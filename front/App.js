import * as React from 'react';
import { ImageBackground, Text, View, Image, ScrollView, SafeAreaView, Pressable, TouchableOpacity, Alert, Button, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './components/styles/safeArea';
import PagerView from 'react-native-pager-view';



export default function App() {

  function press(ev) {

    console.log(nombreRef.current.style)
  }
  const nombreRef = React.useRef(null);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Button color='red' title="Spider-man: Across the spider-verse" > </Button>
        <ImageBackground source={require('./assets/imgs/fondoPoster.jpg')} className='justify-center items-center h-full w-full '>

          <View className=' container justify-center items-center'>
            <Image source={require('./assets/imgs/sp-title.png')}></Image>
          </View>

          <View className=' container justify-center items-center'>

            <ScrollView className='gap-2 my-1' horizontal={true}>

              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL('https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)');

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL('https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)');
                  } else {
                    Alert.alert(`Don't know how to open this URL: ${'https://intothespiderverse.fandom.com/wiki/Miles_Morales_(Earth-1610)'}`);
                  }
                }}
                className=' bg-white m-1 rounded-xl max-w-xs'
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
                  className='w-full h-64 rounded-t-xl'
                  resizeMode="cover"
                />
                <View className='p-6'>
                  <Text className='text-slate-900 text-lg font-bold'>
                    Miles Morales (Tierra-1610B)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL('https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)');

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL('https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)');
                  } else {
                    Alert.alert(`Don't know how to open this URL: ${'https://intothespiderverse.fandom.com/wiki/Gwen_Stacy_(Earth-65)'}`);
                  }
                }}

                className=' bg-white m-1 rounded-xl max-w-xs'
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
                  className='w-full h-64 rounded-t-xl'
                  resizeMode="cover"
                />
                <View className='p-6'>
                  <Text className='text-slate-900 text-lg font-bold'>
                    Gwen Stacy (Tierra-65B)
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  // Checking if the link is supported for links with custom URL scheme.
                  const supported = await Linking.canOpenURL('https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara');

                  if (supported) {
                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                    // by some browser in the mobile
                    await Linking.openURL('https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara');
                  } else {
                    Alert.alert(`Don't know how to open this URL: ${'https://intothespiderverse.fandom.com/wiki/Miguel_O%27Hara'}`);
                  }
                }}

                className=' bg-white m-1 rounded-xl  max-w-xs'
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
                  className='w-full h-64 rounded-t-xl'
                  resizeMode="cover"
                />
                <View className='p-6'>
                  <Text className='text-slate-900 text-lg font-bold'>
                    Miguel O'hara (Tierra-928B)
                  </Text>
                </View>
              </TouchableOpacity>

            </ScrollView>
            <Text onPress={() => Alert.alert('Aplicaciones Moviles C-913 :)')} className=' text-xl font-semibold mb-5 border rounded-md bg-slate-50 p-2'> Fabian Silva V-28.146.771</Text>


          </View>
        </ImageBackground>

      </ScrollView>

    </SafeAreaView >
  );
};


