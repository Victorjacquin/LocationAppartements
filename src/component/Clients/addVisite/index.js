import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as apiVisite from "../../../modeles/adapter/visiter";
import {Formik} from "formik";
import * as Yup from "yup"
import * as apiAppartement from "../../../modeles/adapter/appartement";
import {Picker} from '@react-native-picker/picker';



export default function  AjouterVisite ({ route, navigation })  {

    const { client } = route.params;
    const [Appartements, setAppartements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState("");

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
        const formattedDate = date ? new Date(date).toISOString().slice(0, 10).split('-').join('/') : new Date().toISOString().slice(0, 10).split('-').join('/');        return formattedDate;
    };
    const handleAddVisite = (values) => {
        const newVisite = {
            Date_Visite: formatDate(values.Date_Visite),
            NumeroClient: client.NumeroClient,
            NumeroAppartement: selectedAppartement,
        };
        apiVisite.add(newVisite)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    Date_Demande: "",
                    Prix_min: "",
                    Prix_max: "",
                    NumeroArrondissement: "",
                }}
                onSubmit={(values) => {
                    handleAddVisite(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Date de la visite ( automatiquement aujourd'hui ):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la date"
                            onChangeText={handleChange("Date_Visite")}
                            onBlur={handleBlur("Date_Visite")}
                            value={values.Date_Visite}
                        />
                        {errors.Date_Visite && (<Text style={styles.error}>{errors.Date_Visite}</Text>)}

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




