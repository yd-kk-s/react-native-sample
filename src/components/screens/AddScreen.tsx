import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

function AddScreen({ navigation }: {navigation: any}) {
  return(
    <View style={styles.container}>
      <Text>AddScreen!</Text>
      <Icon
        name='close'
        onPress={() => navigation.navigate('Home')} 
      />
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

export default AddScreen;