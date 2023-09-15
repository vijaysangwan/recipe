import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { login } from "../services/apiAuth";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("prashant@example.com");
	const [password, setPassword] = useState("password");

	const handleLogin = async () => {
		try {
			const { user } = await login({ email, password });

			// Check if the user object exists
			if (user) {
				// User is authenticated, navigate to the welcome screen
				navigation.navigate("Welcome", { userEmail: email });
			} else {
				// User is not authenticated, show an alert for invalid credentials
				alert("Login Failed", "Invalid credentials. Please try again.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LoginScreen</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry={true} // Hides the entered text
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>
			<TouchableOpacity
				style={styles.loginButton}
				onPress={() => handleLogin()}
			>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: "80%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
		paddingLeft: 10,
	},
	loginButton: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
	},
});

export default LoginScreen;
