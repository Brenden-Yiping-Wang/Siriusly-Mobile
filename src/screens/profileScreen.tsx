import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

const { width, height } = Dimensions.get("window");

// Add this type
type SwiperRefType = Swiper<any>;

const ProfileScreen = () => {
  const swiperRef = useRef<SwiperRefType>(null);

  const questions = [
    {
      question: "What is your preferred work environment?",
      choices: [
        "Office environment with collaborative teams",
        "Remote work with flexible hours",
        "Hybrid model combining both office and remote",
        "Independent consulting/freelance work",
      ],
    },
    {
      question: "Which career path interests you the most?",
      choices: [
        "Software Development",
        "Design & Creative",
        "Data Science & Analytics",
        "Product Management",
      ],
    },
    {
      question: "What's your ideal work-life balance?",
      choices: [
        "Standard 9-5 with weekends off",
        "Flexible hours with project-based deadlines",
        "Part-time work with more personal time",
        "Results-oriented schedule",
      ],
    },
    {
      question: "Which skills would you like to develop?",
      choices: [
        "Technical programming skills",
        "Creative and design abilities",
        "Data analysis and statistics",
        "Leadership and management",
      ],
    },
    {
      question: "What type of company culture do you prefer?",
      choices: [
        "Fast-paced startup environment",
        "Established corporate structure",
        "Creative agency atmosphere",
        "Research-focused organization",
      ],
    },
  ];

  const renderCard = (question: { question: string; choices: string[] }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{question.question}</Text>
      {question.choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={styles.choiceRow}
          onPress={() => {
            console.log(`Selected: ${choice}`);
            swiperRef.current?.swipeRight();
          }}
        >
          <Text style={[styles.icon, { fontSize: 18, fontWeight: "bold" }]}>
            {String.fromCharCode(65 + index)}
          </Text>
          <Text style={styles.choiceText}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={questions}
        renderCard={(card) => renderCard(card)}
        onSwiped={(cardIndex) => console.log(`Swiped card index: ${cardIndex}`)}
        onSwipedAll={() => console.log("All cards swiped")}
        cardIndex={0}
        backgroundColor={"#f5f5f5"}
        stackSize={3} // Show the next card under the current card
        verticalSwipe={false} // Disable vertical swipes
        animateCardOpacity // Smooth opacity animation during swipe
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: {
                backgroundColor: "red",
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                padding: 10,
                borderRadius: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: {
                backgroundColor: "green",
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                padding: 10,
                borderRadius: 10,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: 20,
              },
            },
          },
        }}
        horizontalSwipe={true} // Enable horizontal swipes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 60,
    width: "100%",
  },
  choiceText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
    flexWrap: "wrap",
    paddingVertical: 2,
    paddingRight: 10,
  },
  icon: {
    marginRight: 12,
  },
});

export default ProfileScreen;
