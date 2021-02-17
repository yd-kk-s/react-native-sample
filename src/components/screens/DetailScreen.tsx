import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { ENVs } from '../../consts/envs'

import { Review } from '../../domains/Review'

import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';

const MAP_ZOOM_RATE = 15.0;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  navigation: {},
  route: {
    key: string,
    name: string,
    params: {
      selectedReview: Review
    }
  }
}

function DetailScreen(props: Props) {
  // console.log(props)
  const review = props.route.params.selectedReview
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState({ latitude: 35.7090,  //緯度
                                                       longitude: 139.7320, //経度
                                                       latitudeDelta: MAP_ZOOM_RATE,
                                                       longitudeDelta: MAP_ZOOM_RATE * 2.25
                                                     });
  const [modalVisible, setModalVisible] = useState(false);   
  const [pickUpImageURI, setPickUpImageURI] = useState('');                                     

  useEffect(() => {
    (async() => {
      try {
        Geocoder.init(ENVs.geocodingAPI);
        const result = await Geocoder.from(review.country);
        const location = result.results[0].geometry.location;

        setInitialRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: MAP_ZOOM_RATE,
          longitudeDelta: MAP_ZOOM_RATE * 2.25
        })
        setIsMapLoading(false)

      } catch(err) {
        console.log(err)
      }  
    })();
  },[])

  if (isMapLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return(
    <View style={{ flex: 1 }}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={false}
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}> 
          <TouchableOpacity
            onPress={() => setModalVisible(false) }
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH }}
              source={{ uri: pickUpImageURI}}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 30, padding: 5 }}>{review.country}</Text>
          <Text style={{ padding: 5 }}>{review.dateFrom} ~ {review.dateTo}</Text>
        </View>

        <MapView
          style={{ height: SCREEN_WIDTH }}
          scrollEnabled={false}
          initialRegion={initialRegion}
        />

        <View style={{ flexDirection: 'row' }}>
          {review.imageURIs.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setModalVisible(true)
                  setPickUpImageURI(image)
                }}
              >
                <Image
                  style={{ height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 }}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            );
          })}
          {(() => {
            if (review.imageURIs.length < 3) {
              return (
                <Image
                  style={{ height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 }}
                  source={require('../../../assets/add_image_placeholder.png')}
                />
              )
            }
          })()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;