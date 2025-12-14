import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import axiosClient from "../../api/axiosClient";

export default function NewTaskScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams();

  const [title, setTitle] = useState(service ? String(service) : "");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Post task */
  const postTask = async () => {
    if (!title || !description || !amount) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axiosClient.post("/tasks/create-order", {
        category: title,
        description,
        amount: Number(amount),
        lat: 17.385, // temp (replace with GPS)
        lng: 78.486,
      });

      setShowModal(false);

      // Redirect to Tasks tab
      router.replace("/(tabs)/tasks");
    } catch (err) {
      Alert.alert("Error", "Failed to post task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post a Task</Text>

      {/* Title */}
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Eg: Plumber"
        placeholderTextColor="#666"
        style={styles.input}
      />

      {/* Description */}
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the problem..."
        placeholderTextColor="#666"
        style={[styles.input, styles.textArea]}
        multiline
      />

      {/* Amount */}
      <Text style={styles.label}>Expected Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="₹ Amount"
        placeholderTextColor="#666"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Post Button */}
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <LinearGradient
          colors={["#2D5FDE", "#183378"]}
          style={styles.postBtn}
        >
          <Text style={styles.postText}>Post</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Task</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to post this task?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={postTask} disabled={loading}>
                <Text style={styles.confirm}>
                  {loading ? "Posting..." : "Post"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    color: "#aaa",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 16,
    backgroundColor: "#111",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  postBtn: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  postText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  modalDesc: {
    color: "#aaa",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancel: {
    color: "#aaa",
    marginRight: 24,
  },
  confirm: {
    color: "#2D5FDE",
    fontWeight: "600",
  },
});
