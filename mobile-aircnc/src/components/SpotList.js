import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'

function getImageUrl(url) {
    // Replace 'localhost' with your machine's IP address
    return url.replace('localhost', '192.168.1.168') // <-- use your actual IP
}

export default function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech },
            })
            setSpots(response.data)
        }
        loadSpots()
    }, [])

    function handleBook(id) {
        navigation.navigate('Book', { id })
        // Here you would typically call an API to book the spot

        console.log(`Booking spot with ID: ${id}`)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Companies who use <Text style={styles.tech}>{tech}</Text> </Text>
            <FlatList
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: getImageUrl(item.thumbnail_url) }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `€${item.price}/day` : 'Free'}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleBook(item._id)}>
                            <Text style={styles.buttonText}>Book now</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 24,
    },
    title: {
        fontSize: 15,
        color: '#444',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    tech: {
        fontWeight: 'bold',
    },
    list: {
        height: 250,
    },
    listContent: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    company: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
