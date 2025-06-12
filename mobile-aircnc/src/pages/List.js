import React from "react"
import { View, Text, StyleSheet } from "react-native"

function List() {
    return (
        <View style={styles.login}>
            <Text style={styles.title}>List Page</Text>
            <Text>This is the list page content.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
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

export default List
