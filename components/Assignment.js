import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  ImagePropTypes,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import '../global';
export default function Notification(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          global.currentAssignmentId = props.id;
          global.currentAssignmentIndex = props.index;
          navigation.push('AssignmentView');
        }}>
        <View style={styles.assignment}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: global.Dark ? '#D4D4D4' : 'black',
            }}>
            {props.Title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              color: global.Dark ? '#D4D4D4' : 'black',
            }}>
            {props.Timestamp}
          </Text>
          <Text
            style={{paddingTop: 10, color: global.Dark ? '#bdbdbd' : 'black'}}>
            {props.Body}
            <Text style={{color: 'lightblue'}}>{'   '}Read More</Text>
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  assignment: {
    width: '95%',
    padding: 20,
    backgroundColor: global.Dark ? '#333333' : 'white',
    borderRadius: 7,
    borderColor: global.Dark ? '#545454' : 'lightgray',
    elevation: 1,
  },
});
