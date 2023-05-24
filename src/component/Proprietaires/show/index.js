import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as apiProprietaire from '../../../modeles/adapter/proprietaire';
import * as apiPosseder from '../../../modeles/adapter/posseder';

export default function InformationsProprietaire({ route, navigation }) {
    const { proprietaire } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [posseder, setPosseder] = useState([]);

    useEffect(() => {
        apiPosseder
            .showByProprietaire(proprietaire.NumeroProprietaire)
            .then((response) => {
                setPosseder(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [proprietaire.NumeroProprietaire]);


    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
        return formattedDate;
    };

    const handleDeleteProprietaire = () => {
        setIsLoading(true);
        apiProprietaire
            .sup(proprietaire.NumeroProprietaire)
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
            <Text style={styles.text}>{proprietaire.Nom} {proprietaire.Prenom}</Text>
            <Text style={styles.text}>{proprietaire.Numero_Rue} {proprietaire.Nom_Rue}</Text>
            <Text style={styles.text}>{proprietaire.CP} {proprietaire.Ville}</Text>
            <Text style={styles.text}>{proprietaire.Tel}</Text>

            <ScrollView>
                {posseder.length > 0 ? (
                    <View style={styles.demandesContainer}>
                        <Text style={styles.demandes}>Les appartements de ce proprietaire :</Text>
                        {posseder.map((possede) => (
                            <View key={possede.NumeroAppartement} style={styles.demande}>

                                <Text style={styles.text}>Numero Appartement : {possede.NumeroAppartement}</Text>
                                <Text style={styles.text}>Date d'obtention : {formatDate(possede.Date_Debut)}</Text>
                                {possede.Date_Fin &&   <Text style={styles.text}>Date de vente : {formatDate(possede.Date_Fin)}</Text>}

                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.text}>Pas d'appartement actuellement</Text>)}
            </ScrollView>



            <View style={styles.buttonContainer}>
                <Button
                    title="Supprimer le proprietaire"
                    onPress={handleDeleteProprietaire}
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
