import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import '../global';
import {useNavigation} from '@react-navigation/native';
export default function TableRow(props) {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={() => {
        if (parseInt(props.data[0])) {
          global.courseName = props.data[1];
          navigation.navigate('CourseReport');
        }
      }}>
      <View
        style={{
          flex: 0.075,
          alignItems: 'center',
          paddingLeft: 10,
          borderBottomWidth: 0.25,
          borderBottomColor: 'gray',
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'left',
                padding: 5,
              }}>
              {props.data[0]}
            </Text>
          </View>
          <View
            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'left',
                padding: 5,
              }}>
              {props.data[1]}
            </Text>
          </View>
          <View
            style={{flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'left',
                padding: 5,
              }}>
              {props.data[2]}
            </Text>
          </View>
          <View
            style={{
              flex: 0.75,
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'left',
                padding: 5,
              }}>
              {props.data[3]}
            </Text>
          </View>
          <View
            style={{flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'left',
                padding: 5,
              }}>
              {props.data[4]}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
