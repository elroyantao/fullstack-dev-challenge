import { Box, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { IProjection } from '../../api/compoundInterest/calculateProjection'
import LineChart from '../../uicomponents/LineChart'
import RadioButtonGroup from '../../uicomponents/RadioButton'
import CITable from '../../uicomponents/Table/Table'

type Props = {
    projection: IProjection[]
}

const CIGraph: React.FC<Props> = ({ projection }: Props) => {
    const [periodType, setPeriodType] = useState<string>('Years')
    const [displayType, setDisplayType] = useState<string>('Graph')
    const isYearly = periodType === 'Years'

    const filteredProjection = projection.filter(({ month }) => {
        return isYearly ? !(month % 12) : true
    })

    const periodOptions = ['Years', 'Months']
    const displayOptions = ['Graph', 'Table']

    return (
        <Box>
            <Stack
                direction={['column', 'row']}
                justifyContent="space-between"
                alignItems="center"
                p={4}
                mb={4}
            >
                <RadioButtonGroup
                    options={periodOptions}
                    defaultValue={periodType}
                    name="periodType"
                    onChange={setPeriodType}
                />
                <RadioButtonGroup
                    options={displayOptions}
                    defaultValue={displayType}
                    name="display"
                    onChange={setDisplayType}
                />
            </Stack>
            {displayType === 'Graph' ? (
                <LineChart
                    title="Savings Over time"
                    xAxisData={filteredProjection.map(({ month }) =>
                        isYearly ? month / 12 : month
                    )}
                    yAxisData={filteredProjection.map(({ balance }) => balance)}
                    xLabel={periodType}
                    yLabel="Amount"
                />
            ) : (
                <CITable projection={filteredProjection} periodType={periodType} />
            )}
        </Box>
    )
}

export default CIGraph
