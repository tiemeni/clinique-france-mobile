import React from "react";
import { Modal, View, Text } from "react-native";
import colors from "../../constants/colours";
import { AntDesign } from "@expo/vector-icons";

const ModalPaySuccess = ({ isVisible, onClose, isLoader, title }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 8,
            width: "80%",
          }}
        >
          <View style={{alignItems:"center", marginBottom:5}}>
            <AntDesign name="checkcircle" size={60} color={colors.yellow} />
          </View>
          <Text
            style={{
              color: colors.white,
              fontSize: 28,
              textAlign: "center",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {title}
          </Text>

          {/*{isLoader && (
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator  size="small" color={colors.white} />
          </View>
          )}*/}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPaySuccess;
