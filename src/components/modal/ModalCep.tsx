import React, { useState, useEffect } from 'react';
import { View, Modal,StyleSheet, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TResponse } from '../../service/@types/TReponse';
import { useTheme } from 'styled-components';
import theme from '../../theme';


type Tprops = {
  isModal: boolean
  data: TResponse | undefined
  iconX?:boolean
}

export const ModalCep = ({ isModal, data,iconX }: Tprops) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme()
  
  useEffect(() => {
    setModalVisible(isModal)
  }, [isModal])


  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {iconX &&
              <View  style={{ width:'100%',marginBottom:20, alignContent:'center',alignItems:'center'}}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="close-circle" size={40} color={theme.COLORS.PRIMARY_900} />
                </Pressable>
              </View>
            }
            {data?.data.cep ? (
              <View style={{marginTop:10}}>
                <Text style={styles.modalText}>CEP: {data?.data.cep}</Text>
                <Text style={styles.modalText}>Bairro: {data?.data.bairro}</Text>
                <Text style={styles.modalText}>Rua: {data?.data.logradouro}</Text>
                <Text style={styles.modalText}>Complemento: {data?.data.complemento}</Text>
                <Text style={styles.modalText}>Localidade: {data?.data.localidade}</Text>
                <Text style={styles.modalText}>UF: {data?.data.uf}</Text>
                <Text style={styles.modalText}>DDD: {data?.data.ddd}</Text>
                <Text style={styles.modalText}>IBGE: {data?.data.ibge}</Text>
              </View>
            ) : (
              <Text>CEP não encontrado.</Text>
            )}
            {!iconX && 
                <View style={{ width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="backspace" size={20} color={theme.COLORS.TEXT_SECONDY} />
                  <Text style={styles.textStyle}>Voltar</Text>
                </Pressable>
              </View>
            }
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
    margin: 10,
    padding:10,
    backgroundColor: theme.COLORS.TEXT_PRIMARY,
    borderRadius: 10,
    width:360,
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonClose: {
    backgroundColor: theme.COLORS.PRIMARY_500,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
});