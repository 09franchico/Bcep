import React, { useState, useEffect } from 'react';
import { ButtonProps, View, Modal, Alert, StyleSheet, Text, Pressable, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TResponse, TResponseSea } from '../../service/@types/TReponse';
import { useTheme } from 'styled-components';
import theme from '../../theme';


type Tprops = {
    isModal: boolean
    data: TResponseSea | undefined
}

export const ModalCepSea = ({ isModal, data }: Tprops) => {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useTheme()

    useEffect(() => {
        setModalVisible(isModal)
    }, [isModal])


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {data?.data.length ? (
                            <FlatList
                                style={styles.flatLista}
                                data={data?.data}
                                renderItem={({ item }) => 
                                <View style={styles.modalText}>
                                    <Text style={styles.textList} >CEP: {item.cep}</Text>
                                    <Text >Logradouro: {item.logradouro}</Text>
                                    <Text >Bairro: {item.bairro}</Text>
                                    <Text >Localidade: {item.localidade}</Text>
                                </View>}
                            />

                        ) : (
                            <Text style={{margin:50,marginBottom:5}}>CEP não encontrado.</Text>
                        )}
                        <View style={{ width: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20,marginBottom:5 }}>
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
        marginTop: 100,
        marginBottom: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: theme.COLORS.TEXT_SECONDY,
        borderRadius: 20,
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
        borderRightColor:theme.COLORS.PRIMARY_500,
        borderRightWidth:3
    },
    flatLista: {
        padding: 10,
    },
    textList: {
        fontSize: 20
    }
});