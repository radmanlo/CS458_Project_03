import React, { Component } from "react"
import App from "./App"
import {render, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

test("Tasks header (h1) render with correct text", ()=>{
  const {getByTestId} = render(<App/>);
  const headEl = getByTestId("headTask");
  expect(headEl.textContent).toBe("Tasks");
})

test("First task header (h3) render with correct text", ()=>{
  const {getByTestId} = render(<App/>);
  const headEl = getByTestId("headCor");
  expect(headEl.textContent).toBe("Your Desired Cordinate");
})

test("User inputs initialize 0 for Latitude of first task", ()=>{
  const {getByTestId} = render(<App/>);
  const inputEl = getByTestId("latitudeIn1");
  expect(inputEl.textContent).toBe("");
})

test("User inputs initialize 0 for longitude of first task", ()=>{
  const {getByTestId} = render(<App/>);
  const inputEl = getByTestId("longitudeIn1");
  expect(inputEl.textContent).toBe("");
})

test("finder button for fist tasks", ()=>{
  const {getByTestId} = render(<App/>);
  const btnEl = getByTestId("findBtn");
  expect(btnEl.textContent).toBe("Find Location");
})

test("button which returns the distance to pole from your location", ()=>{
  const {getByTestId} = render(<App/>);
  const btnEl = getByTestId("poleBtn");
  expect(btnEl.textContent).toBe("Your Device Location Distance to the Geographic North Pole");
})

test("head of distance to moon", ()=>{
  const {getByTestId} = render(<App/>);
  const headEl = getByTestId("headMoon");
  expect(headEl.textContent).toBe("Calculating Distance To moon");
})

test("User inputs for distance to moon (latitude)", ()=>{
  const {getByTestId} = render(<App/>);
  const inputEl = getByTestId("latMoon");
  expect(inputEl.textContent).toBe("");
})

test("User inputs for distance to moon (longitude)", ()=>{
  const {getByTestId} = render(<App/>);
  const inputEl = getByTestId("lngMoon");
  expect(inputEl.textContent).toBe("");
})

test("button for calculating to moon", ()=>{
  const {getByTestId} = render(<App/>);
  const btnEl = getByTestId("moonBtn");
  expect(btnEl.textContent).toBe("Calculate the Distance to Moon");
})

test("Check Center Latitude", () =>{
  const {getByTestId} = render(<App/>);
  const outEl = getByTestId("outLat");
  expect(outEl.textContent).toBe("39.933365");
})

test("Check Center Longitude", () =>{
  const {getByTestId} = render(<App/>);
  const outEl = getByTestId("outLng");
  expect(outEl.textContent).toBe("32.859741");
})

test("Check center does not change when button cilick but inputs are empty", () =>{
  const {getByTestId} = render(<App/>);
  const outLat = getByTestId("outLat");
  const outLng = getByTestId("outLng");
  const findBtn = getByTestId("findBtn");

  fireEvent.click(findBtn);

  expect(outLat.textContent).toBe("39.933365")
  expect(outLng.textContent).toBe("32.859741")

})

test("input is changing or not", () =>{
  const {getByTestId} = render(<App/>);
  const inputLat = getByTestId("latitudeIn1");
  const inputLng = getByTestId("longitudeIn1");

  expect(inputLat.value).toBe("")
  expect(inputLng.value).toBe("")

  fireEvent.change(inputLat, {
    target:{
      value: "51"
    }
  });

  fireEvent.change(inputLng, {
    target:{
      value: "-0.1"
    }
  });

  expect(inputLat.value).toBe("51")
  expect(inputLng.value).toBe("-0.1")
})

test("Check whether the center is changing", () =>{
  const {getByTestId} = render(<App/>);
  const inputLat = getByTestId("latitudeIn1");
  const inputLng = getByTestId("longitudeIn1");
  const outLat = getByTestId("outLat");
  const outLng = getByTestId("outLng");
  const findBtn = getByTestId("findBtn");
  
  fireEvent.change(inputLat, {
    target:{
      value: "51"
    }
  });

  fireEvent.change(inputLng, {
    target:{
      value: "-0.1"
    }
  })

  fireEvent.click(findBtn);

  expect(outLat.textContent).toBe("51");
  expect(outLng.textContent).toBe("-0.1");

})

test("check latitude should be is less than 90 and bigger than -90", () =>{
  const {getByTestId} = render(<App/>);
  const inputLat = getByTestId("latitudeIn1");
  const outLat = getByTestId("outLat");
  const findBtn = getByTestId("findBtn");
  

  fireEvent.change(inputLat, {
    target:{
      value: "100"
    }
  });

  fireEvent.click(findBtn);

  expect(outLat.textContent).toBe("39.933365");

  fireEvent.change(inputLat, {
    target:{
      value: "-100"
    }
  });

  fireEvent.click(findBtn);

  expect(outLat.textContent).toBe("39.933365");
})

test("check longitude should be is less than 180 and bigger than -180", () =>{
  const {getByTestId} = render(<App/>);
  const inputLng = getByTestId("longitudeIn1");
  const outLng = getByTestId("outLng");
  const findBtn = getByTestId("findBtn");
  

  fireEvent.change(inputLng, {
    target:{
      value: "181"
    }
  });

  fireEvent.click(findBtn);

  expect(outLng.textContent).toBe("32.859741");

  fireEvent.change(inputLng, {
    target:{
      value: "-181"
    }
  });

  fireEvent.click(findBtn);

  expect(outLng.textContent).toBe("32.859741");
})


test("Check whether the center is changing", () =>{
  const {getByTestId} = render(<App/>);
  const inputLat = getByTestId("latMoon");
  const inputLng = getByTestId("lngMoon");
  const outDis = getByTestId("outDis");
  const moonBtn = getByTestId("moonBtn");
  
  fireEvent.change(inputLat, {
    target:{
      value: "51"
    }
  });

  fireEvent.change(inputLng, {
    target:{
      value: "-0.1"
    }
  })

  fireEvent.click(moonBtn);

  expect(outDis.textContent).not.toBe("0");

})

test("Distance to Moon is calculating", () =>{
  const {getByTestId} = render(<App/>);
  const outDis= getByTestId("outDis");
  const moonBtn = getByTestId("moonBtn");

  fireEvent.click(moonBtn);

  expect(outDis.textContent).toBe("");

})

















/*import { render, screen } from '@testing-library/react';
import {configure, shallow} from "enzyme";
import Adaptor from  "enzyme-adapter-react-16";
import Home from './Pages/Home';

//configure({adapter: new Adaptor()});
//const foo = new Foo();
//const sum = require('./App');

//const googleMap = new GoogleMapApi();

import{core} from "./App.js"

describe('Google API Testing', () => {
  /*test('renders learn react link', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#Latitude1').text()).toBeGreaterThanOrEqual("-90");
  });*/

  /*it('Ask Cordinate from User', ()=>{
    expect(fun1(1,2)).toBe(3);
  });

  it('check App', () =>{
    expect(App.fun2(1,2)).toBe(3);
  })

  it('check it is no', ()=>{
    expect(core).toReturn(10);
  })
});*/
