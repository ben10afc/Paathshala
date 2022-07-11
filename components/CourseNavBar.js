import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import '../global';
import {useNavigation} from '@react-navigation/native';

export default function CourseNavBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Course')}>
        <View style={styles.navbarIcon}>
          <Icon
            name="book"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            Assignments
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NotificationsTab');
        }}>
        <View style={styles.navbarIcon}>
          <Feather
            name="bell"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            Notifications
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
        <View style={styles.navbarIcon}>
          <Foundation
            name="page"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            Notes
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    alignSelf: 'stretch',
    height: 65,
    width: '100%',
    flexDirection: 'row', // row
    justifyContent: 'space-between', // center, space-around
    padding: 30,
    elevation: 5,
    alignItems: 'center',
    backgroundColor: global.Dark ? '#202020' : 'white',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    borderTopWidth: 0.5,
    borderTopColor: global.Dark ? '#545454' : 'lightgray',
  },
  navbarIcon: {
    width: 80,
    height: 35,
    alignItems: 'center',
  },
});
