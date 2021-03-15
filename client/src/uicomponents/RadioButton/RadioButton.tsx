import {
    Box,
    HStack,
    useRadio,
    useRadioGroup,
    UseRadioGroupProps,
    UseRadioProps,
} from '@chakra-ui/react'
import React from 'react'

interface Props extends UseRadioProps {
    children: React.ReactNode
}

const RadioButton: React.FC<Props> = ({ children, ...props }: Props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                _checked={{
                    bg: 'primary',
                    color: 'white',
                    borderColor: 'primary',
                    fontWeight: 'bold',
                }}
                px={5}
                py={3}
            >
                {children}
            </Box>
        </Box>
    )
}

interface GroupProps extends UseRadioGroupProps {
    options: string[]
    name: string
    defaultValue?: string
    onChange: (value: string) => void
}

const RadioButtonGroup: React.FC<GroupProps> = ({
    options,
    name,
    defaultValue,
    onChange,
}: GroupProps) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name,
        defaultValue,
        onChange,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value, enterKeyHint: value })
                return (
                    <RadioButton key={value} {...radio}>
                        {value}
                    </RadioButton>
                )
            })}
        </HStack>
    )
}

export default RadioButtonGroup
