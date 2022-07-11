import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import '../global';
export default function Announcement(props) {
  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',

            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {props.Title}
        </Text>
        <Text
          style={{
            fontSize: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {props.Time}
        </Text>
        <Text
          style={{paddingTop: 10, color: global.Dark ? '#bdbdbd' : 'black'}}>
          {props.Announcement}
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
