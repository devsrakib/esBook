import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  FadeInDown,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { radius } from "@/constants/sizes";
import useImagePicker from "@/utils/UseImagePicker";
import Button from "@/components/UI/Button";
import useApiHook from "@/hooks/all_api_hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/hooks";
import { useDispatch } from "react-redux";
import { fetchOwner } from "@/redux/features/owner/ownerSlice";
import CustomLoader from "@/components/UI/CustomLoader";
import TopSection from "@/components/UI/profile/TopSection.owner";
import LogoutConfirmationModal from "@/components/UI/CustomModal";
import ColorPicker, { Panel1, Swatches, colorKit, PreviewText, HueCircular } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';

const OwnerProfile = () => {
  const router = useRouter();
  const { selectedImage, pickImage } = useImagePicker();
  const [profileData, setProfileData] = useState<any>({
    id: 0,
    profilePhoto: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    storeName: "",
    ownerName: "",
  });
const dispatch = useDispatch();
  const {owners, loading, error} = useAppSelector(state => state.owner);
 const [visible, setVisible] = useState(false);

   

 
console.log(owners?.data, ':::');


  useEffect(() => {
dispatch(fetchOwner())
  }, [])

  const updateButtonWidth = useSharedValue(0);
  const logoutButtonWidth = useSharedValue(100);

  const handleInputChange = (value: string, key: string) => {
    setProfileData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFocus = () => {
    updateButtonWidth.value = withTiming(50);
    logoutButtonWidth.value = withTiming(50);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate saving profile
      ToastAndroid.show("Profile updated!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      router.replace("/(auth)/signUp/signUp");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if(error)return
    if (owners && owners?.data && owners?.data?.length > 0) {
      setProfileData(owners?.data[0]);
    }
  }, [owners]);

  useEffect(() => {
    if (selectedImage) {
      setProfileData((prevState:any) => ({
        ...prevState,
        profilePhoto: selectedImage,
      }));
    }
  }, [selectedImage]);


  const onClose = () =>{
    setVisible(false)
}

  const infoData = [
    {
      icon: <Ionicons name="cube-outline" size={22} color={Colors.mainColor} />,
      label: "Store Name",
      key: "store_name",
    },
    {
      icon: <Ionicons name="person" size={22} color={Colors.mainColor} />,
      label: "Owner Name",
      key: "name",
    },
    {
      icon: <MaterialIcons name="email" size={22} color={Colors.mainColor} />,
      label: "Email",
      key: "email",
    },
    {
      icon: <Ionicons name="location" size={22} color={Colors.mainColor} />,
      label: "Address",
      key: "address",
    },
    {
      icon: <Ionicons name="call" size={22} color={Colors.mainColor} />,
      label: "Phone",
      key: "phone",
    },
  ];


  if(loading){
    return <CustomLoader/>
  }

  const [showModal, setShowModal] = useState(false);

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(customSwatches[0]);
  const backgroundColorStyle = useAnimatedStyle(() => ({ backgroundColor: selectedColor.value }));

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;
  };


  return (
    <>
    <ScrollView contentContainerStyle={[styles.container]}>
      <TopSection profilePhoto={profileData?.profile_photo} name={profileData?.name} setVisible={setVisible} pickImage={pickImage} />

      <View style={styles.infoContainer}>
        {infoData?.map((item, index) => (
          <Animated.View
            entering={FadeInDown.delay(index * 50).duration(200)}
            key={index}
            style={styles.inputRow}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${item.label}`}
                value={profileData?.[item?.key]}
                onChangeText={(value) => handleInputChange(value, item.key)}
                onFocus={handleFocus}
              />
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Save Profile"
          onPress={handleSaveProfile}
          width="100%"
          radius={radius.small}
          bg={Colors.mainColor}
          titleColor={Colors.white}
        />
      </View>
    </ScrollView>
    <LogoutConfirmationModal onLogout={logout} visible={visible}  onClose={onClose} />
    <Modal visible={showModal}>
    <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker value={selectedColor.value} sliderThickness={20} thumbSize={24} onChange={onColorSelect} boundedThumb>
              <HueCircular containerStyle={styles.hueContainer} thumbShape='pill'>
                <Panel1 style={styles.panelStyle} />
              </HueCircular>
              <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />
              <View style={styles.previewTxtContainer}>
                <PreviewText style={{ color: '#707070' }} colorFormat='hsl' />
              </View>
            </ColorPicker>
          </View>

          <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
          </Pressable>
        </Animated.View>
       </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },

  infoContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: radius.small,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: Fonts.medium,
    color: Colors.text,
  },
  input: {
    height: 40,
    borderBottomColor: Colors.mainColor,
    borderBottomWidth: 1,
    borderRadius: radius.small,
    paddingLeft: 10,
    fontSize: Fonts.medium,
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  hueContainer: {
    justifyContent: 'center',
  },
  panelStyle: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default OwnerProfile;
