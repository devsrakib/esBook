import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Fonts } from '@/constants/Fonts'
import { radius } from '@/constants/sizes'


interface props {
    activeModal : boolean,
    setActiveModal : Function
}
const SlipModal = ({activeModal, setActiveModal}: props) => {
    const handleClose = () =>{
        setActiveModal(false)
    }
  return (
   <Modal visible={activeModal} onDismiss={handleClose} animationType="slide">
    <View style={styles.tabBar}>
<Text style={styles.tabBarTitle}>Select Slip</Text>
<TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(false)}>
<Ionicons name='close' size={24} color={Colors.text} />
</TouchableOpacity>
    </View>
         <View>

           {
   
           }
         </View>
         </Modal>
  )
}

export default SlipModal


const styles = StyleSheet.create({
    container:{

    },
    tabBar:{
        height: 60,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    tabBarTitle:{
        fontSize: Fonts.medium,
        fontWeight: '600',
        color: Colors.black,
    },
    closeButton:{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.xxxl,
        borderColor: Colors.border,
        borderWidth: 1
    }
})