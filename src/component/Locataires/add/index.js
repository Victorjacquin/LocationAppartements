import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native";
import * as apiLocataire from "../../../modeles/adapter/locataire";
import * as apiBanque from "../../../modeles/adapter/banque";
import {Formik} from "formik";
import * as Yup from "yup"
import {Picker} from "@react-native-picker/picker";




const AjouterLocataire = ({ navigation }) => {


    const [banques, setBanques] = useState([])
    const [selectedBanque, setSelectedBanque] = useState("");

    const handleBanqueChange = (banque) => {
        setSelectedBanque(banque);
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
    const handleAddLocataire = (values) => {
        const [day, month, year] = values.Date_Naissance.split("/");
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;


        const newLocataire = {
            Nom: values.Nom,
            Prenom: values.Prenom,
            Tel: values.Tel,
            Date_Naissance : formattedDate,
            NumeroBanque : selectedBanque,
            Numero_Compte_Bancaire : values.Numero_Compte_Bancaire
        };
        apiLocataire.add(newLocataire);
        navigation.goBack();
    };

    return (
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
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddLocataire(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <ScrollView>
                        <Text style={styles.label}>Nom:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le nom "
                            onChangeText={handleChange("Nom")}
                            onBlur={handleBlur("Nom")}
                            value={values.Nom}
                        />
                        {errors.Nom && (<Text style={styles.error}>{errors.Nom}</Text>)}

                        <Text style={styles.label}>Prénom:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le prénom "
                            onChangeText={handleChange("Prenom")}
                            onBlur={handleBlur("Prenom")}
                            value={values.Prenom}
                        />
                        {errors.Prenom && (<Text style={styles.error}>{errors.Prenom}</Text>)}

                        <Text style={styles.label}>Téléphone:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le téléphone "
                            onChangeText={handleChange("Tel")}
                            onBlur={handleBlur("Tel")}
                            value={values.Tel}
                        />
                        {errors.Tel && (<Text style={styles.error}>{errors.Tel}</Text>)}

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

                        <Button title="Ajouter le locataire" onPress={handleSubmit} />
                        </ScrollView>
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
    picker: {
        fontSize:10,
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

    Numero_Compte_Bancaire: Yup.string()
        .required("Le numero de compte bancaire est obligatoire")
        .min(7, "Trop court"),

});

export default AjouterLocataire;

