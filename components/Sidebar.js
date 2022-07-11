import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, Animated } from 'react-native';
import '../global';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Sidebar() {
	return (
		<View style={styles.sideBar}>
			<TouchableNativeFeedback
				onPress={() => {
					alert('nice');
				}}
			>
				<Icon
					style={styles.closeButton}
					name="md-arrow-back"
					size={24}
					color={global.Dark ? 'white' : 'gray'}
				/>
			</TouchableNativeFeedback>
			<View style={{ padding: 20 }}>
				<Image style={styles.profilePicture} source={require('../assets/profilePicture.png')} />
				<Text
					style={{
						transform: [ { translateX: 5 } ],
						fontWeight: 'bold',
						fontSize: 15,
						color: global.Dark ? 'white' : 'black'
					}}
				>
					Daksh Yadav
				</Text>
				<Text
					style={{
						alignSelf: 'center',
						color: global.Dark ? 'white' : 'black'
					}}
				>
					Class XI
				</Text>
			</View>
			<View style={styles.buttonGroupOne}>
				<Text
					style={{
						fontWeight: 'bold',
						color: global.Dark ? '#D4D4D4' : 'gray',
						padding: 15
					}}
				>
					My Courses
				</Text>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Text style={styles.label}>Maths-11D</Text>
					</View>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Text style={styles.label}>English-11D</Text>
					</View>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Text style={styles.label}>Physics-11D</Text>
					</View>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Text style={styles.label}>Chemistry-11D</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
			<View style={styles.buttonGroupTwo}>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Icon name="ios-settings" size={21} color={global.Dark ? '#D4D4D4' : 'black'} />
						<Text style={styles.label}>{'  '}Settings</Text>
					</View>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback>
					<View style={styles.buttonView}>
						<Icon
							name="ios-information-circle-outline"
							size={21}
							color={global.Dark ? '#D4D4D4' : 'black'}
						/>
						<Text style={styles.label}>{'  '}About</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
			<Text
				style={{
					fontSize: 14,
					position: 'absolute',
					bottom: 70,
					color: 'gray'
				}}
			>
				Made with ❤️ in India.
			</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	sideBar: {
		position: 'absolute',
		backgroundColor: global.Dark ? '#202020' : 'white',
		width: '60%',
		height: '100%',
		left: 0,
		elevation: 5,
		alignItems: 'center',
		zIndex: 2,
		borderRightColor: global.Dark ? '#545454' : '#1fcf4b',
		borderRightWidth: 0.5
	},
	profilePicture: {
		width: 100,
		height: 100,
		resizeMode: 'contain'
	},
	buttonGroupOne: {
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		borderTopWidth: 1,
		borderTopColor: global.Dark ? 'gray' : 'lightgray',
		borderBottomWidth: 1,
		borderBottomColor: global.Dark ? 'gray' : 'lightgray'
	},
	buttonView: {
		padding: 18,
		flexDirection: 'row'
	},
	closeButton: {
		position: 'absolute',
		right: 0,
		padding: 20
	},
	buttonGroupTwo: {
		marginBottom: 30,
		paddingBottom: 10,
		width: '100%',

		borderBottomWidth: 1,
		borderBottomColor: global.Dark ? 'gray' : 'lightgray'
	},
	label: {
		fontSize: 14,
		color: global.Dark ? '#D4D4D4' : 'black'
	}
});
