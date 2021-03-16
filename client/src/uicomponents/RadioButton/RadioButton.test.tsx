import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import RadioButtonGroup from './RadioButton'

const onChangeMock = jest.fn()

beforeEach(() => {
    onChangeMock.mockClear()
})

describe('<RadioButtonGroup />', () => {
    describe('@renders', () => {
        it('default state', () => {
            const wrapper = shallow(
                <RadioButtonGroup
                    options={['a', 'b']}
                    defaultValue={'a'}
                    name="name"
                    onChange={onChangeMock}
                />
            )
            expect(toJson(wrapper)).toMatchSnapshot()
            expect(onChangeMock).toHaveBeenCalledTimes(0)
        })
    })

    describe('@side-effect', () => {
        it('should called onchange with `a` when radio button with value="a" has been clicked', () => {
            const wrapper = shallow(
                <RadioButtonGroup
                    options={['a', 'b']}
                    defaultValue={'a'}
                    name="name"
                    onChange={onChangeMock}
                />
            )
            wrapper.find('RadioButton[value="a"]').simulate('change', 'a')
            expect(onChangeMock).toHaveBeenCalledTimes(1)
            expect(onChangeMock).toHaveBeenLastCalledWith('a')
        })
    })
})
