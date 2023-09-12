import { View, Text } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from "./styles"
import { useTheme } from "styled-components";
import { useState } from "react";
import { BuscaCep} from "../../components";
import { BuscaCepSea } from "../../components/busca-cep-sea/buscaCepSea";



export const Home = () => {

    return (
        <S.Container>
            <BuscaCep/>
            <BuscaCepSea/>
        </S.Container>
    )
}