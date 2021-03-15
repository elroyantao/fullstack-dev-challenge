import { VStack, FormControl, FormLabel } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IProjectionRequest } from '../../api/compoundInterest/calculateProjection'
import NumberSlider from '../../uicomponents/NumberSlider'

type Props = {
    onChange: (data: IProjectionRequest) => void
}

const CIInputFrom: React.FC<Props> = ({ onChange }: Props) => {
    const [principal, setPrincipal] = useState<number>(0)
    const [monthlyDeposit, setMonthlyDeposit] = useState<number>(0)
    const [interestRate, setInterestRate] = useState<number>(0)

    useEffect(() => {
        if (principal && monthlyDeposit && interestRate) {
            onChange({
                principal: principal,
                monthlyDeposit: monthlyDeposit,
                interestRate: interestRate,
            })
        }
    }, [principal, monthlyDeposit, interestRate, onChange])

    return (
        <VStack height="100%" justify="space-between">
            <FormControl id="principal">
                <FormLabel fontSize="sm">Initial deposit</FormLabel>
                <NumberSlider
                    value={principal}
                    onChange={setPrincipal}
                    max={1000000}
                    maxSlider={100000}
                />
            </FormControl>

            <FormControl id="interest">
                <FormLabel fontSize="sm">Interest Rate</FormLabel>
                <NumberSlider
                    value={interestRate}
                    onChange={setInterestRate}
                    max={20}
                    maxSlider={20}
                    step={0.01}
                />
            </FormControl>

            <FormControl id="monthlyDeposit">
                <FormLabel fontSize="sm">Monthly deposit</FormLabel>
                <NumberSlider
                    value={monthlyDeposit}
                    onChange={setMonthlyDeposit}
                    max={10000}
                    maxSlider={10000}
                />
            </FormControl>
        </VStack>
    )
}

export default CIInputFrom
