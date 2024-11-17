import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import ReactNativeModal from "react-native-modal";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { ScrollView } from "moti";
import useApiHook, { apiUrl } from "@/hooks/all_api_hooks";
import { ISupplier } from "@/types/interfaces/supplier.interface";
import ActivityIndicator from "../ActivityIndicator";
import { Fonts } from "@/constants/Fonts";
import { ICategory } from "@/types/interfaces/category.interface";
import { Feather, Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import Button from "../Button";
import axios from "axios";
import { getToken } from "@/utils/getToken";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import EmptyState from "../EmptyState";

type props = {
  setVisible: Function;
  visible: boolean;
  setCategory: (id: string, name: string) => void;
};

const CategoryListModal = ({ setVisible, visible, setCategory }: props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const height = useSharedValue(400);
  const { data: categoryData, loading } = useApiHook("category/");

  const filteredCategories = categoryData?.data?.filter((item: ICategory) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createCategory = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${apiUrl + "category/"}`,
        { title: addCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error: any) {}
  };

  const handleInput = useCallback(
    _.debounce((e) => setAddCategory(e), 300),
    []
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const toggleHeight = (toAddCategory: boolean) => {
    height.value = withTiming(toAddCategory ? 250 : 400, { duration: 300 });
  };

  return (
    <ReactNativeModal
      onBackdropPress={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
      isVisible={visible}
      backdropOpacity={0.3}
      animationIn="slideInUp"
      animationOutTiming={500}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <Animated.View style={[styles.dropdownList, { ...animatedStyle }]}>
        <View style={styles.indicator} />
        {loading ? (
          <ActivityIndicator />
        ) : addCategory ? (
          <>
            <Animated.Text
              entering={FadeInDown.delay(200)
                .duration(400)
                .damping(80)
                .stiffness(200)
                .springify()}
              style={styles.categoryLabel}
            >
              Add Category
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(400)
                .damping(80)
                .stiffness(200)
                .springify()}
            >
              <TextInput
                style={styles.categoryInput}
                placeholder="Type here"
                onChangeText={(e) => handleInput(e)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(250)
                .duration(400)
                .damping(80)
                .stiffness(200)
                .springify()}
              style={{ marginTop: 30 }}
            >
              <Button
                title="Add Category"
                bg={Colors.mainColor}
                radius={radius.small}
                width={"100%"}
                titleColor={Colors.white}
                onPress={() => createCategory()}
              />
            </Animated.View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setAddCategory(false);
                toggleHeight(false);
              }}
            >
              <Ionicons name="close" size={24} color={Colors.red} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.searchAndAddButtonCon}>
              <Animated.View
                entering={FadeInDown.delay(50)
                  .duration(400)
                  .stiffness(200)
                  .damping(80)
                  .springify()}
                style={styles.search}
              >
                <Ionicons name="search" size={20} color={Colors.gray} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  onChangeText={(e) => setSearchTerm(e)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setAddCategory(true);
                    toggleHeight(true);
                  }}
                  style={styles.addButton}
                >
                  <Feather name="plus-square" size={24} color={Colors.white} />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <FlatList
              data={filteredCategories}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Animated.View
                    entering={FadeInDown.delay(index * 100)
                      .duration(400)
                      .stiffness(200)
                      .damping(80)
                      .springify()}
                    key={index}
                  >
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategory(item?.id, item?.title), setVisible(false);
                      }}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.categoryName}>{item?.title}</Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              }}
              ListEmptyComponent={() => (
                <EmptyState
                  message="No Categories Found"
                  icon="search"
                  color={Colors.text}
                  iconSize={50}
                />
              )}
            />
          </>
        )}
      </Animated.View>
    </ReactNativeModal>
  );
};

export default CategoryListModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
    height: 400,
  },
  indicator: {
    height: 6,
    width: 60,
    borderRadius: radius.medium,
    backgroundColor: Colors.mainColor,
    alignSelf: "center",
    marginBottom: 15,
  },
  dropdownItem: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.mainColor,
    borderRadius: radius.small,
    marginBottom: 12,
    backgroundColor: Colors.lavender,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  categoryName: {
    fontSize: Fonts.medium,
    color: Colors.black,
    fontWeight: "600",
  },
  categoryDetail: {
    fontSize: 14,
    color: Colors.text,
  },
  searchAndAddButtonCon: {
    padding: 4,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    // paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    // flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  addButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    backgroundColor: Colors.mainColor,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: Fonts.medium,
    color: Colors.mainColor,
  },
  addCategoryCon: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: Fonts.medium,
    color: Colors.mainColor,
  },
  categoryLabel: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  categoryInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: radius.small,
    padding: 10,
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.small,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
});
