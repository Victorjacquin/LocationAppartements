import React, { useEffect, useState } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import * as apiLocataire from '../../../modeles/adapter/locataire';
import * as apiOccuper from '../../../modeles/adapter/occuper';

export default function InformationsLocataire({ route, navigation }) {
    const { locataire } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [occuper, setOccuper] = useState([]);

    useEffect(() => {
        apiOccuper
            .showByLocataire(locataire.NumeroLocataire)
            .then((response) => {
                setOccuper(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [locataire.NumeroLocataire]);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
        return formattedDate;
    };

    const handleDeleteLocataire = () => {
        setIsLoading(true);
        apiLocataire
            .sup(locataire.NumeroLocataire)
            .then(() => {
                navigation.goBack(); // retourne à la page précédente après suppression réussie
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{locataire.Nom} {locataire.Prenom}</Text>
            <Text style={styles.text}>{formatDate(locataire.Date_Naissance)} </Text>
            <Text style={styles.text}>{locataire.NumeroBanque} </Text>
            <Text style={styles.text}>{locataire.Tel}</Text>

            <TouchableOpacity
                style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                onPress={() => navigation.navigate("AjouterLocation", { locataire: locataire })}>
                <Text style={{ color: "white" }}>Ajouter une location</Text>
            </TouchableOpacity>

            <ScrollView>
                {occuper.length > 0 ? (
                    <View style={styles.demandesContainer}>
                        <Text style={styles.demandes}>Les occupations :</Text>
                        {occuper.map((occupe) => (
                            <View  style={styles.demande}>

                                <Text style={styles.text}>Appartement : {occupe.NumeroAppartement}</Text>
                                <Text style={styles.text}>Arrivée : {formatDate(occupe.Date_Debut)}</Text>
                                {occupe.Date_Fin && <Text style={styles.text}>Départ : {formatDate(occupe.Date_Fin)}</Text>}

                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.text}>Ce locataire n'a occupé aucun appartement</Text>
                )}
            </ScrollView>



            <View style={styles.buttonContainer}>
                <Button
                    title="Supprimer le locataire"
                    onPress={handleDeleteLocataire}
                    disabled={isLoading} // désactiver le bouton pendant la suppression
                    color="#ff0000"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    demande: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    demandes: {
        fontSize:16,
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
});
``
