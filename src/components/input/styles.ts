import styled from 'styled-components/native';

export const Container = styled.TextInput.attrs({placeholderTextColor: "#d1d5db"})`
  padding: 12px;
  width: 300px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${({ theme }: any) => theme.COLORS.PRIMARY_900};
  color: ${({ theme }: any) => theme.COLORS.TEXT_SECONDY};
  font-size: 25px;
`;