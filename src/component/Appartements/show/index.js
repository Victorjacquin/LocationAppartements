import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import * as ApiAppartement from "../../../modeles/adapter/appartement";
import * as ApiProprio from "../../../modeles/adapter/proprietaire";
import * as ApiLocataire from "../../../modeles/adapter/locataire";

export default function InformationsAppartement({ route }) {
    const { appartement } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [editedAppartement, setEditedAppartement] = useState(appartement);
    const [proprios, setProprios] = useState([]);
    const [locataires, setLocataires] = useState([]);

    useEffect(() => {
        ApiProprio
            .showByAppartement(appartement.NumeroAppartement)
            .then((response) => {
                setProprios(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [appartement.NumeroAppartement]);

    useEffect(() => {
        ApiLocataire
            .showByAppartement(appartement.NumeroAppartement)
            .then((response) => {
                setLocataires(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [appartement.NumeroAppartement]);

    const handleSave = () => {
        ApiAppartement.update(editedAppartement);
        setIsEditing(false);
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>Adresse</Text>
            <Text>{appartement.Num_Rue} {appartement.Rue}</Text>
            <Text>{appartement.Ville} {appartement.CP}</Text>




            <Text style={styles.label}>Loyer</Text>
            {isEditing ? (
                <TextInput
                    value={editedAppartement.Prix_Location.toString()}
                    onChangeText={(text) => setEditedAppartement({ ...editedAppartement, Prix_Location: parseFloat(text) })}
                    style={styles.input}
                />
            ) : (
                <Text>{appartement.Prix_Location}</Text>
            )}

            <Text style={styles.label}>Charges</Text>
            {isEditing ? (
                <TextInput
                    value={editedAppartement.Prix_Charge.toString()}
                    onChangeText={(text) => setEditedAppartement({ ...editedAppartement, Prix_Charge: parseFloat(text) })}
                    style={styles.input}
                />
            ) : (
                <Text>{appartement.Prix_Charge}</Text>
            )}

            <Text style={styles.label}>Etage</Text>
            {isEditing ? (
                <TextInput
                    value={editedAppartement.Etage.toString()}
                    onChangeText={(text) => setEditedAppartement({ ...editedAppartement, Etage: parseFloat(text) })}
                    style={styles.input}
                />
            ) : (
                <Text>{appartement.Etage}</Text>
            )}

            <Text style={styles.label}>Taille</Text>
            {isEditing ? (
                <TextInput
                    value={editedAppartement.taille.toString()}
                    onChangeText={(text) => setEditedAppartement({ ...editedAppartement, taille: parseFloat(text) })}
                    style={styles.input}
                />
            ) : (
                <Text>{appartement.taille}</Text>
            )}

            <Text style={styles.label}>Type Appartement</Text>
            {isEditing ? (
                <TextInput
                    value={editedAppartement.NumeroTypeAppartement.toString()}
                    onChangeText={(text) => setEditedAppartement({ ...editedAppartement, NumeroTypeAppartement: parseFloat(text) })}
                    style={styles.input}
                />
            ) : (
                <Text>{appartement.NumeroTypeAppartement}</Text>
            )}

            <Text style={styles.label}>Ascenseur</Text>
            {appartement.Ascenseur ? <Text>Ascenseur disponible</Text> : <Text>Pas d'ascenseur</Text>}

            <Text style={styles.label}>Préavis</Text>
            {appartement.Preavis ? <Text>Préavis</Text> : <Text>Pas de préavis</Text>}

            {proprios.length > 0 ? (
                    <View >
                        <Text style={styles.label}>Les proprietaires :</Text>
                        {proprios.map((proprio) => (
                            <View key={proprio.NumeroProprietaire} style={styles.proprio}>

                                <Text style={styles.text}>Nom, prenom : {proprio.Nom}, {proprio.Prenom}</Text>
                                <Text style={styles.text}>Tel : {proprio.Tel}</Text>
                                <Text style={styles.text}>Ville : {proprio.Ville}, {proprio.CP}</Text>
                                <Text style={styles.text}>Date d'achat : {new Date(proprio.Date_Debut).toLocaleDateString('fr-FR')}</Text>
                                {proprio.Date_Fin && <Text style={styles.text}>Date de vente : {new Date(proprio.Date_Fin).toLocaleDateString('fr-FR')}</Text>}

                                {/*<View style={styles.text}>*/}
                                {/*    <Button*/}
                                {/*        title="Supprimer la demande"*/}
                                {/*        onPress={() => handleDeleteDemande(demande.NumeroDemande)}*/}
                                {/*        disabled={isLoading} // désactiver le bouton pendant la suppression*/}
                                {/*        color="#ff0000"*/}
                                {/*    />*/}
                                {/*</View>*/}
                            </View>
                        ))}
                    </View>)
            :
            <Text>Pas de proprietaire</Text>}

            {locataires.length > 0 ? (
                    <View >
                        <Text style={styles.label}>Les locataires :</Text>
                        {locataires.map((locataire) => (
                            <View key={locataire.NumeroLocataire} style={styles.proprio}>

                                <Text style={styles.text}>Nom, prenom : {locataire.Nom}, {locataire.Prenom}</Text>
                                <Text style={styles.text}>Tel : {locataire.Tel}</Text>
                                <Text style={styles.text}>Date d'arrivée : {new Date(locataire.Date_Debut).toLocaleDateString('fr-FR')}</Text>
                                {locataire.Date_Fin && <Text style={styles.text}>Date de départ : {new Date(locataire.Date_Fin).toLocaleDateString('fr-FR')}</Text>}

                                {/*<View style={styles.text}>*/}
                                {/*    <Button*/}
                                {/*        title="Supprimer la demande"*/}
                                {/*        onPress={() => handleDeleteDemande(demande.NumeroDemande)}*/}
                                {/*        disabled={isLoading} // désactiver le bouton pendant la suppression*/}
                                {/*        color="#ff0000"*/}
                                {/*    />*/}
                                {/*</View>*/}
                            </View>
                        ))}
                    </View>)
                :
                <Text>Pas de locataire</Text>}


            {isEditing ? (
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => {
                    setIsEditing(true);
                    setEditedAppartement({
                        ...editedAppartement,
                        NumeroAppartement: appartement.NumeroAppartement,
                        Numero_Arrondissement : appartement.Numero_Arrondissement
                    })
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>

            )}
        </View>
        </ScrollView>
    );



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop:5
    },
    proprio: {
        fontSize:16,
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

