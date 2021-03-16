import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'

import CIInputForm from './CIInputForm'

const onChangeMock = jest.fn()

beforeEach(() => {
    onChangeMock.mockClear()
})

describe('<CIInputFrom />', () => {
    describe('@renders', () => {
        it('default state', () => {
            const wrapper = shallow(<CIInputForm onChange={onChangeMock} />)
            expect(toJson(wrapper)).toMatchSnapshot()
            expect(onChangeMock).toHaveBeenCalledTimes(0)
            expect(wrapper.find('NumberSlider').at(0).prop('value')).toBe(0)
            expect(wrapper.find('NumberSlider').at(1).prop('value')).toBe(0)
            expect(wrapper.find('NumberSlider').at(2).prop('value')).toBe(0)
        })
    })

    const waitForComponentToPaint = async (wrapper: any) => {
        await act(async () => {
            await new Promise(setImmediate)
            wrapper.update()
        })
    }

    describe('@side-effect', () => {
        it('should called onchange with the request params when all the values are entered', async () => {
            const wrapper = mount(<CIInputForm onChange={onChangeMock} />)

            expect(wrapper.find('NumberSlider').at(0).prop('value')).toBe(0)
            expect(wrapper.find('NumberSlider').at(1).prop('value')).toBe(0)
            expect(wrapper.find('NumberSlider').at(2).prop('value')).toBe(0)

            act(() => {
                const { onChange } = wrapper.find('NumberSlider').at(0).props()
                onChange(1000)
            })
            await waitForComponentToPaint(wrapper)
            expect(wrapper.find('NumberSlider').at(0).prop('value')).toBe(1000)
            expect(onChangeMock).toHaveBeenCalledTimes(0)

            act(() => {
                const { onChange } = wrapper.find('NumberSlider').at(1).props()
                onChange(2)
            })
            await waitForComponentToPaint(wrapper)
            expect(wrapper.find('NumberSlider').at(1).prop('value')).toBe(2)
            expect(onChangeMock).toHaveBeenCalledTimes(0)

            act(() => {
                const { onChange } = wrapper.find('NumberSlider').at(2).props()
                onChange(100)
            })
            await waitForComponentToPaint(wrapper)
            expect(wrapper.find('NumberSlider').at(2).prop('value')).toBe(100)

            expect(onChangeMock).toHaveBeenCalledTimes(1)
            expect(onChangeMock).toHaveBeenLastCalledWith({
                principal: 1000,
                interestRate: 2,
                monthlyDeposit: 100,
            })
        })
    })
})
