import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as apiOccuper from "../../../modeles/adapter/occuper";
import {Formik} from "formik";
import * as Yup from "yup"
import * as apiAppartement from "../../../modeles/adapter/appartement";
import {Picker} from '@react-native-picker/picker';



export default function  AjouterLocation ({ route, navigation })  {

    const { locataire } = route.params;
    const [Appartements, setAppartements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState("1");

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
    const formatDate = (date) => {
        const formattedDate = date ? new Date(date).toISOString().slice(0, 10).split('-').join('/') : new Date().toISOString().slice(0, 10).split('-').join('/');
        return formattedDate;
    };
    const handleAddLocation = (values) => {
        const newLocation = {
            Date_Debut: formatDate(values.Date_Debut),
            Date_Fin: values.Date_Fin ? formatDate(values.Date_Fin) : null,
            NumeroLocataire: locataire.NumeroLocataire,
            NumeroAppartement: selectedAppartement,
        };
        apiOccuper.add(newLocation)
            .then(() => {
                navigation.goBack();
                console.log(newLocation)
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    NumeroAppartement: 1,
                    NumeroLocataire: 1,
                    Date_Debut: "",
                    Date_Fin: "",
                }}
                onSubmit={(values) => {
                    handleAddLocation(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Date d'arrivée ( automatiquement aujourd'hui ) :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la date"
                            onChangeText={handleChange("Date_Debut")}
                            onBlur={handleBlur("Date_Debut")}
                            value={values.Date_Debut}
                        />
                        {errors.Date_Debut && (<Text style={styles.error}>{errors.Date_Debut}</Text>)}

                        <Text style={styles.label}>Date de départ ( pas remplir si pas prévue ) :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la date de départ"
                            onChangeText={handleChange("Date_Fin")}
                            onBlur={handleBlur("Date_Fin")}
                            value={values.Date_Fin}
                        />
                        {errors.Date_Fin && (<Text style={styles.error}>{errors.Date_Fin}</Text>)}

                        <Picker
                            selectedValue={selectedAppartement}
                            onValueChange={handleAppartementChange}>
                            {Appartements.map((unAppartement) => (
                                <Picker.Item key={unAppartement.NumeroAppartement} label={unAppartement.Num_Rue + " " + unAppartement.Rue} value={unAppartement.NumeroAppartement} />
                            ))}
                        </Picker>

                        <Button title="Ajouter" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
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




