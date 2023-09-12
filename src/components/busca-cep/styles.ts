import styled from "styled-components/native";

export const ContainerCepNumber = styled.View`
   padding: 10px;
   margin-top: 100px;

`

export const ContainerInput = styled.View`
     display: flex;
     flex-direction: row;
`

export const TougleOpacity = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.COLORS.PRIMARY_900};
  border-radius: 2px;

`