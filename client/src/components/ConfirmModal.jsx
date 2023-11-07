import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../assets/common/global-styles";

function ConfirmModal({
  isOpen,
  leftBtnFunction,
  rightBtnFunction,
  title,
  subTitle,
  leftBtnText,
  rightBtnText,
}) {
  console.log("isOpen", isOpen);
  const [isModalVisible, setIsModalVisible] = useState(isOpen);

  useEffect(() => {
    setIsModalVisible(isOpen);
  }, []);
  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleLeftBtn = () => {
    leftBtnFunction();
    setIsModalVisible(false);
  };

  return (
    <View>
      {/* <TouchableOpacity onPress={openModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide" // You can use different animation types
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{title}</Text>
            <Text>{subTitle}</Text>
            <View style={styles.navigationButton}>
              <TouchableOpacity
                onPress={handleLeftBtn}
                style={[styles.previousButton]}
              >
                <Text style={[styles.textBold, styles.textAlignCenter]}>
                  {leftBtnText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={rightBtnFunction}
                style={[styles.nextButton]}
              >
                <Text
                  style={[
                    styles.textWhite,
                    styles.textBold,
                    styles.textAlignCenter,
                  ]}
                >
                  {rightBtnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ConfirmModal;

const styles = StyleSheet.create({
  navigationButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previousButton: {
    width: "45%",
    backgroundColor: "white",
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
  },
  nextButton: {
    width: "45%",
    backgroundColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 20,
  },
  textWhite: {
    color: "white",
  },
  textDisable: {
    color: "rgba(0,0,0,0.25)",
  },
  textBold: {
    fontWeight: 700,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  background: {
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(255,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    height: "50%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.5,
  },
});
