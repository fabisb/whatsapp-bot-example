import * as React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  return (
    <View className='container h-full justify-center items-center'>
      <ImageBackground source={require('./assets/imgs/spider-miles.jpg')} className='h-full w-full'>
        <Text className='my-20 text-xl font-semibold text-red-500 border rounded-md bg-slate-50 p-2'> Spider-man: Across the spider-verse</Text>
h

      </ImageBackground>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
      >
        <Text >Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
}