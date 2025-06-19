import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../services/api"

function Book({ route, navigation }) {

    const [date, setDate] = useState('')
    const { id } = route.params || {}

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user')
        if (!user_id) {
            console.error("User ID not found in AsyncStorage")
            return
        }
        if (!date) {
            console.error("Date is required")
            return
        }

        let isoDate, friendlyDate
        try {
            const dateObj = new Date(date)
            isoDate = dateObj.toISOString()
            // Format as YYYY-MM-DD
            const year = dateObj.getFullYear()
            const month = String(dateObj.getMonth() + 1).padStart(2, '0')
            const day = String(dateObj.getDate()).padStart(2, '0')
            friendlyDate = `${year}-${month}-${day}`
        } catch (e) {
            Alert.alert('Invalid Date', 'Please enter the date in YYYY-MM-DD format.')
            return
        }

        await api.post(`/spots/${id}/bookings`, {
            date: isoDate,
        }, {
            headers: { user_id },
        })

        Alert.alert('Booking Request Sent', `Your booking request for ${friendlyDate} has been sent successfully.`)
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Interest Date *</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the date (YYYY-MM-DD)"
                placeholderTextColor={"#999"}
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Request Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('List')}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,

    },
    label: {
        fontWeight: "bold",
        marginBottom: 8,
        color: "#444",
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        backgroundColor: "#f05a5b",
        paddingVertical: 12,
        borderRadius: 2,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    cancelButtonText: {
        color: "#444",
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default Book
