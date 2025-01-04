import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Fonts } from '@/constants/Fonts'
import CustomModal from '../CustomModal'
import LogoutConfirmationModal from '../CustomModal'


interface props {
    profilePhoto: any,
    name: string,
    pickImage: () => void
    setVisible: Function
}
const TopSection = ({profilePhoto, name, pickImage, setVisible }:props) => {
   
  return (
    <LinearGradient
    colors={[Colors.lightGray, Colors.linearSecond, Colors.linearThird]}
     start={{ x: 0, y: 0 }}
     end={{ x: 1, y: 1 }}
     style={styles.header}
   >
     <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
       {profilePhoto ? (
         <Image
           source={{ uri: profilePhoto }}
           style={styles.profileImage}
         />
       ) : (
         <Image
           source={require("../../../assets/images/placeholder.jpeg")}
           style={styles.profileImage}
         />
       )}
       <FontAwesome6
         name="camera"
         size={24}
         color={Colors.white}
         style={styles.cameraIcon}
       />
     </TouchableOpacity>
     <Text style={styles.profileName}>
       {name || "Your Name"}
     </Text>
    <View style={styles.gearCon}>
        <TouchableOpacity style={styles.logoutButton}>
        <FontAwesome name="gear" size={24} color={Colors.white} />
        </TouchableOpacity>
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.logoutButton}>
       <MaterialIcons name="logout" size={20} color={Colors.white} />
     </TouchableOpacity>
    </View>
   </LinearGradient>
  )
}

export default TopSection


const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  profileName: {
    color: Colors.white,
    fontSize: Fonts.extraLarge,
    marginTop: 10,
  },
  logoutButton: {
   width: 40,
   height: 40, 
   borderRadius: 20, 
alignItems: 'center',
justifyContent: 'center',
  },
  gearCon:{
    position: 'absolute',
    width: 50,
    height: 120,
    right: 20,
    top: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  }
})