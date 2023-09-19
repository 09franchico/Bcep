import { useTheme } from "styled-components";
import * as S from "./styles"
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Handle } from "react-native"
import { useState } from "react";
import { Botao } from "../button";
import { BuscaCepApi } from "../../service/api/busca-cep/BuscaCep";
import { TResponse, TResponseSea } from "../../service/@types/TReponse";
import { ModalCep } from "../modal/ModalCep";
import { ModalCepSea } from "../modal/ModalCepSea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TDadosCep } from "../../@types/TDadosCep";
import { ControlleInput } from "../controllerInput";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"


const schema = yup.object({
    rua: yup.string().min(3, "Deve ter no minimo 3 digitos").required("Informe a rua"),
    cidade: yup.string().required("Informe a cidade"),
    uf: yup.string().min(2,"Deve ter no minimo 2 digitos").required("Informe a UF")
})

export const BuscaCepSea = () => {
    const theme = useTheme();
    const [rua, setRua] = useState('');
    const [estado, setEstado] = useState('');
    const [uf, setUf] = useState('');
    const [dataCepSea, setDataCepSea] = useState<TResponseSea>();
    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const { control, handleSubmit, formState: { errors } } = useForm<TDadosCep>({
        defaultValues: {
            rua: "",
            cidade: "",
            uf: ""
        },
        resolver: yupResolver(schema)
    })



    const handleBuscarCepSea: SubmitHandler<TDadosCep> = (data) => {
        setIsModal(false)
        setIsLoading(true)
        BuscaCepApi.getCepFiltro(data.rua, data.cidade, data.uf)
            .then((result) => {
                if (result instanceof Error) {
                    console.log("Error ao consultar CEP");
                    setIsLoading(false)
                } else {
                    setDataCepSea(result)
                    setIsModal(true)
                    setIsLoading(false)
                }
            })

    }

    return (
        <S.Container>
            <Text style={{ fontSize: 30, color: theme.COLORS.TEXT_PRIMARY }}>BUSCAR POR</Text>
            <S.ContainerAreaInput>
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Rua - Logradouro</Text>
                <ControlleInput
                    name="rua"
                    constrol={control}
                    wt={300}
                    error={errors.rua}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Cidade</Text>
                <ControlleInput
                    name="cidade"
                    constrol={control}
                    wt={200}
                    error={errors.cidade}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>UF</Text>
                <ControlleInput
                    name="uf"
                    constrol={control}
                    wt={70}
                    error={errors.uf}
                />
                <ModalCepSea isModal={isModal} data={dataCepSea} />
                <S.ContainerButton>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={theme.COLORS.PRIMARY_500} />
                    ) : (
                        <TouchableOpacity
                            style={{ padding: 15, justifyContent: 'center', alignItems: 'center', width: '100%' }}
                            onPress={handleSubmit(handleBuscarCepSea)}
                        >
                            <Text style={{ color: theme.COLORS.TEXT_SECONDY }}>Buscar</Text>
                        </TouchableOpacity>
                    )}
                </S.ContainerButton>
            </S.ContainerAreaInput>

        </S.Container>
    )
}