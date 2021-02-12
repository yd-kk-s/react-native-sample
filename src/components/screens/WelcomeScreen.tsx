import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SLIDE_DATA = [
  { title: 'Step: 1', text: 'Add your trip memory', uri: require('../../../assets/welcome_screen1.jpg') },
  { title: 'Step: 2', text: 'All tips on the list', uri: require('../../../assets/welcome_screen2.jpg') },
  { title: 'Step: 3', text: 'See the trip detail!', uri: require('../../../assets/welcome_screen3.jpg') },
];

function WelcomeScreen({ navigation }: {navigation: any}) {
  const [isInitialized, setIsInitialized] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Debug用
    // AsyncStorage.removeItem('isInitialized');
    (async() => {
      try {
        const isInitializedString = await AsyncStorage.getItem('isInitialized');
        setIsLoading(false)
        if (isInitializedString === 'true') {
          setIsInitialized('true')
          navigation.navigate('Main');
        } else {
          setIsInitialized('false')
        }
      } catch(err) {
        console.log(err)
      }  
    })();
  },[])

  const onStartButtonPress = async () => {
    await AsyncStorage.setItem('isInitialized', 'true');
    navigation.navigate('Main');
  }

  function renderLastButton(index: any) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <Button
          style={{ padding: 10 }}
          buttonStyle={{ backgroundColor: 'deepskyblue' }}
          title="Let's get it started!"
          onPress={() => onStartButtonPress()}
        />
      );
    }
  }

  function renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View
          key={index}
          style={ styles.slideStyle }
        >
          <View style={ styles.containerStyle }>
            <Text style={ styles.textStyle }>{slide.title}</Text>
            <Text style={ styles.textStyle }>{slide.text}</Text>
          </View>

          <Image
            style={{ flex: 2 }}
            resizeMode="contain"
            source={slide.uri}
          />

          <View style={ styles.containerStyle }>
            {renderLastButton(index)}
            <Text style={ styles.textStyle }>{index + 1} / 3</Text>
          </View>
        </View>
      )
    })
  }

  if (isLoading) {
    return (
      <View style={styles.containerStyle}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      horizontal={true}
      pagingEnabled={true}
      style={{ flex: 1 }}
    >
      {renderSlides()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    backgroundColor: 'skyblue',
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    padding: 5
  },
  button: {
    padding: 10,
    backgroundColor: '#fff'
  }
})

export default WelcomeScreen;