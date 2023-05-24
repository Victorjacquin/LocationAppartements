import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, View, ScrollView, Button} from "react-native";
import * as apiAppartement from "../../../modeles/adapter/appartement";
import * as apiTypeAppartement from "../../../modeles/adapter/typeAppartement"
import {Formik} from "formik";
import * as Yup from "yup";
import {Picker} from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';



const AjouterAppartement = ({ navigation }) => {

    const [TypesAppartements, setTypesAppartements] = useState([]);
    const [selectedTypeAppartement, setSelectedTypeAppartement] = useState("");

    const [Ascenseur, setAscenseur] = useState(false)
    const [Preavis, setPreavis] = useState(false)

    const handleTypeAppartementChange = (typeAppartement) => {
        setSelectedTypeAppartement(typeAppartement);
    };


    useEffect(() => {
        apiTypeAppartement.list()
            .then(response => {
                setTypesAppartements(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const handleAddAppartement = async (values) => {
        const newAppartement = {
            Rue : values.Rue,
            Num_Rue : values.Num_Rue,
            Ville: values.Ville,
            CP: values.CP,
            Prix_Location: values.Prix_Location,
            Prix_Charge: values.Prix_Charge,
            Ascenseur: Ascenseur,
            Preavis: Preavis,
            Etage: values.Etage,
            NumeroTypeAppartement: selectedTypeAppartement,
            Numero_Arrondissement: values.Numero_Arrondissement,
            Taille: values.Taille
        };
        try {
            await apiAppartement.add(newAppartement);
            navigation.goBack();
        } catch (error) {
            console.error(error);
            // Gérer l'erreur ici
        }
    };

    return (
        <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
            <Formik
                initialValues={{
                    Rue : "",
                    Num_Rue : "",
                    Ville: "",
                    CP: "",
                    Prix_Location: "",
                    Prix_Charge: "",
                    Ascenseur: 0,
                    Preavis: 0,
                    Etage: "",
                    NumeroTypeAppartement: "",
                    Numero_Arrondissement: "",
                    Taille: ""
                }}
                onSubmit={(values) => {
                    handleAddAppartement(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Ville :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la Ville "
                            onChangeText={handleChange("Ville")}
                            onBlur={handleBlur("Ville")}
                            value={values.Ville}
                        />
                        {errors.Ville && (<Text style={styles.error}>{errors.Ville}</Text>)}

                        <Text style={styles.label}>CP :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le code postal "
                            onChangeText={handleChange("CP")}
                            onBlur={handleBlur("CP")}
                            value={values.CP}
                        />
                        {errors.CP && (<Text style={styles.error}>{errors.CP}</Text>)}

                        <Text style={styles.label}>Rue :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la rue"
                            onChangeText={handleChange("Rue")}
                            onBlur={handleBlur("Rue")}
                            value={values.Rue}
                        />
                        {errors.Rue && (<Text style={styles.error}>{errors.Rue}</Text>)}



                        <Text style={styles.label}>Numéro de la rue:</Text>
                        <TextInput style={styles.input}
                                   placeholder="Entrez le numéro de la rue"
                                   onChangeText={handleChange("Num_Rue")}
                                   onBlur={handleBlur("Num_Rue")}
                                   value={values.Num_Rue}
                        />
                        {errors.Num_Rue && (<Text style={styles.error}>{errors.Num_Rue}</Text>)}

                        <Text style={styles.label}>Numéro d'arrondissement :</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le numéro de l'arrondissement"
                            onChangeText={handleChange("Numero_Arrondissement")}
                            onBlur={handleBlur("Numero_Arrondissement")}
                            value={values.Numero_Arrondissement}
                        />
                        {errors.Numero_Arrondissement && (
                            <Text style={styles.error}>{errors.Numero_Arrondissement}</Text>
                        )}

                        <Text style={styles.label}>Prix de la location:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prix de la location"
                            onChangeText={handleChange("Prix_Location")}
                            onBlur={handleBlur("Prix_Location")}
                            value={values.Prix_Location}
                        />
                        {errors.Prix_Location && (<Text style={styles.error}>{errors.Prix_Location}</Text>)}

                        <Text style={styles.label}>Prix des charges :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prix des charges"
                            onChangeText={handleChange("Prix_Charge")}
                            onBlur={handleBlur("Prix_Charge")}
                            value={values.Prix_Charge}
                        />
                        {errors.Prix_Charge && (
                            <Text style={styles.error}>{errors.Prix_Charge}</Text>
                        )}

                        <Text style={styles.label}>Ascenseur :</Text>

                        <Checkbox value={Ascenseur} onValueChange={(newValue) => setAscenseur(newValue)} />

                        <Text style={styles.label}>Préavis :</Text>

                        <Checkbox value={Preavis} onValueChange={(newValue) => setPreavis(newValue)} />

                        <Text style={styles.label}>Etage :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez l'étage"
                            onChangeText={handleChange("Etage")}
                            onBlur={handleBlur("Etage")}
                            value={values.Etage}
                        />
                        {errors.Etage && (
                            <Text style={styles.error}>{errors.Etage}</Text>
                        )}

                        <Picker
                            selectedValue={selectedTypeAppartement}
                            onValueChange={handleTypeAppartementChange}>
                            {TypesAppartements.map((unAppartement) => (
                                <Picker.Item key={unAppartement.NumeroTypeAppartement} label={unAppartement.Libelle} value={unAppartement.NumeroTypeAppartement} />
                            ))}
                        </Picker>

                        <Text style={styles.label}>Taille :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la taille en m²"
                            onChangeText={handleChange("Taille")}
                            onBlur={handleBlur("Taille")}
                            value={values.Taille}
                        />
                        {errors.Taille && (
                            <Text style={styles.error}>{errors.Taille}</Text>
                        )}

                        <Button title="Ajouter l'appartement " onPress={handleSubmit} />

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



export default AjouterAppartement;

