import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { radius } from "@/constants/sizes";
import { Fonts } from "@/constants/Fonts";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchSupplier } from "@/redux/features/supplier/supplierSlice";

const ProfileView = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
   const {suppliers, loading, error} = useAppSelector(state => state.suppliers);
  
   
   useEffect(() =>{
  dispatch(fetchSupplier({supplierId: id}))
   }, [])

  const handleCall = () => {
    if (suppliers?.phone) {
      const phoneUrl = `tel:${suppliers?.phone}`;
      Linking.openURL(phoneUrl).catch((err) =>
        console.error("Error opening dialer:", err)
      );
    }
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(400).damping(80).springify()}
      // style={styles.profileSection}
    >
       <Link
            href={{
              pathname: "/pages/product/SupplierEdit",
              params: {
                id: suppliers?.id,
              },
            }}
            asChild
          >
      {/* Profile Image */}
     <TouchableOpacity style={styles.profileSection} >
     <View style={styles.profileCon}>
        <Image
          style={styles.profile}
          source={require("../../assets/images/picture.png")}
        />
      </View>

      <View style={styles.infoCon}>
        {/* Shop Name with Edit Icon */}
        <View style={styles.shopNameContainer}>
          <Animated.Text
            entering={FadeInDown.delay(50)
              .duration(400)
              .damping(80)
              .springify()}
            style={styles.shopName}
          >
            {suppliers?.store_name}
          </Animated.Text>
          
            <TouchableOpacity
            onPress={() => handleCall()}
            style={styles.callIcon}
          >
            <Ionicons name="call" size={16} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>

        {/* Owner Name */}
        <Animated.Text
          entering={FadeInDown.delay(100).duration(400).damping(80).springify()}
          style={styles.owner}
        >
          pro: {suppliers?.name}
        </Animated.Text>

        {/* Phone Number with Call Icon */}
        <Animated.View
          entering={FadeInDown.delay(150).duration(400).damping(80).springify()}
          style={styles.callIconCon}
        >
          <Text style={styles.phoneNumber}>Phone: {suppliers?.phone}</Text>
          
        </Animated.View>

        {/* Location */}
        <Animated.Text
          entering={FadeInDown.delay(200).duration(400).damping(80).springify()}
          style={styles.location}
        >
          Location: {suppliers?.address}
        </Animated.Text>
      </View>
     </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 10,

    marginHorizontal: 16,
  },
  profileCon: {
    borderRadius: radius.small,
    shadowColor: Colors.darkCharcoal,
    elevation: 15,
    backgroundColor: Colors.white,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: radius.small,
    resizeMode: "cover",
    // borderWidth: 1,
    // borderColor: Colors.mainColor,
  },
  infoCon: {
    flex: 1,
  },
  shopNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  shopName: {
    fontSize: Fonts.large,
    color: Colors.mainColor,
    fontWeight: "600",
    flex: 1,
  },
  editCon: {
    width: 24,
    height: 24,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
  },
  owner: {
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
    fontWeight: "500",
  },
  phoneNumber: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
  callIconCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  callIcon: {
    backgroundColor: Colors.white,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    shadowColor: Colors.mainColor,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  location: {
    fontWeight: "500",
    fontSize: Fonts.regular,
    color: Colors.darkCharcoal,
  },
});
