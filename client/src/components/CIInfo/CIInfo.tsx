import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IProjection } from '../../api/compoundInterest/calculateProjection'
import CIInfoSection from './CIInfoSection'

type Props = {
    projections: IProjection[]
}

const CIInfo: React.FC<Props> = ({ projections }: Props) => {
    if (!projections.length) {
        return (
            <Box width="100%" bg="blue400" height="100%" borderRadius="8px" p={8}>
                <Text fontSize="xl">
                    Use our compound interest calculator to see how much your savings or investments
                    might grow over time. You can include regular deposits or withdrawals.
                </Text>
            </Box>
        )
    }

    const { totalDeposit, totalInterest, balance } = projections[projections.length - 1]

    return (
        <Flex direction="column" h="100%">
            <Box m={-4} mb={0} p={4} bg="primary" color="white" fontWeight="bold">
                Your Savings Details
            </Box>
            <Flex
                direction="column"
                align="flex-start"
                justify="space-around"
                h="100%"
                m={-4}
                mt={0}
            >
                <CIInfoSection title="Total Deposits" amount={totalDeposit} borderBottom="1px " />
                <CIInfoSection title="Total Interest Paid" amount={totalInterest} />
                <CIInfoSection title="Your Balance" amount={balance} />
            </Flex>
        </Flex>
    )
}

export default CIInfo
