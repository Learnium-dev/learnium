import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../assets/common/global-styles";

// SVGs
import LumiCloseQuiz from "../../assets/images/characters/lumiQuizClose.svg";
import LumiFinishQuiz from "../../assets/images/characters/lumiQuizFinish.svg";

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
      <Modal
        animationType="slide" // You can use different animation types
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!subTitle ? <LumiFinishQuiz /> : <LumiCloseQuiz />}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <View style={styles.navigationButton}>
              <TouchableOpacity
                onPress={handleLeftBtn}
                style={[styles.previousButton]}
              >
                <Text
                  style={[
                    styles.textBold,
                    styles.textAlignCenter,
                    { color: "#7000FF" },
                  ]}
                >
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
  title: {
    fontFamily: "Gabarito-Bold",
    fontSize: 19,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 10,
  },
  subTitle: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    lineHeight: 23,
  },
  navigationButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  previousButton: {
    // width: "45%",
    flex: 1,
    backgroundColor: "white",
    borderColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 16,
    borderWidth: 2,
  },
  nextButton: {
    // width: "45%",
    flex: 1,
    backgroundColor: globalStyles.colors.primary,
    borderRadius: 40,
    padding: 16,
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
    width: "90%",
    height: "50%",
    borderRadius: 20,
    padding: 17,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
