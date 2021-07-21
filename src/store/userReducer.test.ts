import {UserReducer} from "./userReducer";


test('inc only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dmitriy'}
    const endState = UserReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('inc only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dmitriy'}
    const endState = UserReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})
