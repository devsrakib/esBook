import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Divider from "@/components/UI/Divider";
import Button from "@/components/UI/Button";
import { Fonts } from "@/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBack from "@/components/UI/header/GoBack";
import { Stack, useLocalSearchParams } from "expo-router";
import { deleteCustomerById, deleteSupplierById, getCustomerById, getSupplierById } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";

const Profile = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [userData, setUserData] = useState<any>({});
  const router = useLocalSearchParams<any>();
  console.log(router, "id");
  const db = useSQLiteContext();
  console.log(userData, "hello data");

  const infoData = [
    {
      icon: <Ionicons name="person-outline" size={18} color="gray" />,
      label: "Name",
      value: userData?.name,
    },
    {
      icon: <MaterialIcons name="email" size={18} color="gray" />,
      label: "Email",
      value: userData?.email,
    },
    {
      icon: <Ionicons name="location-outline" size={18} color="gray" />,
      label: "Address",
      value: userData?.address,
    },
    {
      icon: <Ionicons name="call-outline" size={18} color="gray" />,
      label: "Phone",
      value: userData?.phoneNumber,
    },
  ];

  useEffect(() => {
    async function getCustomer() {
      try {
        const customer = await getCustomerById(db, router?.id);
        const supplier = await getSupplierById(db, router?.id);
        if (customer && router?.text === "Customer"  ) {
          setUserData(customer);
        } else if (supplier && router?.text === "Supplier") {
          setUserData(supplier)
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }
    if (router?.id) {
      getCustomer();
    }
  }, [db, router?.id]);

  const handleDeleteCustomer = async () => {
    try{
if(router?.text === "Customer"){
  await deleteCustomerById(db, userData?.id);
}else if(router?.text === "Supplier"){
  await deleteSupplierById(db, userData?.id);
}
    }catch(error){
      console.log(error)
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: bottom, paddingTop: top },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <GoBack color={Colors.white} />
        <Text style={styles.headerText}>Added Phone book</Text>
      </View>
      <View style={styles.profileContainer}>
        {userData?.profilePhoto ? (
          <Image
            source={{ uri: userData?.profilePhoto }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../../../assets/images/placeholder.jpeg")}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.profileName}>{userData?.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        {infoData?.map((d, index: number) => {
          return (
            <Fragment key={index?.toString()}>
              <View style={styles.infoRow}>
                <View style={styles.iconCon}>{d?.icon}</View>
                <View style={styles.infoColumn}>
                  <Text style={styles.label}>{d?.label}</Text>
                  <TextInput style={styles.input} value={d?.value} />
                </View>
              </View>
              <Divider height={1} width={"100%"} aligns={"center"} />
            </Fragment>
          );
        })}
      </View>
      <Button
        title={router?.text === "Customer" ? "Delete Customer" : "Delete Supplier"}
        titleColor={Colors.red}
        radius={50}
        width={"90%"}
        bg={Colors.OrangeRed}
        onPress={() =>{
           handleDeleteCustomer()}}
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
    resizeMode: "cover",
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
    flex: 1,
  },
});

export default Profile;
