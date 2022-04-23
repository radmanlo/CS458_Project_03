import React, { Component } from "react"
import App from "./App"
import {render} from "@testing-library/react"
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
  const btnEl = getByTestId("btnMoon");
  expect(btnEl.textContent).toBe("Calculate the Distance to Moon");
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
