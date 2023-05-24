import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView} from "react-native";
import * as apiDemande from "../../../modeles/adapter/demande";
import {Formik} from "formik";
import * as Yup from "yup"
import {Picker} from "@react-native-picker/picker";
import * as apiAppartement from "../../../modeles/adapter/appartement";
import * as apiPays from "../../../modeles/adapter/pays";
import * as apiVille from "../../../modeles/adapter/ville";
import * as apiDepartement from "../../../modeles/adapter/departements";



export default function  AjouterDemande ({ route, navigation })  {

    useEffect(() => {
        apiVille.list()
            .then(response => {
                setVilles(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        apiDepartement.list()
            .then(response => {
                setDepartement(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        apiPays.list()
            .then(response => {
                setPays(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const { client } = route.params;

    const [pays, setPays] = useState([]);
    const [selectedPays, setSelectedPays] = useState("");

    const [Departement, setDepartement] = useState([]);
    const [selectedDepartement, setSelectedDepartement] = useState("");

    const [Villes, setVilles] = useState([]);
    const [selectedVilles, setSelectedVilles] = useState("");


    const handleVilleChange = (Villes) => {
        setSelectedVilles(Villes);
    };


    const handlePaysChange = (Pays) => {
        setSelectedPays(Pays);
    };


    const handleDepartementChange = (Departements) => {
        setSelectedDepartement(Departements);
    };

    const formatDate = (date) => {
        const formattedDate = date ? new Date(date).toISOString().slice(0, 10).split('-').join('/') : new Date().toISOString().slice(0, 10).split('-').join('/');        return formattedDate;
    };
    const handleAddDemande = (values) => {
        const newDemande = {
            Date_Demande: formatDate(values.Date_Demande),
            Prix_min: values.Prix_min,
            Prix_max: values.Prix_max,
            NumeroClient: client.NumeroClient,
            NumeroArrondissement: values.NumeroArrondissement,
            NumeroPays: selectedPays,
            NumeroDepartement: selectedDepartement,
            NumeroVille: selectedVilles,
        };
        apiDemande.add(newDemande)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
                initialValues={{
                    Date_Demande: "",
                    Prix_min: "",
                    Prix_max: "",
                    NumeroArrondissement: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddDemande(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.label}>Date de la demande ( automatiquement aujourd'hui ):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la date"
                            onChangeText={handleChange("Date_Demande")}
                            onBlur={handleBlur("Date_Demande")}
                            value={values.Date_Demande}
                        />
                        {errors.Date_Demande && (<Text style={styles.error}>{errors.Date_Demande}</Text>)}

                        <Text style={styles.label}>Prix Minimum:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prix minimum"
                            onChangeText={handleChange("Prix_min")}
                            onBlur={handleBlur("Prix_min")}
                            value={values.Prix_min}
                        />
                        {errors.Prix_min && (<Text style={styles.error}>{errors.Prix_min}</Text>)}

                        <Text style={styles.label}>Prix Maximum:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prix maximum"
                            onChangeText={handleChange("Prix_max")}
                            onBlur={handleBlur("Prix_max")}
                            value={values.Prix_max}
                        />
                        {errors.Prix_max && (<Text style={styles.error}>{errors.Prix_max}</Text>)}

                        <Text style={styles.label}>Numero Arrondissement:</Text>
                        <TextInput style={styles.input}
                                   placeholder="Entrez le numero de l'arrondissement"
                                   onChangeText={handleChange("NumeroArrondissement")}
                                   onBlur={handleBlur("NumeroArrondissement")}
                                   value={values.NumeroArrondissement}
                        />
                        {errors.NumeroArrondissement && (<Text style={styles.error}>{errors.NumeroArrondissement}</Text>)}

                        <Picker
                            selectedValue={selectedPays}
                            onValueChange={handlePaysChange}>
                            {pays.map((unpays) => (
                                <Picker.Item key={unpays.NumeroPays} label={unpays.NomPays} value={unpays.NumeroPays} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={selectedDepartement}
                            onValueChange={handleDepartementChange}>
                            {Departement.map((unDepartement) => (
                                <Picker.Item key={unDepartement.NumeroDepartement} label={unDepartement.NomDepartement} value={unDepartement.NumeroDepartement} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={selectedVilles}
                            onValueChange={handleVilleChange}>
                            {Villes.map((uneVille) => (
                                <Picker.Item key={uneVille.NumeroVille} label={uneVille.NomVille} value={uneVille.NumeroVille} />
                            ))}
                        </Picker>
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

const validationSchema = Yup.object().shape({
    Prix_min: Yup.string()
        .required("Le nom est obligatoire"),
    Prix_max: Yup.string()
        .required("Le prénom est obligatoire")
        .test("max", "Le prix maximum doit être supérieur ou égal au prix minimum", function (value) {
            const { Prix_min } = this.parent; // Récupérer la valeur de Prix_min
            return !Prix_min || !value || parseFloat(value) >= parseFloat(Prix_min);
        }),
    NumeroArrondissement: Yup.string()
        .required("Le téléphone est obligatoire"),
});


