import React from 'react';
import { ButtonProps } from 'react-native';

import { Container } from './styles';

export const Botao = ({ ...rest }: ButtonProps) => {
  return (
    <Container {...rest} />
  );
}