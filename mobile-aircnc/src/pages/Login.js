import React, { useState, useEffect } from "react"
import { View, KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'
import logo from "../assets/logo.png"

function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List')
            }
        })
    }, [])

    async function handleSubmit() {

        const response = await api.post('/sessions', {
            email,
        })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        console.log(_id)
        console.log(email, techs)

        navigation.navigate('List')


    }
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
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Technology *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your technology"
                    placeholderTextColor={"#999"}
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
