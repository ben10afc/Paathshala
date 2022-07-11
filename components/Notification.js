import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import '../global';
export default function Notification(props) {
  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            paddingBottom: 10,
            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {props.Time}
        </Text>
        <Text
          style={{paddingTop: 10, color: global.Dark ? '#bdbdbd' : 'black'}}>
          {props.descriptions}
          {'\n'}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    width: '100%',
    margin: 10,
    marginBottom: 5,
    alignSelf: 'stretch',
  },
  notification: {
    width: '95%',
    padding: 20,
    backgroundColor: global.Dark ? '#333333' : 'white',
    borderRadius: 7,
    borderColor: global.Dark ? '#545454' : 'lightgray',
    elevation: 1,
  },
});
