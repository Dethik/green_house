import $ from "jquery";

// This section is for deepcloning objects

// const clonedeep = require('lodash/clonedeep');

// const yourPlantClone = clonedeep(yourPlant);

// This function stores our state.

export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const stateControl = storeState();
const statePothos = storeState();
const yourPlant = storeState();


// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function() {

  $('form#new-plant').submit(function(event) {
    event.preventDefault();
    const yourPlant = $('input#plant-name').val();
    $('#results').text(yourPlant)
  });

// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $('#feed').click(function() {
    const newState = stateControl(blueFood);
    $('#soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });

  $('#feedPoor').click(function() {
    const newState = stateControl(feed);
    $('#soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });

  $('#water').click(function() {
    const newState = stateControl(superWater);
    $('#soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });

  $('#waterPoor').click(function() {
    const newState = stateControl(hydrate);
    $('#soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });

// This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${(currentState.soil === undefined) ? 0 : currentState.soil} Water: ${(currentState.water === undefined) ? 0 : currentState.water}`);
  });

  $('#feedPothos').click(function() {
    const newState = statePothos(blueFood);
    $('#pothos-soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });

  $('#feedYourPlant').click(function() {
    const newState = yourPlant(blueFood);
    $('#your-soil-value').text(`Soil: ${(newState.soil === undefined) ? 0 : newState.soil} Water: ${(newState.water === undefined) ? 0 : newState.water}`);
  });
});