import React from "react"
import { View, Text, StyleSheet } from "react-native"

function Book() {
    return (
        <View style={styles.book}>
            <Text style={styles.title}>Book Page</Text>
            <Text>This is the book page content.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    book: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    login: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
})

export default Book
