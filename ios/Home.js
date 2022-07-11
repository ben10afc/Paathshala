import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CourseIcon from '../Components/CourseIcon';
import NavBar from '../Components/NavBar';
import TopBar from '../Components/TopBar';
import '../global';
import {FloatingAction} from 'react-native-floating-action';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default function Home() {
  const navigation = useNavigation();
  useEffect(() => {
    // AsyncStorage.clear();
    ReLogin();
    userType();
  });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [indicatorStatus, setIndicatorStatus] = useState(1);
  const [loginResult, setLoginResult] = useState(1);
  const [Type, setType] = useState('');
  const actions = [
    {
      text: 'Create new annoucement',
      name: 'cr_annoucement',
      position: 0,
      icon: require('../assets/plus_white.png'),
    },
  ];
  const userType = () => {
    console.log('Type:' + global.User.type);
    if (global.User.type == '0') {
      setType('Student');
    } else if (global.User.type == '1') {
      setType('Teacher');
    } else if (global.User.type == '2') {
      setType('Principal');
    }
  };
  const ReLogin = async () => {
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: global.User.email,
            password: global.User.pwd,
            username: '',
          }),
        },
      );
      let json = await response.json();
      const result = json;
      console.log(result);
      if (result.hasOwnProperty('success')) {
        global.User = {
          firstName: result.success.firstname,
          lastName: result.success.lastname,
          email: result.success.email,
          id: result.success.id,
          phone: result.success.phone,
          school: result.success.school,
          type: result.success.type,
          course: result.success.course,
          token: result.success.token,
          pwd: global.User.pwd,
        };
        setLoginResult(1);
      } else {
        console.log('None');
        setLoginResult(0);
      }
    } catch (error) {
      console.error(error);
    }
    setIndicatorStatus(0);
  };
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.studentPanel}>
        <View style={styles.studentInfo}>
          <Image
            style={styles.gradient}
            source={require('../assets/gradient.png')}
          />
          <Image
            style={styles.profilePicture}
            source={require('../assets/profilePicture.png')}
          />
          <Text style={{color: 'white'}}>Good Morning</Text>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            {'   '}
            {global.User.firstName + ' ' + global.User.lastName}
            {'   '}
          </Text>
          <Text style={{color: 'white'}}>
            {Type} at {global.User.school}
          </Text>
        </View>
      </View>
      <View style={styles.courseList}>
        <Text
          style={{
            paddingBottom: 15,
            color: global.Dark ? '#D4D4D4' : 'gray',
            alignSelf: 'center',
            transform: [{translateX: -8}],
          }}>
          {'   '}My Courses{'   '}
        </Text>
        <ScrollView
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
            transform: [{translateX: 5}],
          }}
          contentContainerStyle={{
            alignItems: 'flex-start',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
          }}>
          {indicatorStatus ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <ActivityIndicator
                color="white"
                style={{transform: [{translateX: -8}]}}
              />
            </View>
          ) : (
            global.User.course.map((item, index) => {
              return (
                <CourseIcon
                  key={index}
                  Title={item.course}
                  Teachers={item.teachers}
                  courseID={item.id}
                />
              );
            })
          )}

          <View style={{height: 80}} />
        </ScrollView>
      </View>
      {/* <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          global.school = global.User.school;
          navigation.navigate('SelectCourse');
        }}
        color="#FD8D08"
        overrideWithAction={true}
        distanceToEdge={{vertical: 90, horizontal: 30}}
        overlayColor="rgba(0, 0, 0,0.5)"
      /> */}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
  },
  studentPanel: {
    alignItems: 'center',
    backgroundColor: global.Dark ? '#e67e02' : '#ffa033',
    height: '30%',
    transform: [{scaleX: 1.75}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  studentInfo: {
    transform: [{scaleX: 0.571}],
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  gradient: {
    position: 'absolute',
    transform: [{translateY: -100}],
    opacity: 0.25,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  courseList: {
    padding: 20,
    width: '100%',
    flex: 1,
    marginBottom: 30,
    paddingBottom: 35,
    paddingRight: 0,
  },
});
