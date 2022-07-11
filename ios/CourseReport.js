import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import NavBar from '../Components/NavBar';
import TopBar from '../Components/TopBar';
import TableRow from '../Components/TableRow';

export default function CourseReport() {
  const [isProcessing, setProcessing] = useState(1);
  useEffect(() => {
    console.log(global.courseName);
    global.courseReportArray = new Array();
    for (let i = 0; i < global.result.length; i++) {
      console.log(global.result[i].course_name);
      if (global.result[i].course_name == global.courseName) {
        global.courseReportArray.push(global.result[i]);
      }
    }
    console.log(JSON.stringify(global.courseReportArray));
    var output = global.courseReportArray.map((item, index) => {
      return {x:index, y: parseFloat(item.grade)};
    });
    global.courseChartArray = output;
    console.log(JSON.stringify(global.courseChartArray));

    setProcessing(0);
  });
  const getGrade = (marks) => {
    if (marks < 40) {
      return 'F';
    } else if (marks < 50) {
      return 'D';
    } else if (marks < 70) {
      return 'C';
    } else if (marks < 85) {
      return 'B';
    } else if (marks < 100) {
      return 'A';
    }
  };
  return (
    <View style={{flex: 1}}>
      <TopBar />
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{padding: 15}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                padding: 5,
              }}>
              Course: {global.courseName}
            </Text>
            <Text
              style={{
                color: 'white',
              }}>
              Name: {global.User.firstName + ' ' + global.User.lastName}
            </Text>
          </View>
          <TableRow
            data={['S.No', 'Assignment', 'Marks', 'Total Marks', 'Grade']}
          />

          {isProcessing
            ? null
            : global.courseReportArray.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    data={[
                      index + 1,
                      item.assignment,
                      item.grade,
                      100,
                      getGrade(item.grade),
                    ]}
                  />
                );
              })}
          <View style={{flex: 0.1}} />
          {isProcessing ? null : (
            <BarChart
              style={styles.chart}
              data={{
                dataSets: [
                  {
                    values: global.courseChartArray,
                    label: 'A',
                    config: {
                      color: processColor('#FD8D08'),
                    },
                  },
                ],
              }}
              xAxis={{
                textColor: processColor('white'),
                 valueFormatter:global.courseReportArray.map((item) => {
                       return item.assignment.length>6?(item.assignment.substring(0, 6)+".."):item.assignment;
                     }),
                 avoidFirstLastClipping:true
              }}
              yAxis={{
                left: {
                  textColor: processColor('white'),
                },
                right: {
                  textColor: processColor('white'),
                },
              }}
              chartDescription={{text: ''}}
              legend={{
                enabled: false,
              }}
              borderColor={processColor('white')}
              borderWidth={0.5}
              drawBorders={true}
            />
          )}
          <Text
            style={{
              color: 'gray',
              textAlign: 'center',
              padding: 5,
            }}>
            X Axis: Assignment ID, Y Axis: Marks (Out of 100)
          </Text>
        </View>
      </View>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: global.Dark ? '#202020' : '#f5f5f5',
  },
  chart: {
    flex: 0.55,
    margin: 10,
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
});
