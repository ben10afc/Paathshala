import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  ActivityIndicator,
  Linking,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import '../global';
import TopBar from '../Components/TopBar';
import DocumentPicker from 'react-native-document-picker';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import GDrive from 'react-native-google-drive-api-wrapper';
import Modal from 'react-native-modal';
import {fetchCourse} from '../fetchCourse';
var fs = require('react-native-fs');
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import RNFetchBlob from 'rn-fetch-blob';//added by siddhant
import RNFS from 'react-native-fs';//added by siddhant


export default function AssignmentView() {
  const navigation = useNavigation();

  const [modalVisibility, setModalVisibility] = useState(false);
  const [filename, setFileName] = useState('Attach File');
  const [buttonStatus, setButtonStatus] = useState(1);
  const [indicatorStatus, setIndicatorStatus] = useState(0);
  const [document, setDocument] = useState();
  const [Marks, setMarks] = useState('');
  const [hasSubmitted, setSubmitted] = useState(0);
  const [submissionEmail, setSubmissionEmail] = useState('');
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const Delete = async (ann_id) => {
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/deleteAssignment',
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
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        res
      );
      setDocument(res);
      setFileName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setIndicatorStatus(0);
      } else {
        throw err;
      }
    }

    setButtonStatus(0);
  };

  const uploadFile = async () => {
    console.log("here is new link ",RNFS.TemporaryDirectoryPath);
    const url=document.uri;
    const split = url.split('/');
    const name = split.pop();
    const inbox = split.pop();
    const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
    console.log("here is the document uri:",realPath);
    RNFS.readFile(document.uri, 'base64').then((res) => {
    RNFetchBlob.fetch(
      'POST',
      "https://paathshala.priden.co/api/uploadFile.php",
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'Media', data: res,filename : 'avatar.pdf'},
      ],
    )
      .then((resp) => {
       // console.log("here is the response",resp);
        ToastAndroid.showWithGravity(
                      'Successfully uploaded !',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                    );

                    console.log('Creating submission');
                    createSubmission(resp);
                    setIndicatorStatus(0);
                    setSubmitted(1);
      })
      .catch((err) => {
        console.log(err);
        // ...
      });
   });

/*


    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive',
      ], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1012711528382-pcpp9u8s9rl9tggbma14rnnti0ntfrlc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
    });
    let userInfo;
    try {
      await GoogleSignin.hasPlayServices();
      userInfo = await GoogleSignin.signIn();

      const token = await GoogleSignin.getTokens();
      global.accessToken = token.accessToken;
      console.log('TOKEN: ' + global.accessToken);
      console.log('[Upload]: Logged In!');
      GDrive.setAccessToken(global.accessToken);
      console.log('[Upload]: Got Token!');
      GDrive.init();
      console.log('[Upload]: Initialized GDrive!');
      console.log('[Upload]: Uploading ' + JSON.stringify(document));

      fs.readFile(document.uri, 'base64').then((res) => {
        var d = new Date();
        var n = d.getTime();
        const finalFileName = filename + ' - [' + n + ']';
        GDrive.files
          .createFileMultipart(
            res,
            'application/pdf',
            {
              parents: ['root'],
              name: finalFileName,
            },
            true,
          )
          .then((a) => {
            console.log('[Upload]: Uploaded!');
            console.log('[Upload]: ' + JSON.stringify(a));
            GDrive.files
              .getId(finalFileName, ['root'], 'application/pdf', false)
              .then((res) => {
                console.log('[Upload]: FileId = ' + res);
                global.docLink = res;
                GDrive.permissions
                  .create(res, {
                    role: 'reader',
                    type: 'anyone',
                  })
                  .then(() => {
                    console.log('[Upload]: Set permission to public');
                    ToastAndroid.showWithGravity(
                      'Successfully uploaded to Google Drive. Submitting..',
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                    );

                    console.log('Creating submission');
                    createSubmission();
                    setSubmitted(1);
                  });
              });
          });
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'An error occured. Please try again...',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('3');
      } else {
        console.log('Unknown Error: ' + error.code);
      }
    }*/
  };
  const updateSubmission = async () => {
    console.log(
      JSON.stringify({
        grade: Marks,
        coursename: global.currentCourseName,
        assid: global.currentAssignmentId,
        email: submissionEmail,
      }),
    );
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/updateSubmission',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            grade: Marks,
            coursename: global.currentCourseName,
            assid: global.currentAssignmentId,
            email: submissionEmail,
          }),
        },
      );
      let json = await response.json();
      console.log('MARKS:' + JSON.stringify(json));
      ToastAndroid.showWithGravity(
        'Successfully updated marks.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      await fetchCourse();
      setModalVisibility(true);
      setModalVisibility(false);
    } catch {}
  };

  const createSubmission = async (submissionLink) => {
    console.log('Assignment ID: ' + global.currentAssignmentId);
    try {
      let response = await fetch(
        'https://paathshala.priden.co/restapi/public/api/v1/createSubmission',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.User.token,
          },
          body: JSON.stringify({
            student_email: global.User.email,
            student_name: global.User.firstName + ' ' + global.User.lastName,
            assignment:
              global.result.assignments[global.currentAssignmentIndex].title,
            submission_link:
            submissionLink,
            grade: '0',
            course_name: global.currentCourseName,
            assignment_id: global.currentAssignmentId,
          }),
        },
      );
      let json = await response.json();
      global.result = json;
      console.log('RESULT: ' + JSON.stringify(result));
      ToastAndroid.showWithGravity(
        'Successfully submitted assignment.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.error(error);
    }
    if (global.result != undefined) {
      setIndicatorStatus(0);
    }
  };
  return (
    <View style={styles.container}>
      {global.User.type == '0' ? (
        <TopBar />
      ) : (
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Ionicons
              name="ios-settings"
              size={25}
              color={global.Dark ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {'   '}paathshala{'   '}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setDeleteModalVisibility(true);
            }}>
            <Icon
              name="delete"
              size={25}
              color={global.Dark ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          backgroundColor: global.Dark ? '#333333' : 'white',
          borderRadius: 10,
          borderWidth: 0.5,
          margin: 5,
          borderColor: global.Dark ? '#545454' : 'lightgray',
          elevation: 1,
        }}>
        <Text
          style={{
            fontSize: 18,
            padding: 20,
            paddingBottom: 0,
            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {global.result.assignments[global.currentAssignmentIndex].title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            padding: 20,
            paddingTop: 5,
            color: global.Dark ? '#D4D4D4' : 'gray',
          }}>
          {global.result.assignments[global.currentAssignmentIndex].timestamp}
        </Text>

        <Text
          style={{
            fontSize: 15,
            borderBottomColor: 'blue',
            padding: 20,
            paddingTop: 0,
            color: global.Dark ? '#D4D4D4' : 'black',
          }}>
          {'"'}
          {global.result.assignments[global.currentAssignmentIndex].description}
          {'"'}
          {'\n'}
          {'\n'}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                global.result.assignments[global.currentAssignmentIndex].doc,
              );
            }}
          />
          <Text style={{color: 'lightblue'}}>
            {global.result.assignments[global.currentAssignmentIndex].doc}
          </Text>
        </Text>
      </View>
      <Text>{'  '}</Text>
      <Text>{'  '}</Text>

      {global.User.type != '0' ? (
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 15,
                padding: 10,
                marginLeft: 20,
                color: global.Dark ? '#D4D4D4' : 'gray',
              }}>
              Student Submissions
            </Text>
            {'submissions' in
            global.result.assignments[global.currentAssignmentIndex] ? (
              global.result.assignments[
                global.currentAssignmentIndex
              ].submissions.map((item, index) => {
                return (
                  <View style={styles.submissions} key={index}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: global.Dark ? '#D4D4D4' : 'black',
                      }}>
                      Name: {item.studentName}
                    </Text>
                    <Text style={{color: global.Dark ? '#D4D4D4' : 'black'}}>
                      Email: {item.email}
                    </Text>
                    <Text style={{color: global.Dark ? '#D4D4D4' : 'black'}}>
                      Marks: {item.grade}/100
                    </Text>
                    <Text>{'  '}</Text>
                    <Button
                      color=""
                      title="View Submission"
                      onPress={() => {
                        Linking.openURL(item.submission);
                      }}
                    />
                    <View style={{height: 5}} />
                    <Button
                      color="#FD8D08"
                      title="Assign Marks"
                      onPress={() => {
                        setSubmissionEmail(item.email);
                        setModalVisibility(1);
                      }}
                    />
                  </View>
                );
              })
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  padding: 10,
                  marginLeft: 20,
                  fontWeight: 'bold',
                  color: global.Dark ? '#D4D4D4' : 'gray',
                }}>
                No Submissions
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.submitPanel}>
          <Text
            style={{
              fontSize: 15,
              padding: 10,
              color: global.Dark ? '#D4D4D4' : 'gray',
            }}>
            Your Submission
          </Text>
          {!hasSubmitted ? (
            <View>
              <TouchableNativeFeedback
                onPress={() => {
                  pickFile();
                }}>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 12,
                    alignContent: 'center',
                    backgroundColor: global.Dark ? '#333333' : '#ffa033',
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      fontSize: 15,
                    }}>
                    <Icon
                      name="pluscircleo"
                      size={18}
                      color={global.Dark ? '#D4D4D4' : 'white'}
                    />
                    {'    '}
                    {filename}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                disabled={buttonStatus}
                onPress={() => {
                  setIndicatorStatus(1);
                  uploadFile();
                }}>
                <View
                  style={{
                    padding: 12,
                    alignContent: 'center',
                    backgroundColor: global.Dark ? '#c76d02' : 'white',
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  {indicatorStatus ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={{
                        color: global.Dark ? 'white' : 'black',
                        width: '100%',
                        fontSize: 15,
                      }}>
                      <Icon
                        name="check"
                        size={18}
                        color={global.Dark ? 'white' : 'black'}
                      />
                      {'    '}Upload & Submit
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          ) : (
            <View>
              <TouchableNativeFeedback
                onPress={() => {
                  ToastAndroid.showWithGravity(
                    'Assignment already submitted!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                  );
                }}>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 12,
                    alignContent: 'center',
                    backgroundColor: global.Dark ? '#333333' : '#ffa033',
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      fontSize: 15,
                    }}>
                    <Icon
                      name="pluscircleo"
                      size={18}
                      color={global.Dark ? '#D4D4D4' : 'white'}
                    />
                    {'    '}
                    {filename}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  ToastAndroid.showWithGravity(
                    'Assignment already submitted!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                  );
                }}>
                <View
                  style={{
                    padding: 12,
                    alignContent: 'center',
                    backgroundColor: global.Dark ? '#c76d02' : 'white',
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  {indicatorStatus ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={{
                        color: global.Dark ? 'white' : 'black',
                        width: '100%',
                        fontSize: 15,
                      }}>
                      <Icon
                        name="check"
                        size={18}
                        color={global.Dark ? 'white' : 'black'}
                      />
                      {'    '}Well Done!
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
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
              Assign Marks{'\n'}
              {'\n'}
            </Text>
            <TextInput
              style={styles.inputs}
              keyboardType={'numeric'}
              placeholder="Marks out of 100"
              placeholderTextColor="#a9a9a9"
              onChangeText={(text) => setMarks(text)}
            />

            <TouchableNativeFeedback
              onPress={() => {
                updateSubmission();
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
                    Save
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
              Delete Notification?{'\n'}
              {'\n'}
            </Text>
            <Button
              title="Confirm"
              onPress={() => {
                Delete(global.currentAssignmentId);
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
    width: '100%',
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
  },
  submitPanel: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 20,
    marginBottom: 30,
  },
  submissions: {
    backgroundColor: global.Dark ? '#333333' : 'white',
    borderWidth: 0.5,
    borderColor: global.Dark ? '#545454' : 'lightgray',
    elevation: 1,
    padding: 20,
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
