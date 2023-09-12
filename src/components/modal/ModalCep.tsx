import React, { useState,useEffect } from 'react';
import { ButtonProps, View, Modal,Alert, StyleSheet ,Text,Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TResponse } from '../../service/@types/TReponse';
import { useTheme } from 'styled-components';
import theme from '../../theme';


type Tprops = {
    isModal : boolean
    data:TResponse | undefined
}

export const ModalCep = ({isModal,data}:Tprops) => {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useTheme()

    useEffect(()=>{
        setModalVisible(isModal)
    },[isModal])
  
  
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>CEP: {data?.data.cep}</Text>
                        <Text style={styles.modalText}>Bairro: {data?.data.bairro}</Text>
                        <Text style={styles.modalText}>Rua: {data?.data.logradouro}</Text>
                        <Text style={styles.modalText}>Complemento: {data?.data.complemento}</Text>
                        <Text style={styles.modalText}>Localidade: {data?.data.localidade}</Text>
                        <View style={{ width:200, display:'flex', justifyContent:'center',alignItems:'center',marginTop:20}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="backspace" size={20} color={theme.COLORS.TEXT_SECONDY} />
                            <Text style={styles.textStyle}>Voltar</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.COLORS.TEXT_SECONDY,
      borderRadius: 20,
      padding: 70,
      alignItems: 'baseline',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    buttonClose: {
      backgroundColor: theme.COLORS.PRIMARY_500,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft:2
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize:20
    },
  });