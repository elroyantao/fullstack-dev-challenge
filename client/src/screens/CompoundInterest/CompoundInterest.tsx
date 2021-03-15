import React, { useCallback, useState } from 'react'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import calculateProjection, {
    IProjection,
    IProjectionRequest,
} from '../../api/compoundInterest/calculateProjection'
import CIGraph from '../../components/CIGraph'
import CIInfo from '../../components/CIInfo'
import CIInputFrom from '../../components/CIInputForm'
import Card from '../../uicomponents/Card'

const CompoundInterest: React.FC = () => {
    const [projection, setProjection] = useState<IProjection[]>([])

    const fetchProjection = useCallback(
        async (requestData: IProjectionRequest) => {
            const projection = await calculateProjection(requestData)
            setProjection(projection)
        },
        [setProjection]
    )

    return (
        <Container pt={12} maxW="container.lg">
            <Box padding={2} mb={8}>
                <Heading as="h3" mb={6} fontSize={48}>
                    Compound interest calculator
                </Heading>
                <Text fontSize="xl" fontWeight="normal">
                    Compound interest, or ´interest on interest´, is calculated using the compound
                    interest formula. By using our calculator, you can work out an appropriate
                    regular saving strategy to maximise your future wealth. Compound interest is the
                    concept of adding accumulated interest back to the principal sum, so that
                    interest is earned on top of interest from that moment on.
                </Text>
            </Box>
            <Stack spacing={6} direction={['column', 'column', 'row']} mb={4}>
                <Card flex="1" minH="358px">
                    <CIInputFrom onChange={fetchProjection} />
                </Card>

                <Card flex="1">
                    <CIInfo projections={projection} />
                </Card>
            </Stack>

            {projection.length > 0 && (
                <Card w="100%" mt={4} mb={4}>
                    <CIGraph projection={projection} />
                </Card>
            )}
        </Container>
    )
}

export default CompoundInterest
