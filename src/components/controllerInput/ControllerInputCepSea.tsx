
import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInput,Text,View } from "react-native"
import React from 'react'
import { useTheme } from 'styled-components';

type Props  = {
  constrol: Control<any>;
  name: string,
  wt: number,
  error?: FieldError
}

export const ControllerInputCepSea = ({ constrol, name, wt, error }: Props) => {
  const theme = useTheme();
  return (
    <View style={{marginBottom:10}}>
      <Controller
        name={name}
        control={constrol}
        render={({ field: { onChange, value } }) => (
          <TextInput style={{
            width: wt,
            borderColor:
              theme.COLORS.PRIMARY_500,
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            color: theme.COLORS.TEXT_SECONDY
          }}
            onChangeText={onChange}
            value={value}
          />
        )}

      />
      {
        error && <Text style={{color:'red',padding:1, marginBottom:5}}>{error.message}</Text>
      }
    </View>


  )

}