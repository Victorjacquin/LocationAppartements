import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import * as apiClients from '../../../modeles/adapter/client';
import { useNavigation } from '@react-navigation/native';


export default function RechercheClient() {
    const [clients, setClients] = useState([]);
    const [searchNom, setSearchNom] = useState('');
    const [searchPrenom, setSearchPrenom] = useState('');
    const [searchVille, setSearchVille] = useState('');

    const navigation = useNavigation();



    useEffect(() => {
                apiClients.list()
                    .then(response => {
                        setClients(response.data.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }, []);

            const filteredClients = clients.filter(client =>
                client.Nom.toLowerCase().includes(searchNom.toLowerCase()) &&
                client.Prenom.toLowerCase().includes(searchPrenom.toLowerCase()) &&
                client.Ville.toLowerCase().includes(searchVille.toLowerCase())

            );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={[styles.itemColumn, { flex: 1 }]}>
                <Text style={styles.itemText}>{item.Nom} {item.Prenom}</Text>
            </View>
            <View style={[styles.itemColumn, { flex: 1 }]}>
                <Text style={styles.itemText}>{item.Ville}, {item.CP}</Text>
            </View>
            <TouchableOpacity style={[styles.itemColumn, styles.itemButton]} onPress={() => navigation.navigate('InformationsClient', { client: item })}>
                <Text style={styles.itemButtonText}>Détails</Text>
            </TouchableOpacity>
        </View>
    );

            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Rechercher un nom"
                        value={searchNom}
                        onChangeText={text => setSearchNom(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rechercher un prenom"
                        value={searchPrenom}
                        onChangeText={text => setSearchPrenom(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rechercher une ville"
                        value={searchVille}
                        onChangeText={text => setSearchVille(text)}
                    />

                    <TouchableOpacity
                        style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                        onPress={() => navigation.navigate("AjouterClient")}>
                        <Text style={{ color: "white" }}>Créer un client</Text>
                    </TouchableOpacity>

                    {filteredClients.length > 0 ? (
                        <FlatList
                            data={filteredClients}
                            keyExtractor={item => item.NumeroPersonne}
                            renderItem={renderItem}
                            ListHeaderComponent={() => (
                                <View style={styles.header}>
                                    <Text style={styles.columnHeader}>Identité</Text>
                                    <Text style={styles.columnHeader}>Ville</Text>
                                    <Text style={styles.columnHeader}>Tel</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text>Aucun résultat</Text>
                    )}

                    <StatusBar style="auto" />
                </View>
            );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingTop: 50,
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%'
    },
    columnHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
        textAlign: 'left', // Aligner le texte à gauche
        flexWrap:'wrap',
        paddingHorizontal: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemColumnNom: {
        fontSize:13,
        flexWrap:'wrap',
        width:"33%"
    },
    itemColumnVille:{
        fontSize:13,
        width:'33%',
        textAlign: 'left', // Aligner le texte à gauche
    },
    itemColumnTel:{
        fontSize:12,
    },
    itemButton: {
        width: 75,
        backgroundColor: '#0099ff',
    },
    itemButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});