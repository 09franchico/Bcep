import { useTheme } from "styled-components";
import * as S from "./styles"
import { Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { useState } from "react";
import { BuscaCepApi } from "../../service/api/busca-cep/BuscaCep";
import { TResponseSea } from "../../service/@types/TReponse";
import { ModalCepSea } from "../modal/ModalCepSea";
import { useForm, SubmitHandler } from "react-hook-form";
import { TDadosCep } from "../../@types/TDadosCep";
import { ControllerInputCepSea } from "../controllerInput/ControllerInputCepSea";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

/**
 * schema de validações de formulario
 */
const schema = yup.object({
    rua: yup.string().min(3, "Deve ter no minimo 3 digitos").required("Informe a rua"),
    cidade: yup.string().min(3,"Deve ter no minimo 3 digitos").required("Informe a cidade"),
    uf: yup.string().min(2, "Deve ter no minimo 2 digitos").max(2,"Deve ter no maximo 2 digitos").required("Informe a UF")
})



export const BuscaCepSea = () => {
    const theme = useTheme();
    const [dataCepSea, setDataCepSea] = useState<TResponseSea>();
    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    /**
     * useForm com yup :: Validação de dados
     */
    const { control, handleSubmit, formState: { errors } } = useForm<TDadosCep>({
        defaultValues: {rua: "",cidade: "",uf: ""},
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
            <Text style={{ fontSize: 30, color: theme.COLORS.TEXT_PRIMARY }}>Filtro CEP</Text>
            <S.ContainerAreaInput>
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Rua</Text>
                <ControllerInputCepSea
                    name="rua"
                    constrol={control}
                    wt={300}
                    error={errors.rua}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>Cidade</Text>
                <ControllerInputCepSea
                    name="cidade"
                    constrol={control}
                    wt={200}
                    error={errors.cidade}
                />
                <Text style={{ color: theme.COLORS.INFO, marginBottom: 6 }}>UF</Text>
                <ControllerInputCepSea
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