import React, { useState } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";

const FormStepper = () => {
  const [formSteps, setFormSteps] = useState([
    { id: 1, title: "Step 1", content: "Content for step 1" },
    { id: 2, title: "Step 2", content: "Content for step 2" },
    { id: 3, title: "Step 3", content: "Content for step 3" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const renderFormStep = ({ item }) => (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{item.title}</Text>
      <Text>{item.content}</Text>
      {/* Implement input fields or other components for user input */}
      <TextInput style={{ borderWidth: 1, padding: 10, marginVertical: 10 }} />
    </View>
  );

  const handleNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={formSteps}
        renderItem={renderFormStep}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentStep}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Button
          title="Previous"
          onPress={handlePreviousStep}
          disabled={currentStep === 0}
        />
        <Button
          title={currentStep === formSteps.length - 1 ? "Submit" : "Next"}
          onPress={handleNextStep}
        />
      </View>
    </View>
  );
};

export default FormStepper;
