
import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInput, Text, View, TextInputProps } from "react-native"
import React from 'react'
import { useTheme } from 'styled-components';
import { Input } from '../input';


type Props = TextInputProps & {
    constrol: Control<any>;
    name: string,
    error?: FieldError
}

export const ControllerInputCep = ({ constrol, name, error, ...rest }: Props) => {
    return (
        <View style={{flexDirection:'column'}}>
            <Controller
                name={name}
                control={constrol}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}

            />
            {
                error && <Text style={{ color: 'red', padding: 1, marginBottom: 5 }}>{error.message}</Text>
            }
        </View>


    )
}