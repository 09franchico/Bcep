import styled from "styled-components/native";

export const Container = styled.View`
   margin-top: 10px;
   padding: 10px;
   border-radius:10px;
   border-width: 1px;
   border-color:${({ theme }: any) => theme.COLORS.PRIMARY_900};
`

export const ContainerAreaInput = styled.View`
    padding: 20px;
    display: flex;

`

export const ContainerButton = styled.View`
 display: flex;
 justify-content: flex-end;
 background-color: rebeccapurple;
 border-radius:5px;
 

`

export const Button = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`

export const TextInputSea = styled.TextInput`
 width: 300px;
 margin-bottom: 10px;
 border-color: ${({ theme }: any) => theme.COLORS.PRIMARY_500} ;
 padding: 10px;
 border-width: 1px;
 border-radius: 5px;

`