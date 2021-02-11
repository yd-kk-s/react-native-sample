import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function ProfileScreen({ navigation }: {navigation: any}) {
  return(
    <View style={styles.container}>
      <Text>ProfileScreen!</Text>
      <Button
        title="Setting1"
        onPress={() => navigation.push('Setting1')}
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

export default ProfileScreen;