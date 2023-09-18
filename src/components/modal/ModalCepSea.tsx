import React, { useState, useEffect } from 'react';
import{ View, Modal, StyleSheet, Text, Pressable, FlatList ,ActivityIndicator} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {  TResponse, TResponseSea } from '../../service/@types/TReponse';
import { useTheme } from 'styled-components';
import theme from '../../theme';
import { BuscaCepApi } from '../../service/api/busca-cep/BuscaCep';
import { ModalCep } from './ModalCep';


type Tprops = {
    isModal: boolean
    data: TResponseSea | undefined
}

export const ModalCepSea = ({ isModal, data }: Tprops) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataCep, setDataCep] = useState<TResponse>()
    const [modalCep , setModalCep] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        setModalVisible(isModal)
        setModalCep(false)
    }, [isModal])

    const costHandleBuscarCep = (cep:string)=>{
        setIsLoading(true)
        setModalCep(false)
        BuscaCepApi.getCep(cep)
          .then((result)=>{
            if (result instanceof Error) {
                console.log("Error ao consultar CEP");
              } else {
                setDataCep(result)
                setModalCep(true)
                setIsLoading(false)
              }
          })
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FlatList
                            style={styles.flatLista}
                            data={data?.data}
                            renderItem={({ item }) =>
                                <View style={styles.modalText}>
                                    <View style={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={styles.textList} >CEP: {item.cep}</Text>
                                        {isLoading ? (
                                            <ActivityIndicator size="large" color={theme.COLORS.INFO} />
                                        ):(
                                            <Pressable onPress={()=>costHandleBuscarCep(item.cep)}>
                                           <Ionicons name="search-circle" size={40} color={theme.COLORS.INFO} />
                                           </Pressable>
                                        )}
                                    </View>
                                    <Text >Logradouro: {item.logradouro}</Text>
                                    <Text >Bairro: {item.bairro}</Text>
                                    <Text >Localidade: {item.localidade}</Text>
                                </View>}
                            ListEmptyComponent={<Text style={{ margin: 50, marginBottom: 5 }}>CEP não encontrado.</Text>}
                        />
                        <View style={{ width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 5 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons name="backspace" size={20} color={theme.COLORS.TEXT_SECONDY} />
                                <Text style={styles.textStyle}>Voltar</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ModalCep data={dataCep} isModal={modalCep} iconX={true}/>
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
        marginTop: 100,
        marginBottom: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: theme.COLORS.TEXT_SECONDY,
        borderRadius: 10,
        width: 330,
        padding: 10,
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
        backgroundColor: theme.COLORS.TEXT_PRIMARY_BUTTON,
        padding: 15,
        borderRadius: 5,
        borderRightColor: theme.COLORS.PRIMARY_500,
        borderRightWidth: 3
    },
    flatLista: {
        padding:10,
        marginTop: 20,
        width: 300
    },
    textList: {
        fontSize: 25
    }
});