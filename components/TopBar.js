import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import '../global';

import {useNavigation} from '@react-navigation/native';

export default function TopBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Icon
          name="ios-settings"
          size={25}
          color={global.Dark ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {'   '}paathshala{'   '}
      </Text>
      <View style={{width: 20}} />
    </View>
  );
}
const styles = StyleSheet.create({
  topBar: {
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: global.Dark ? '#202020' : 'white',
    elevation: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#545454',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FD8D08',
  },

  topBarBTN: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
