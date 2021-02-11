import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Setting2Screen() {
  return(
    <View style={styles.container}>
      <Text>Setting2Screen!</Text>
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

export default Setting2Screen;