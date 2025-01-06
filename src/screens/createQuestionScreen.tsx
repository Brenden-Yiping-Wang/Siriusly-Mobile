import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

const questions = [
  { question: "What is your gender?", options: ["Male", "Female"] },
  {
    question: "What is your age group?",
    options: ["Under 18", "18-24", "25-34", "35-44", "45+"],
  },
  // Add more questions as needed
];

type RootStackParamList = {
  Profile: undefined;
  // Add other routes here if needed
};

const CreateQuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("Profile");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <ProgressBar
        style={{ width: "100%", height: 10 }}
        progress={progress}
        color="black"
      />

      <Text style={styles.question}>
        {questions[currentQuestionIndex].question}
      </Text>
      {questions[currentQuestionIndex].options.map((option) => (
        <Button
          key={option}
          title={option}
          onPress={() => handleAnswer(option)}
        />
      ))}
      {currentQuestionIndex > 0 && <Button title="Back" onPress={handleBack} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CreateQuestionScreen;
