import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RadioButtonGroup from './RadioButton'
import { act } from 'react-dom/test-utils'

const runAllPromises = () => new Promise(setImmediate)

const onChangeMock = jest.fn()

beforeEach(() => {
    onChangeMock.mockClear()
})

describe('<RadioButtonGroup />', () => {
    describe('@renders', () => {
        it('default state', () => {
            const wrapper = mount(
                <RadioButtonGroup
                    options={['a', 'b']}
                    defaultValue={'a'}
                    name="name"
                    onChange={onChangeMock}
                />
            )
            expect(toJson(wrapper)).toMatchSnapshot()
            expect(onChangeMock).toHaveBeenCalledTimes(0)
            expect(wrapper.find('RadioButton[value="a"] input').prop('checked')).toBe(true)
            expect(wrapper.find('RadioButton[value="b"] input').prop('checked')).toBe(false)
        })
    })

    describe('@side-effect', () => {
        it('should called onchange with `b` when radio button with value="a" has been clicked', async () => {
            const wrapper = mount(
                <RadioButtonGroup
                    options={['a', 'b']}
                    defaultValue={'a'}
                    name="name"
                    onChange={onChangeMock}
                />
            )
            expect(wrapper.find('RadioButton[value="a"] input').prop('checked')).toBe(true)
            expect(wrapper.find('RadioButton[value="b"] input').prop('checked')).toBe(false)

            wrapper.find('RadioButton[value="b"] input').simulate('change')

            await runAllPromises()
            wrapper.update()

            expect(onChangeMock).toHaveBeenCalledTimes(1)
            expect(onChangeMock).toHaveBeenLastCalledWith('b')
            expect(wrapper.find('RadioButton[value="b"] input').prop('checked')).toBe(true)
            expect(wrapper.find('RadioButton[value="a"] input').prop('checked')).toBe(false)
        })
    })
})
