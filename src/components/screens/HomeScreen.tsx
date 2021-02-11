import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function HomeScreen({ navigation }: {navigation: any}) {
  return(
    <View style={styles.container}>
      <Text>HomeScreen!</Text>
      <Button
        title="Detail"
        onPress={() => navigation.push('Detail')}
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

export default HomeScreen;