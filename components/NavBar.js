import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import '../global';
import {useNavigation} from '@react-navigation/native';
export default function NavBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.navbarIcon}>
          <Ionicons
            name="home"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            My Paathshala
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AnnouncementsTab')}>
        <View style={styles.navbarIcon}>
          <Feather
            name="bell"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            Announcements
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Report')}>
        <View style={{width: 80, height: 32, alignItems: 'center'}}>
          <Foundation
            name="page"
            size={25}
            color={global.Dark ? '#D4D4D4' : 'black'}
          />
          <Text
            style={{fontSize: 10, color: global.Dark ? '#D4D4D4' : 'black'}}>
            Report Card
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
