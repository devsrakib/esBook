import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Divider from "@/components/UI/Divider";
import Button from "@/components/UI/Button";
import { Fonts } from "@/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBack from "@/components/UI/header/GoBack";

const Profile = () => {
  const { bottom, top } = useSafeAreaInsets();
  const userData = {
    name: "Mehedi Hasan Omi",
    email: "nathan.roberts@example.com",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "014658933142",
    taxNumber: "GSTIN",
    profileImage:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1810",
  };

  const infoData = [
    {
      icon: <Ionicons name="person-outline" size={18} color="gray" />,
      label: "Name",
      value: userData.name,
    },
    {
      icon: <MaterialIcons name="email" size={18} color="gray" />,
      label: "Email",
      value: userData.email,
    },
    {
      icon: <Ionicons name="location-outline" size={18} color="gray" />,
      label: "Address",
      value: userData.address,
    },
    {
      icon: <Ionicons name="call-outline" size={18} color="gray" />,
      label: "Phone",
      value: userData.phone,
    },
    {
      icon: <MaterialIcons name="attach-money" size={18} color="gray" />,
      label: "Tax Number",
      value: userData.taxNumber,
    },
  ];

  const InfoRow: React.FC<{ icon: any; label: string; value: any }> = ({
    icon,
    label,
    value,
  }) => (
    <Fragment>
      <View style={styles.infoRow}>
        <View style={styles.iconCon}>{icon}</View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>{label}</Text>
          <TextInput style={styles.input} value={value} editable={false} />
        </View>
      </View>
      <Divider height={1} width={"100%"} aligns={"center"} />
    </Fragment>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: bottom, paddingTop: top },
      ]}
    >
      <View style={styles.header}>
        <GoBack color={Colors.white} />
        <Text style={styles.headerText}>Added Phone book</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userData.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        {infoData.map((item, index) => (
          <InfoRow
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </View>
      <Button
        title="Delete Customer"
        titleColor={Colors.red}
        radius={50}
        width={"90%"}
        bg={Colors.OrangeRed}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    padding: 16,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 16,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    paddingBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    resizeMode: "contain",
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 12,
  },
  iconCon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: Colors.border,
    marginRight: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 16,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  input: {
    fontSize: Fonts.large,
    paddingVertical: 4,
  },
});

export default Profile;
