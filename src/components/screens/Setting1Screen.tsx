import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Setting1Screen({ navigation }: {navigation: any}) {
  return(
    <View style={styles.container}>
      <Text>Setting1Screen!</Text>
      <Button
        title="Setting2"
        onPress={() => navigation.push('Setting2')}
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

export default Setting1Screen;