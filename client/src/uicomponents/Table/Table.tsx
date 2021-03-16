import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react'
import { IProjection } from '../../api/compoundInterest/calculateProjection'

type Props = {
    projection: IProjection[]
    periodType: string
}

const CITable: React.FC<Props> = ({ projection, periodType }: Props) => {
    const getRowColor = (index: number) => {
        return index === projection.length - 1
            ? 'primary'
            : periodType === 'Months' && index % 12 === 0 && index
            ? 'blue400'
            : 'white'
    }

    return (
        <Table size="sm">
            <TableCaption>Savings over time - ({periodType})</TableCaption>
            <Thead>
                <Tr>
                    <Th isNumeric>{periodType}</Th>
                    <Th isNumeric display={['none', 'none', 'table-cell']}>
                        Deposit
                    </Th>
                    <Th isNumeric display={['none', 'none', 'table-cell']}>
                        Interest
                    </Th>
                    <Th isNumeric>Total Deposit</Th>
                    <Th isNumeric>Total Interest</Th>
                    <Th isNumeric>Balance</Th>
                </Tr>
            </Thead>
            <Tbody>
                {projection.map((proj: IProjection, i: number) => (
                    <Tr key={proj.month} bg={getRowColor(i)}>
                        <Td isNumeric>{periodType === 'Years' ? proj.month / 12 : proj.month}</Td>
                        <Td isNumeric display={['none', 'none', 'table-cell']}>
                            {proj.deposit}
                        </Td>
                        <Td isNumeric display={['none', 'none', 'table-cell']}>
                            {proj.interest}
                        </Td>
                        <Td isNumeric>{proj.totalDeposit}</Td>
                        <Td isNumeric>{proj.totalInterest}</Td>
                        <Td isNumeric>{proj.balance}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default CITable
