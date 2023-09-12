import { useTheme } from "styled-components";
import * as S from "./styles"
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { useState } from "react";
import { Botao } from "../button";
import { BuscaCepApi } from "../../service/api/busca-cep/BuscaCep";
import { TResponse, TResponseSea } from "../../service/@types/TReponse";
import { ModalCep } from "../modal/ModalCep";
import { ModalCepSea } from "../modal/ModalCepSea";

export const BuscaCepSea = () => {
    const theme = useTheme();
    const [rua, setRua] = useState('');
    const [estado, setEstado] = useState('');
    const [uf, setUf] = useState('');
    const [dataCepSea, setDataCepSea] = useState<TResponseSea>();
    const [isModal, setIsModal] = useState(false)


    const handleBuscarCepSea = () => {
        if (rua == '' || estado == '' || uf == '') {
            Alert.alert('Ops', 'Campo não pode ser vazio.', [
                { text: 'OK' },
            ]);
        } else {
            setIsModal(false)
            BuscaCepApi.getCepFiltro(rua, estado, uf)
                .then((result) => {
                    if (result instanceof Error) {
                        console.log("Error ao consultar CEP");
                    } else {
                        console.log(result.data)
                        setDataCepSea(result)
                        setIsModal(true)
                    }
                })
        }

    }

    return (
        <S.Container>
            <Text style={{ fontSize: 30, color: theme.COLORS.TEXT_PRIMARY }}>Buscar por</Text>
            <S.ContainerAreaInput>
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Rua - Logradouro</Text>
                <TextInput style={{ width: 300, marginBottom: 10, borderColor: theme.COLORS.PRIMARY_500, padding: 10, borderWidth: 1, borderRadius: 5, color: theme.COLORS.TEXT_SECONDY }}
                    value={rua}
                    onChangeText={t => setRua(t)}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Cidade</Text>
                <TextInput style={{ width: 200, marginBottom: 10, borderColor: theme.COLORS.PRIMARY_500, padding: 10, borderWidth: 1, borderRadius: 5, color: theme.COLORS.TEXT_SECONDY }}
                    value={estado}
                    onChangeText={t => setEstado(t)}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>UF</Text>
                <TextInput style={{ width: 70, marginBottom: 10, borderColor: theme.COLORS.PRIMARY_500, padding: 10, borderWidth: 1, borderRadius: 5, color: theme.COLORS.TEXT_SECONDY }}
                    value={uf}
                    maxLength={2}
                    onChangeText={t => setUf(t)}
                />
                <ModalCepSea isModal={isModal} data={dataCepSea} />
                <S.ContainerButton>
                    <TouchableOpacity style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}
                        onPress={handleBuscarCepSea}
                    >
                        <Text style={{ color: theme.COLORS.TEXT_SECONDY }}>Buscar</Text>
                    </TouchableOpacity>
                </S.ContainerButton>
            </S.ContainerAreaInput>

        </S.Container>
    )
}