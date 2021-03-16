import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import CIInfo from './CIInfo'

const mockedProjection = [
    {
        month: 0,
        deposit: 1000,
        totalDeposit: 1000,
        totalInterest: 0,
        interest: 0,
        balance: 1000,
    },
    {
        month: 1,
        deposit: 100,
        totalDeposit: 1100,
        totalInterest: 16.67,
        interest: 16.67,
        balance: 1116.67,
    },
]

describe('<CIInfo />', () => {
    describe('@renders', () => {
        it('with projection', () => {
            const wrapper = shallow(<CIInfo projections={mockedProjection} />)
            expect(toJson(wrapper)).toMatchSnapshot()
        })

        it('with projection', () => {
            const wrapper = shallow(<CIInfo projections={[]} />)
            expect(toJson(wrapper)).toMatchSnapshot()
        })
    })
})
