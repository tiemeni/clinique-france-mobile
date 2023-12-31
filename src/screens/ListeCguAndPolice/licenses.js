import React from "react";
import { Text, View, ScrollView } from "react-native";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import TitreAndText from "./titreAndText";
import { licenseSections } from "../../utils/helper";

const Licenses = () => {
  const translate = useTranslation().t;
  return (
    <View>
      <Header bg={"white"} title={translate("TEXT.LICENSES_REMERCIEMENT")} />
      <ScrollView>
      <View style={styles.constainer}>
        <Text style={styles.title}>Dernière mise à jour: 25 Août 2023</Text>
        <View>
        {licenseSections.map((section, index) => (
        <TitreAndText key={index} titre={section.title} describe={section.content}/>
      ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Licenses;
