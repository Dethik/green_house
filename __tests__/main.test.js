import { storeState, changeState } from '../src/main.js'

// const stateControl = storeState();

describe('Testing Units', () => {
  const stateControl = storeState();
  const feed = changeState("soil")(1);
  const hydrate = changeState("water")(1);
  const blueFood = changeState("soil")(5);
  const superWater = changeState("water")(5);

  test('should add soil to the store state', () => {
    expect(stateControl(feed)).toEqual({ soil: 1 })
  })

  test('should add water to the store state', () => {
    expect(stateControl(hydrate)).toEqual({ soil: 1, water: 1 })
  })

  test('should add 5 units of soil to the store state', () => {
    expect(stateControl(blueFood)).toEqual({ soil: 6, water: 1 })
  })

  test('should add 5 units of water to the store state', () => {
    expect(stateControl(superWater)).toEqual({ soil: 6, water: 6 })
  })
});