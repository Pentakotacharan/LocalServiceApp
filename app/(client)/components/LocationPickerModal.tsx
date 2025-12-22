import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

export default function LocationPickerModal({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (data: { address: string; lat: number; lng: number }) => void;
}) {
  const [region, setRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      fetchAddress(latitude, longitude);
    })();
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    const res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
    if (res.length > 0) {
      const place = res[0];
      const addr = `${place.name || ""}, ${place.city || ""}, ${place.region || ""}`;
      setAddress(addr);
    }
  };

  if (!region) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={(r) => {
            setRegion(r);
            fetchAddress(r.latitude, r.longitude);
          }}
        >
          <Marker coordinate={region} />
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              onSelect({
                address,
                lat: region.latitude,
                lng: region.longitude,
              })
            }
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Save Location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ marginTop: 10 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  address: {
    fontWeight: "600",
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#1F3FA3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
