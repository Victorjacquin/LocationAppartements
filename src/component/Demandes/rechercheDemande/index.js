import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import * as apiDemandes from '../../../modeles/adapter/demande';

export default function RechercheAppartement() {
    const [demandes, setDemandes] = useState([]);
    const [searchPrix, setSearchPrix] = useState('');
    const [searchPrixMin, setSearchPrixMin] = useState('');
    const [searchPrixMax, setSearchPrixMax] = useState('');

    useEffect(() => {
        apiDemandes.list()
            .then(response => {
                setAppartements(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredAppartements = appartements.filter(appartement =>
        appartement.Rue.toLowerCase().includes(searchRue.toLowerCase()) &&
        (searchPrixMin ? appartement.Prix_Location >= searchPrixMin : true) &&
        (searchPrixMax ? appartement.Prix_Location <= searchPrixMax : true)
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher une rue"
                value={searchRue}
                onChangeText={text => setSearchRue(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix Minimum"
                value={searchPrixMin}
                onChangeText={text => setSearchPrixMin(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix Maximum"
                value={searchPrixMax}
                onChangeText={text => setSearchPrixMax(text)}
            />

            {filteredAppartements.length > 0 ?
                filteredAppartements.map(appartement => (
                    <Text key={appartement.NumeroAppartement}>{appartement.Rue}</Text>
                ))
                :
                <Text>Aucun résultat</Text>
            }
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
});
