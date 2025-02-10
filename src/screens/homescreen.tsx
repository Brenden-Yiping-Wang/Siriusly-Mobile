import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

const { width, height } = Dimensions.get("window");

// Define the question type
type QuestionType = {
  question: string;
  choices: string[];
};

// Function to fetch questions from the endpoint
const fetchQuestions = async (): Promise<QuestionType[]> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/question/prepared-for/111"
    );
    const questions = response.data;
    // Map the response into our QuestionType
    const filteredQuestions: QuestionType[] = questions.map(
      ({ question, choices }: { question: string; choices: string[] }) => ({
        question,
        choices,
      })
    );
    return filteredQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

const HomeScreen = () => {
  const swiperRef = useRef<Swiper<QuestionType>>(null);
  const [score, setScore] = useState(80);
  // Maintain a deck with only the unswiped questions.
  const [deck, setDeck] = useState<QuestionType[]>([]);

  // Load more questions when the deck is low
  const loadMoreQuestions = async () => {
    if (deck.length < 5) {
      const newQuestions = await fetchQuestions();
      if (newQuestions.length > 0) {
        setDeck((prevDeck) => [...prevDeck, ...newQuestions]);
      }
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreQuestions();
  }, []);

  // When the deck changes and is low, try to load more
  useEffect(() => {
    if (deck.length < 5) {
      loadMoreQuestions();
    }
  }, [deck]);

  // Render a single card. Use a guard in case the card is undefined.
  const renderCard = (card: QuestionType | undefined) => {
    if (!card) {
      return (
        <View style={styles.card}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{card.question}</Text>
        {card.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.choiceRow}
            onPress={() => {
              // Here you can update score or perform any action.
              // Programmatically swipe right when an option is selected.
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
  };

  // When a card is swiped, remove it from the deck.
  const onSwiped = (cardIndex: number) => {
    setDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.splice(cardIndex, 1);
      return newDeck;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {deck.length > 0 ? (
        <Swiper
          key={deck.length} // Use deck.length as key to force re-mount when deck updates.
          ref={swiperRef}
          cards={deck}
          renderCard={renderCard}
          onSwiped={onSwiped}
          onSwipedAll={() => {
            console.log("All cards swiped");
          }}
          backgroundColor={"#f5f5f5"}
          stackSize={3} // Show the next card underneath the current one.
          verticalSwipe={false} // Disable vertical swipes.
          animateCardOpacity // Smooth opacity animation during swipe.
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: "DISLIKE",
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
          horizontalSwipe={true} // Enable horizontal swipes.
        />
      ) : (
        <Text style={styles.loadingText}>Loading questions...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
    marginTop: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
  },
  card: {
    flex: 0.95,
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
    padding: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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

export default HomeScreen;
