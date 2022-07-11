import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import CourseNavBar from '../Components/CourseNavBar';
import Assignment from '../Components/Assignment.js';
import TopBar from '../Components/TopBar';
import {useIsFocused} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import Modal from 'react-native-modal';
export default function Course() {
  const isFocused = useIsFocused();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [indicatorStatus, setIndicatorStatus] = useState(true);
  const [key, setKey] = useState(0);

  const actions = [
    {
      text: 'Create new annoucement',
      name: 'cr_annoucement',
      position: 0,
      icon: require('../assets/plus_white.png'),
    },
  ];
  useEffect(() => {
    Fetch();
  }, [isFocused]);

  const Fetch = async () => {
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/fetchCourse',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            course_name: global.currentCourse,
          }),
        },
      );
      let json = await response.json();
      global.result = json;
    } catch (error) {
      console.error(error);
    }
    let i = 0;

    global.output = null;
    // global.notesArray = null;
    // global.noticeArray = null;
    // global.assignmentsArray = new Array();
    // while (i < 1000000000) {
    //   if (global.result.assignments.hasOwnProperty(i)) {
    //     global.assignmentsArray.push(global.result.assignments[i]);
    //     i++;
    //   } else {
    //     break;
    //   }
    // }
    // let j = 0;
    // global.notesArray = new Array();
    // while (j < 1000000000) {
    //   if (global.result.notes.hasOwnProperty(j)) {
    //     global.notesArray.push(global.result.notes[j]);
    //     j++;
    //   } else {
    //     break;
    //   }
    // }
    // global.noticeArray = new Array();
    // while (j < 1000000000) {
    //   if (global.result.notices.hasOwnProperty(j)) {
    //     global.noticeArray.push(global.result.notices[j]);
    //     j++;
    //   } else {
    //     break;
    //   }
    // }
    global.output = global.result.assignments.reverse().map((item, index) => {
      return (
        <Assignment
          key={index}
          index={index}
          id={item.id}
          Title={item.title}
          Body={item.description}
          Timestamp={item.timestamp}
        />
      );
    });
    setKey(key + 1);
    setIndicatorStatus(false);
  };
  const Create = async () => {
    var d = new Date();
    var date = d.getDate(); //Current Date
    var month = d.getMonth() + 1; //Current Month
    var year = d.getFullYear(); //Current Year
    var timestamp =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds();
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/createAssignment',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            title: title,
            description: desc,
            document_link: link,
            course_id: global.currentCourse,
            timestamp: timestamp,
          }),
        },
      );
      let json = await response.json();
      let result = json;
      setTitle('');
      setDesc('');
      setLink('');
      if (result != undefined) {
        setModalVisibility(false);
        Fetch();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.studentPanel}>
        <View style={styles.studentInfo}>
          <Text
            style={{
              color: 'white',
              fontSize: 40,
              fontWeight: 'bold',
              opacity: 0.4,
              textAlign: 'center',
            }}>
            {global.currentCourseName}
          </Text>
          <Text style={{color: 'white', opacity: 0.6}}>
            Teachers: {global.currentCourseTeachers}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            alignSelf: 'center',
            padding: 10,
            paddingTop: 20,
            fontWeight: 'bold',
            color: 'gray',
          }}>
          Assignments
        </Text>
        <ScrollView style={styles.assignmentList}>
          {indicatorStatus ? (
            <ActivityIndicator color="white" />
          ) : (
            global.output
          )}
          <View style={{height: 80}} />
        </ScrollView>
      </View>
      <CourseNavBar />
      {global.User.type == '0' ? null : (
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            setModalVisibility(true);
          }}
          color="#FD8D08"
          overrideWithAction={true}
          distanceToEdge={{vertical: 90, horizontal: 30}}
          overlayColor="rgba(0, 0, 0,0.5)"
        />
      )}
      <Modal
        isVisible={modalVisibility}
        onBackdropPress={() => setModalVisibility(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.addInput}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              Create Assignment{'\n'}
            </Text>
            <TextInput
              style={styles.inputs}
              placeholder="Title"
              placeholderTextColor="#a9a9a9"
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={6}
              style={[
                styles.inputs,
                {
                  height: 150,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                },
              ]}
              placeholder="Description"
              placeholderTextColor="#a9a9a9"
              onChangeText={(text) => setDesc(text)}
            />
            <TextInput
              style={styles.inputs}
              autoCapitalize="none"
              placeholder="Document Link"
              placeholderTextColor="#a9a9a9"
              onChangeText={(text) => setLink(text)}
            />
            <TouchableNativeFeedback
              onPress={() => {
                Create();
              }}>
              <View
                style={{
                  padding: 12,
                  alignContent: 'center',
                  backgroundColor: global.Dark ? '#0095F6' : '#ffa033',
                  elevation: 2,
                  borderRadius: 5,
                  width: 300,
                }}>
                {indicatorStatus ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      fontSize: 14,
                      textAlign: 'center',
                    }}>
                    Submit
                  </Text>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
  },
  studentPanel: {
    alignItems: 'center',
    backgroundColor: 'green',
    height: '25%',
    transform: [{scaleX: 1.5}],
    borderBottomStartRadius: 400,
    borderBottomEndRadius: 400,
    overflow: 'hidden',
    elevation: 5,
  },
  studentInfo: {
    transform: [{scaleX: 0.666}],
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  assignmentList: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 500,
  },
  addInput: {
    width: '90%',
    backgroundColor: '#202020',
    borderRadius: 5,
    elevation: 5,
    padding: 20,
  },
  inputs: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginBottom: 15,
  },
});
