import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as apiClient from "../../../modeles/adapter/client";
import {Formik} from "formik";
import * as Yup from "yup"



const AjouterClient = ({ navigation }) => {
    const handleAddClient = (values) => {
        const newClient = {
            Nom: values.Nom,
            Prenom: values.Prenom,
            Tel: values.Tel,
            Nom_Rue: values.Nom_Rue,
            Numero_Rue: values.Numero_Rue,
            Ville: values.Ville,
            CP: values.CP,
        };
        apiClient.add(newClient);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    Nom: "",
                    Prenom: "",
                    Tel: "",
                    Nom_Rue: "",
                    Numero_Rue: "",
                    Ville: "",
                    CP: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddClient(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Nom:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le nom du client"
                            onChangeText={handleChange("Nom")}
                            onBlur={handleBlur("Nom")}
                            value={values.Nom}
                        />
                        {errors.Nom && (<Text style={styles.error}>{errors.Nom}</Text>)}

                        <Text style={styles.label}>Prénom:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prénom du client"
                            onChangeText={handleChange("Prenom")}
                            onBlur={handleBlur("Prenom")}
                            value={values.Prenom}
                        />
                        {errors.Prenom && (<Text style={styles.error}>{errors.Prenom}</Text>)}

                        <Text style={styles.label}>Téléphone:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le téléphone du client"
                            onChangeText={handleChange("Tel")}
                            onBlur={handleBlur("Tel")}
                            value={values.Tel}
                        />
                        {errors.Tel && (<Text style={styles.error}>{errors.Tel}</Text>)}

                        <Text style={styles.label}>Nom de rue:</Text>
                        <TextInput
                            style={styles.input}
                                   placeholder="Entrez le nom de rue du client"
                                   onChangeText={handleChange("Nom_Rue")}
                                   onBlur={handleBlur("Nom_Rue")}
                                   value={values.Nom_Rue}
                        />
                        {errors.Nom_Rue && (<Text style={styles.error}>{errors.Nom_Rue}</Text>)}
                        <Text style={styles.label}>Numéro de rue:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le numéro de rue du client"
                            onChangeText={handleChange("Numero_Rue")}
                            onBlur={handleBlur("Numero_Rue")}
                            value={values.Numero_Rue}
                        />
                        {errors.Numero_Rue && (
                            <Text style={styles.error}>{errors.Numero_Rue}</Text>
                        )}

                        <Text style={styles.label}>Ville:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la ville du client"
                            onChangeText={handleChange("Ville")}
                            onBlur={handleBlur("Ville")}
                            value={values.Ville}
                        />
                        {errors.Ville && (<Text style={styles.error}>{errors.Ville}</Text>)}

                        <Text style={styles.label}>Code postal:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le code postal du client"
                            onChangeText={handleChange("CP")}
                            onBlur={handleBlur("CP")}
                            value={values.CP}
                        />
                        {errors.CP && (
                            <Text style={styles.error}>{errors.CP}</Text>
                        )}

                        <Button title="Ajouter le client" onPress={handleSubmit} />
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

const validationSchema = Yup.object().shape({
    Nom: Yup.string()
        .required("Le nom est obligatoire")
        .min(2, "Trop court")
        .max(15, "Trop long"),

    Prenom: Yup.string()
        .required("Le prénom est obligatoire")
        .min(2, "Trop court")
        .max(15, "Trop long"),

    Tel: Yup.string()
        .required("Le téléphone est obligatoire")
        .min(8, "Trop court")
        .max(14, "Trop long"),

    Nom_Rue: Yup.string()
        .required("Le nom de rue est obligatoire")
        .min(5, "Trop court")
        .max(30, "Trop long"),

    Numero_Rue: Yup.number()
        .required("Le numéro de rue est obligatoire"),

    Ville: Yup.string()
        .required("La ville est obligatoire")
        .min(3, "Trop court")
        .max(13, "Trop long"),

    CP: Yup.number()
        .required("Le code postal est obligatoire")
        .min(5, "Trop court")

});

export default AjouterClient;

