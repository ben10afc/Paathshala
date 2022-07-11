import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import '../global';
export default function CourseIcon(props) {
	const navigation = useNavigation();
	return (
		<View style={styles.courseIcon}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Course');
					global.currentCourse = props.courseID;
					global.currentCourseName = props.Title;
					global.currentCourseTeachers = props.Teachers;
				}}
			>
				<View style={{ width: '100%', height: '100%' }}>
					<Text
						style={{
							fontWeight: 'bold',
							color: global.Dark ? '#D4D4D4' : 'white',
							fontSize: 15
						}}
					>
						{props.Title}
					</Text>
					<Text
						style={{
							bottom: 0,
							position: 'absolute',
							color: global.Dark ? '#D4D4D4' : 'white',
							fontSize: 10
						}}
					>
						Teachers: {props.Teachers}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	courseIcon: {
		padding: 10,
		marginRight: 10,
		marginBottom: 10,
		borderRadius: 10,
		width: '45%',
		height: '35%',
		backgroundColor: global.Dark ? '#333333' : '#1fcf4b',
		elevation: global.Dark ? 5 : 0,
		borderWidth: 0.5,
		borderColor: global.Dark ? '#545454' : '#1fcf4b'
	}
});
