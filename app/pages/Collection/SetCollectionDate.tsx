import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/header/Header";
import GoBack from "@/components/UI/header/GoBack";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { currency } from "@/global/currency";
import Modal from "react-native-modal";
import RadioGroup from "react-native-radio-buttons-group";
import ListItem from "@/components/UI/Collection_component/ListItem";
import { getCash_sell } from "@/databases/Database";
import { useSQLiteContext } from "expo-sqlite";

const SetCollectionDate = () => {
  const { bottom, top } = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState("1");
  const [dueCollection, setDueCollection] = useState<any>();
  const db = useSQLiteContext();
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Highest Amount",
        value: "option1",
      },
      {
        id: "2",
        label: "Oldest Due",
        value: "option2",
      },
      {
        id: "3",
        label: "Pick Date",
        value: "option2",
      },
    ],
    []
  );

  useEffect(() => {
    async function dueCollection() {
      const due = (await getCash_sell(db)).filter(
        (item: any) => item?.dueAmount > 0
      );
      setDueCollection(due);
    }
    dueCollection();
  }, []);

  console.log(dueCollection);

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <GoBack color={Colors.white} />
        <Text style={styles.title}>Set Collection Date</Text>
        <TouchableOpacity style={styles.button}>
          <EvilIcons name="calendar" size={24} color={Colors.mainColor} />
          <Text style={styles.buttonText}>Select All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topSection}>
        <View style={styles.moneySection}>
          <View style={styles.imgCon}>
            <Image
              style={styles.img}
              source={require("../../../assets/images/receiveBlue.png")}
            />
          </View>
          <View style={styles.textCon}>
            <Text style={styles.textMoney}>{currency}234,500</Text>
            <Text style={styles.text2}>Collect from 25 Customer faster.</Text>
          </View>
        </View>
      </View>
      <View style={styles.searchCon}>
        <View style={styles.search}>
          <AntDesign name="search1" size={18} color={Colors.text} />
          <TextInput
            placeholder="Search from 10 Customer"
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.filterCon}
        >
          <Feather name="filter" size={18} color={Colors.text} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dueCollection}
        renderItem={({ item }) => {
          return <ListItem item={item} text="added" />;
        }}
      />

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0}
        swipeDirection="up"
        animationIn="fadeInRightBig"
        animationOut="fadeOutRightBig"
        style={styles.modal}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalCon}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId as any}
            selectedId={selectedId}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.mainColor,
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
  },
  title: {
    fontSize: Fonts.large,
    color: Colors.white,
    flex: 1,
  },
  button: {
    height: 30,
    borderRadius: radius.small,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    paddingRight: 6,
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    fontSize: Fonts.small,
    color: Colors.mainColor,
  },
  topSection: {
    backgroundColor: Colors.mainColor,
    borderBottomRightRadius: radius.regular,
    borderBottomLeftRadius: radius.regular,
    padding: 20,
  },
  moneySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: radius.regular,
    padding: 20,
  },
  imgCon: {
    width: 50,
    height: 50,
    borderRadius: radius.medium,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textCon: {
    flex: 1,
    gap: 8,
  },
  text1: {
    fontSize: Fonts.medium,
    fontWeight: "500",
    color: Colors.mainColor,
  },
  textMoney: {
    fontSize: Fonts.medium,
    fontWeight: "700",
    lineHeight: 22,
  },
  text2: {
    fontSize: Fonts.regular,
    color: Colors.text,
    fontWeight: "400",
    fontStyle: "italic",
  },
  searchCon: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 20,
  },
  search: {
    flexDirection: "row",
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: Fonts.regular,
  },
  filterCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 40,
    paddingHorizontal: 10,
    position: "relative",
  },
  filterText: {
    fontSize: Fonts.regular,
    color: Colors.text,
  },
  modal: {
    justifyContent: "flex-start",
    margin: 0,
  },
  modalCon: {
    backgroundColor: Colors.white,
    width: 160,
    borderRadius: radius.regular,
    position: "absolute",
    right: 10,
    top: 260,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 5,
      height: 1,
    },
    elevation: 19,
  },
});
export default SetCollectionDate;
