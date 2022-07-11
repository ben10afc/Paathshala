import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  Button,
} from 'react-native';
import NavBar from '../Components/NavBar';
import TopBar from '../Components/TopBar';
import Announcement from '../Components/Announcement';
import '../global';
import {FloatingAction} from 'react-native-floating-action';
import Modal from 'react-native-modal';
export default function AnnouncementsTab() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [deleteId, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [indicatorStatus, setIndicatorStatus] = useState(1);
  const [output, setOutput] = useState([]);
  const [noNotice, setNoNotice] = useState(false);

  const actions = [
    {
      text: 'Create new annoucement',
      name: 'cr_annoucement',
      position: 0,
      icon: require('../assets/plus_white.png'),
    },
  ];
  useEffect(() => {
    Fetch(global.User.school);
  }, []);

  const Fetch = async () => {
    console.log(`Fetching Announcements, school=${global.User.school}`);
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/fetchAnnoucements',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            school_name: global.User.school,
          }),
        },
      );
      let json = await response.json();
      if (json.annoucements.length != 0) {
        setOutput(json.annoucements);
        setNoNotice(false);
      } else {
        setNoNotice(true);
      }

      console.log('RESULT: ' + JSON.stringify(json));
      if (json != undefined) {
        setIndicatorStatus(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const Delete = async (ann_id) => {
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/deleteAnnoucement',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            id: ann_id,
          }),
        },
      );
      let json = await response.json();
      setDeleteModalVisibility(false);
      Fetch();
    } catch (error) {
      console.error(error);
    }
  };
  const Create = async () => {
    setIndicatorStatus(1);
    console.log(`Creating Announcements, school=${global.User.school}`);
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
        'https://paathshala.priden.co/restapi/public/api/v1/createAnnoucement',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            tittle: title,
            description: desc,
            school_name: global.User.school,
            assignment_id: '3',
            timestamp: timestamp,
          }),
        },
      );
      let json = await response.json();
      let result = json;

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
      <ScrollView
        style={{flex: 1, width: '100%', paddingTop: 10, marginBottom: 50}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'gray',
            textAlign: 'center',
            padding: 15,
          }}>
          Announcements
        </Text>

        {indicatorStatus ? (
          <ActivityIndicator color="white" />
        ) : noNotice ? (
          <Text
            style={{
              fontWeight: 'bold',
              color: 'gray',
              textAlign: 'center',
              padding: 15,
            }}>
            No Announcements Found.
          </Text>
        ) : (
          output.reverse().map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (global.User.type !== '0') {
                    setId(item.id);
                    setDeleteModalVisibility(true);
                  }
                }}>
                <Announcement
                  id={item.id}
                  Title={item.title}
                  Time={item.time}
                  Announcement={item.annoucement}
                />
              </TouchableOpacity>
            );
          })
        )}
        <View style={{height: 40}} />
      </ScrollView>

      <NavBar />
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
              Create Announcement{'\n'}
              {'\n'}
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
      <Modal
        isVisible={deleteModalVisibility}
        onBackdropPress={() => setDeleteModalVisibility(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.addInput}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              Delete Announcement?{'\n'}
              {'\n'}
            </Text>
            <Button
              title="Confirm"
              onPress={() => {
                Delete(deleteId);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
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
