import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native-safe-area-context"

import SpotList from "../components/SpotList"
import logo from "../assets/logo.png"

function List({ navigation }) {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs ? storagedTechs.split(',').map(tech => tech.trim()) : []
            setTechs(techsArray)
        })
    }, [])

    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.list}>

            <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
                <MaterialIcons name="exit-to-app" size={24} color="#f05a5b" />
            </TouchableOpacity>

            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} navigation={navigation} />)}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: "#fff",
    },
    logoutIcon: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 2,
        padding: 8,
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 24,
        marginBottom: 24,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default List
