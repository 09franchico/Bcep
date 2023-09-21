import * as S from "./styles"
import { BuscaCep} from "../../components";
import { BuscaCepSea } from "../../components/busca-cep-sea/buscaCepSea";



export const Home = () => {

    return (
        <S.Container>
            <BuscaCep/>
        </S.Container>
    )
}