import React from "react"
import { View, KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native"
import api from '../services/api'
import logo from "../assets/logo.png"

function Login() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.login}>
            <Image source={logo} style={styles.logo} />

            <View style={styles.form}>
                <Text style={styles.label}>Your Email *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your email"
                    placeholderTextColor={"#999"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}>Technology *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your technology"
                    placeholderTextColor={"#999"}
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Text style={styles.buttonText}>Find Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default Login
