import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native";
import * as apiOccuper from "../../../modeles/adapter/occuper";
import {Formik} from "formik";
import * as Yup from "yup"
import * as apiAppartement from "../../../modeles/adapter/appartement";
import * as apiLocataire from "../../../modeles/adapter/locataire";
import * as apiBanque from "../../../modeles/adapter/banque";
import * as apiClient from "../../../modeles/adapter/client";
import {Picker} from '@react-native-picker/picker';



export default function  becomeLocataire ({ route, navigation })  {

    const { client } = route.params;
    const [Appartements, setAppartements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState("1");

    const [banques, setBanques] = useState([])
    const [selectedBanque, setSelectedBanque] = useState("");

    const handleBanqueChange = (banque) => {
        setSelectedBanque(banque);
    };

    useEffect(() => {
        apiAppartement.showLibre()
            .then(response => {
                setAppartements(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleAppartementChange = (Appartements) => {
        setSelectedAppartement(Appartements);
    };

    useEffect(() => {
        apiBanque.list()
            .then(response => {
                setBanques(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const formatDate = (date) => {
        const formattedDate = date ? new Date(date).toISOString().slice(0, 10).split('-').join('/') : new Date().toISOString().slice(0, 10).split('-').join('/');
        return formattedDate;
    };


    const handleAddLocation = (values) => {

        const [day, month, year] = values.Date_Naissance.split("/");
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const newLocataire = {
            Date_Naissance : formattedDate,
            Numero_Compte_Bancaire : values.Numero_Compte_Bancaire,
            NumeroBanque : selectedBanque,
            Nom : client.Nom,
            Prenom : client.Prenom,
            Tel : client.Tel
        }

        apiLocataire.add(newLocataire)
            .then(() => {
                apiClient.sup(client.NumeroClient)
                navigation.goBack();
                navigation.goBack();
            })
            .catch(error => {
                console.error(error);
            });
    };



    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
                initialValues={{
                    Nom: "",
                    Prenom: "",
                    Tel: "",
                    Date_Naissance: "",
                    NumeroBanque: "",
                    Numero_Compte_Bancaire: "",

                }}
                onSubmit={(values) => {
                    handleAddLocation(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Date de naissance :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="dd/mm/aaaa "
                            onChangeText={handleChange("Date_Naissance")}
                            onBlur={handleBlur("Date_Naissance")}
                            value={values.Date_Naissance}
                        />
                        {errors.Date_Naissance && (<Text style={styles.error}>{errors.Date_Naissance}</Text>)}

                        <Text style={styles.label}>Banque:</Text>
                        <Picker
                            selectedValue={selectedBanque}
                            onValueChange={handleBanqueChange}>
                            {banques.map((uneBanque) => (
                                <Picker.Item style={styles.picker} key={uneBanque.NumeroBanque} label={uneBanque.Nom} value={uneBanque.NumeroBanque} />
                            ))}
                        </Picker>

                        <Text style={styles.label}>Numero compte bancaire:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le numero de compte bancaire"
                            onChangeText={handleChange("Numero_Compte_Bancaire")}
                            onBlur={handleBlur("Numero_Compte_Bancaire")}
                            value={values.Numero_Compte_Bancaire}
                        />
                        {errors.Numero_Compte_Bancaire && (<Text style={styles.error}>{errors.Numero_Compte_Bancaire}</Text>)}

                        <Button title="Ajouter" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    error: {
        color: "red",
    },
});




