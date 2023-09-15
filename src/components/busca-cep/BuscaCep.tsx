import { useTheme } from "styled-components";
import { useState ,useEffect} from "react";
import * as S from "./styles"
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Alert, ActivityIndicator } from "react-native"
import { Input } from "../input";
import { BuscaCepApi } from "../../service/api/busca-cep/BuscaCep";
import { ModalCep } from "../modal/ModalCep";
import { TResponse } from "../../service/@types/TReponse";

export const BuscaCep = ()=>{
    const theme = useTheme();
    const [cep, setCep] = useState("")
    const [isModal , setIsModal] = useState(false)
    const [isLoading , setIsLoading] = useState(false)
    const [dataCep, setDataCep] = useState<TResponse>()

    const handlePesquisaCep = async ()=>{
      setIsModal(false)
      if(cep.trim().length == 0){
        Alert.alert('Ops', 'Digite um CEP valido.', [
          {text: 'OK'},
        ]);
      }else{
        setIsLoading(true)
        BuscaCepApi.getCep(cep)
          .then((result)=>{
            if (result instanceof Error) {
                console.log("Error ao consultar CEP");
                setIsLoading(false)
              } else {
                console.log(result.data)
                  setDataCep(result);
                  setIsModal(true)
                  setIsLoading(false)
                
              }
          })

      }

      }

    return(
        <S.ContainerCepNumber>
                <Text style={{fontSize:25,marginBottom:15,color:theme.COLORS.TEXT_PRIMARY}}>BUSCAR CEP</Text>
                 <ModalCep isModal={isModal} data={dataCep}/>
                <S.ContainerInput>
                    <Input
                         maxLength={8}
                         keyboardType="numeric"
                         value={cep} 
                         onChangeText={t=>setCep(t)}
                         placeholder="Digite CEP...."
                         />
                    <S.TougleOpacity>
                        {isLoading ? (
                           <ActivityIndicator size="large" color={theme.COLORS.PRIMARY_500} />
                        ):(
                          <Ionicons name="search" size={40} color={theme.COLORS.TEXT_SECONDY} onPress={handlePesquisaCep} />

                        )}
                    </S.TougleOpacity>
                </S.ContainerInput>
        </S.ContainerCepNumber>
    )
}