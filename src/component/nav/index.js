import Ionicons from "react-native-vector-icons/Ionicons";
import RechercheAppartement from "../Appartements/rechercheAppartement";
import InformationsClient from "../Clients/show";
import AjouterClient from "../Clients/add";
import RechercheClient from "../Clients/rechercheClient";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import RechercheLocataire from "../Locataires/rechercheLocataire";
import InformationsLocataire from "../Locataires/show";
import AjouterLocataire from "../Locataires/add";
import RechercheProprietaire from "../Proprietaires/rechercheProprietaire";
import InformationsProprietaire from "../Proprietaires/show";
import AjouterProprietaire from "../Proprietaires/add";
import InformationsAppartement from "../Appartements/show";
import AjouterAppartement from "../Appartements/add";
import AjouterDemande from "../Clients/addDemande";
import AjouterVisite from "../Clients/addVisite";
import AjouterLocation from "../Locataires/addLocation";
import becomeLocataire from "../Clients/becomeLocataire";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function AppartementsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RechercheAppartement"
                component={RechercheAppartement}
                options={{ title: "Recherche Appartement", headerShown : false}}
            />
            <Stack.Screen
                name="InformationsAppartement"
                component={InformationsAppartement}
                options={{ title: "Informations de l'appartement" }}
            />
            <Stack.Screen
                name="AjouterAppartement"
                component={AjouterAppartement}
                options={{ title: "Ajouter un nouvel appartement" }}
            />

        </Stack.Navigator>
    );
}
function ClientsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RechercheClient"
                component={RechercheClient}
                options={{ title: "Recherche Client", headerShown : false}}
            />
            <Stack.Screen
                name="InformationsClient"
                component={InformationsClient}
                options={{ title: "Informations du Client" }}
            />
            <Stack.Screen
                name="AjouterClient"
                component={AjouterClient}
                options={{ title: "Ajouter un nouveau client" }}
            />
            <Stack.Screen
                name="AjouterDemande"
                component={AjouterDemande}
                options={{ title: "Ajouter une nouvelle demande" }}
            />
            <Stack.Screen
                name="AjouterVisite"
                component={AjouterVisite}
                options={{ title: "Ajouter une nouvelle visite" }}
            />
            <Stack.Screen
                name="becomeLocataire"
                component={becomeLocataire}
                options={{ title: "Devenir locataire" }}
            />
        </Stack.Navigator>
    );
}


function ProprietairesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RechercheProprietaire"
                component={RechercheProprietaire}
                options={{ title: "Recherche Proprietaire", headerShown : false}}
            />
            <Stack.Screen
                name="InformationsProprietaire"
                component={InformationsProprietaire}
                options={{ title: "Informations du Proprietaire" }}
            />
            <Stack.Screen
                name="AjouterProprietaire"
                component={AjouterProprietaire}
                options={{ title: "Ajouter un nouveau Proprietaire" }}
            />
        </Stack.Navigator>
    );
}


function LocatairesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RechercheLocataire"
                component={RechercheLocataire}
                options={{ title: "Recherche Locataire", headerShown : false}}
            />
            <Stack.Screen
                name="InformationsLocataire"
                component={InformationsLocataire}
                options={{ title: "Informations du Locataire" }}
            />
            <Stack.Screen
                name="AjouterLocataire"
                component={AjouterLocataire}
                options={{ title: "Ajouter un nouveau locataire" }}
            />
            <Stack.Screen
                name="AjouterLocation"
                component={AjouterLocation}
                options={{ title: "Ajouter une location" }}
            />
        </Stack.Navigator>
    );
}

export default function Nav() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Demandes") {
                            iconName = "newspaper-sharp";
                        } else if (route.name === "Clients") {
                            iconName = "search-sharp";
                        } else if (route.name === "Locataires") {
                            iconName = "people-sharp";
                        } else if (route.name === "Appartements") {
                            iconName = "home-sharp";
                        } else if (route.name === "Proprietaires") {
                            iconName = "key-sharp";
                        } else if (route.name === "Visites") {
                            iconName = "map-sharp";
                        } else if (route.name === "Cotisations") {
                            iconName = "wallet-sharp";
                        }

                        return <Ionicons name={iconName} size={20} />;
                    },
                })}
            >
                <Tab.Screen name="Clients" component={ClientsStack} />
                <Tab.Screen name="Locataires" component={LocatairesStack} />
                <Tab.Screen name="Appartements" component={AppartementsStack} />
                <Tab.Screen name="Proprietaires" component={ProprietairesStack} />
                <Tab.Screen name="Cotisations" component={RechercheAppartement} />
            </Tab.Navigator>

        </NavigationContainer>


    );
}
