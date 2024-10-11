import React, { useEffect, useRef } from "react";
import colors from "../../constants/colours";
import { ArrowLeft } from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchPratByKey } from "../../redux/Praticiens/actions";
// import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS from "../../constants/screens";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { getDispo, getMotifs } from "../../redux/RDV/actions";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput } from "react-native-paper";

export const GlobalSearch = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedPrats = useSelector((state) => state.Praticiens.searchedPrats);
  const loadingSearch = useSelector(
    (state) => state.Praticiens.loadingSearchPrats
  );
  const InputRef = useRef();

  const handleSearch = (key) => {
    dispatch(searchPratByKey(key));
  };

  useEffect(() => {
    console.log("Liste des praticiens : ", searchedPrats);
    console.log("Liste des praticiens en cours : ", loadingSearch);
  }, [searchedPrats, loadingSearch]);

  useEffect(() => {
    setTimeout(() => InputRef.current.focus(), 100);
  }, []);

  const renderItem = ({ item }) => {
    // Modifier la condition pour vérifier les données disponibles et non "affectation"
    if (item?.job?._id) {
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              getDispo({
                idCentre: item?.idCentre,
                idp: item?._id,
              })
            );
            dispatch(getMotifs({ id: item?.job?._id, forSpec: true }));
            navigation.navigate(SCREENS.DETAILS_PRATICIEN, {
              praticien: item,
            });
          }}
        >
          <DoctorCard
            nom_complet={item?.name + " " + item?.surname}
            clinique={item?.affectation?.[0]?.label || "Aucune clinique"} // Gérer le cas où affectation est manquant
            speciality={item?.job?.label || "Non spécifié"}
          />
        </TouchableOpacity>
      );
    }
    return null; // Renvoyer null si la condition n'est pas remplie
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View
      flex={1}
      style={{ paddingVertical: 6, backgroundColor: colors.white }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 10,
        }}
      >
        <ArrowLeft
          onPress={() => navigation.goBack()}
          size={24}
          color={colors.primary}
        />
        <TextInput
          outlineStyle={{ borderRadius: 15, borderColor: colors.desable }}
          mode="outlined"
          keyboardType="default"
          ref={InputRef}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Rechercher un spécialiste"
          style={{ width: "90%", backgroundColor: colors.desable, height: 45 }}
        />
      </View>

      {loadingSearch ? (
        // Indicateur de chargement si la recherche est en cours
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <ActivityIndicator size={40} color={colors.primary} />
        </View>
      ) : searchedPrats?.length > 0 ? (
        // Affichage de la FlatList si des résultats sont trouvés
        <FlatList
          data={searchedPrats}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        // Affichage d'un message si aucune donnée n'est trouvée
        <View
          style={{
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.text_grey_hint }}>
            Aucune donnée trouvée
          </Text>
        </View>
      )}
    </View>
  );
};
