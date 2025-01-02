import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const NetworkError = ({ message, onRetry }: {message: any, onRetry: () => void}) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="exclamation-circle" size={50} color="#FF3B30" />
      <Text style={styles.errorMessage}>{message || "Network error occurred"}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  errorMessage: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  retryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NetworkError;
