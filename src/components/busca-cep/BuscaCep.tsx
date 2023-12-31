import { useTheme } from "styled-components";
import { useState } from "react";
import * as S from "./styles"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, ActivityIndicator, View } from "react-native"
import { BuscaCepApi } from "../../service/api/busca-cep/BuscaCep";
import { ModalCep } from "../modal/ModalCep";
import { TResponse } from "../../service/@types/TReponse";
import { useForm, SubmitHandler } from "react-hook-form";
import { ControllerInputCep } from "../controllerInput/ControllerInputCep";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

type TCep = {
  cep: string
}

const schema = yup.object({
  cep: yup.string().min(8, "Minimo 8 digitos").required("Campo não pode ser vazio.")
})

export const BuscaCep = () => {
  const theme = useTheme();
  const [isModal, setIsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataCep, setDataCep] = useState<TResponse>()

  const { control, handleSubmit, formState: { errors } } = useForm<TCep>({
    defaultValues: {
      cep: ""
    },
    resolver: yupResolver(schema)
  })

  const handlePesquisaCep: SubmitHandler<TCep> = async (data) => {
    setIsModal(false)
    setIsLoading(true)
    BuscaCepApi.getCep(data.cep)
      .then((result) => {
        if (result instanceof Error) {
          console.log("Error ao consultar CEP");
          setIsLoading(false)
        } else {
          setDataCep(result);
          setIsModal(true)
          setIsLoading(false)

        }
      })


  }

  return (
    <S.ContainerCepNumber>
      <S.ContainerInput>
        <ControllerInputCep
          name="cep"
          constrol={control}
          error={errors.cep}
          placeholder="Digite CEP..."
          maxLength={8}
          keyboardType="numeric"
        />
        {dataCep?.erro ? (
          <Text style={{color:theme.COLORS.INFO}}>CEP não encontrado</Text>
      ):(
          <ModalCep isModal={isModal} data={dataCep} />
      )}
      </S.ContainerInput>
      <View style={{height:60}}>
        <S.TougleOpacity>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.COLORS.PRIMARY_500} />
          ) : (
            <Ionicons name="search" size={40} color={theme.COLORS.TEXT_SECONDY} onPress={handleSubmit(handlePesquisaCep)} />
          )}
        </S.TougleOpacity>
      </View>
    </S.ContainerCepNumber>
  )
}