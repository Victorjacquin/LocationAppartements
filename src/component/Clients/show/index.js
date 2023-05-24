import React, { useEffect, useState } from 'react';
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import * as apiClients from '../../../modeles/adapter/client';
import * as apiDemandes from '../../../modeles/adapter/demande';
import * as apiVisites from '../../../modeles/adapter/visiter';

export default function InformationsClient({ route, navigation }) {
    const { client } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [demandes, setDemandes] = useState([]);
    const [visites, setVisites] = useState([]);

    useEffect(() => {
        apiDemandes
            .showByIdClient(client.NumeroClient)
            .then((response) => {
                setDemandes(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [client.NumeroClient]); // ajouter client.NumeroClient comme dépendance

    useEffect(() => {
        apiVisites
            .showByIdClient(client.NumeroClient)
            .then((response) => {
                setVisites(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [client.NumeroClient]);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
        return formattedDate;
    };

    const handleDeleteClient = () => {
        setIsLoading(true);
        apiClients
            .sup(client.NumeroClient)
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

    const handleDeleteDemande = (demandeId) => {
        setIsLoading(true);
        apiDemandes
            .sup(demandeId)
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

    const handleDeleteVisite = (idAppartement, idClient) => {
        setIsLoading(true);
        apiVisites
            .sup(idAppartement, idClient)
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
            <Text style={styles.text}>{client.Nom} {client.Prenom}</Text>
            <Text style={styles.text}>{client.Numero_Rue} {client.Nom_Rue}</Text>
            <Text style={styles.text}>{client.CP} {client.Ville}</Text>
            <Text style={styles.text}>{client.Tel}</Text>

            <ScrollView>

                <TouchableOpacity
                    style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                    onPress={() => navigation.navigate("becomeLocataire", { client: client })}>
                    <Text style={{ color: "white" }}>Devenir locataire</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                    onPress={() => navigation.navigate("AjouterDemande", { client: client })}>
                    <Text style={{ color: "white" }}>Ajouter une Demande</Text>
                </TouchableOpacity>

            {demandes.length > 0 ? (
                <View style={styles.demandesContainer}>
                    <Text style={styles.demandes}>Les demandes :</Text>
                    {demandes.map((demande) => (
                        <View key={demande.NumeroDemande} style={styles.demande}>

                            <Text style={styles.text}>Prix : {demande.Prix_min}/{demande.Prix_max}</Text>
                            <Text style={styles.text}>{formatDate(demande.Date_Demande)}</Text>
                            <View style={styles.text}>
                                <Button
                                    title="Supprimer la demande"
                                    onPress={() => handleDeleteDemande(demande.NumeroDemande)}
                                    disabled={isLoading} // désactiver le bouton pendant la suppression
                                    color="#ff0000"
                                />
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.text}>Pas de demandes</Text>)}
                <Text style={styles.text}></Text>

                <TouchableOpacity
                    style={{ marginTop: 10, backgroundColor: "blue", padding: 10 }}
                    onPress={() => navigation.navigate("AjouterVisite", { client: client })}>
                    <Text style={{ color: "white" }}>Ajouter une visite</Text>
                </TouchableOpacity>
                {visites.length > 0 ? (
                    <View style={styles.demandesContainer}>
                        <Text style={styles.demandes}>Les visites :</Text>
                        {visites.map((visite) => (
                            <View key={visite.NumeroAppartement} style={styles.demande}>
                                <Text style={styles.text}>{visite.NumeroAppartement}</Text>
                                <Text style={styles.text}>{formatDate(visite.Date_Visite)}</Text>
                                <View style={styles.text}>
                                    <Button
                                        title="Supprimer la visite"
                                        onPress={() => handleDeleteVisite(visite.NumeroAppartement, visite.NumeroClient)}
                                        disabled={isLoading} // désactiver le bouton pendant la suppression
                                        color="#ff0000"
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.text}>Pas de visites</Text>
                )}</ScrollView>



            <View style={styles.buttonContainersup}>
                <Button
                    title="Supprimer le client"
                    onPress={handleDeleteClient}
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
        bottom:0,
        left: 0,
    },
    buttonContainersup: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
});
``
