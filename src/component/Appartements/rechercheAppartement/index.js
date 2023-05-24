import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import * as apiAppartement from '../../../modeles/adapter/appartement';
import { useNavigation } from '@react-navigation/native';


export default function RechercheAppartement() {
    const [appartements, setAppartements] = useState([]);
    const [searchVille, setSearchVille] = useState('');
    const [searchPrixMin, setSearchPrixMin] = useState('');
    const [searchPrixMax, setSearchPrixMax] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        apiAppartement.list()
            .then(response => {
                setAppartements(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredAppartements = appartements.filter(appartement =>
        appartement.Ville.toLowerCase().includes(searchVille.toLowerCase()) &&
        (searchPrixMin ? appartement.Prix_Location >= searchPrixMin : true ) &&
        (searchPrixMax.Prix_Location ? appartement.Prix_Location <= searchPrixMax : true )


    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={[styles.itemColumn, { flex: 1 }]}>
                <Text style={styles.itemText}>{item.Ville}, {item.CP}</Text>
            </View>
            <View style={[styles.itemColumn, { flex: 1 }]}>
                <Text style={styles.itemText}>{item.Prix_Location} €</Text>
            </View>
            <TouchableOpacity style={[styles.itemColumn, styles.itemButton]} onPress={() => navigation.navigate('InformationsAppartement', { appartement: item })}>
                <Text style={styles.itemButtonText}>Détails</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher une ville"
                value={searchVille}
                onChangeText={text => setSearchVille(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix min"
                value={searchPrixMin}
                onChangeText={text => setSearchPrixMin(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix max"
                value={searchPrixMax}
                onChangeText={text => setSearchPrixMax(text)}
            />

            <TouchableOpacity
                style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                onPress={() => navigation.navigate("AjouterAppartement")}>
                <Text style={{ color: "white" }}>Créer un Appartement</Text>
            </TouchableOpacity>

            {filteredAppartements.length > 0 ? (
                <FlatList
                    data={filteredAppartements}
                    keyExtractor={item => item.NumeroAppartement}
                    renderItem={renderItem}
                    ListHeaderComponent={() => (
                        <View style={styles.header}>
                            <Text style={styles.columnHeader}>Ville</Text>
                            <Text style={styles.columnHeader}>Loyer</Text>
                            <Text style={styles.columnHeader}>+</Text>
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
    itemColumn:{
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
