import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AlphaUtil} from './AlphaUtil';

/*
 * List Missing letters tests
 */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Check "A quick brown fox jumps over the lazy dog"', () => {
  let text = "A quick brown fox jumps over the lazy dog";
  expect(AlphaUtil.listMissingLetter(text)).toEqual("");
});

it('Check "Four score and seven years ago."', () => {
  let text = "Four score and seven years ago.";
  expect(AlphaUtil.listMissingLetter(text)).toEqual("bhijklmpqtwxz");
});

it('Check "To be or not to be, that is the question!"', () => {
  let text = "To be or not to be, that is the question!";
  expect(AlphaUtil.listMissingLetter(text)).toEqual("cdfgjklmpvwxyz");
});

it('Check ""', () => {
  let text = "";
  expect(AlphaUtil.listMissingLetter(text)).toEqual("abcdefghijklmnopqrstuvwxyz");
});

/*
 * explode tests
 */
it('Check explode test 1', () => {
  let result = AlphaUtil.explode("..B....", 2);
  expect(result).toEqual([ '..B....', '<...>..', '......>', '.......' ]);
});

it('Check explode test 2', () => {
  let result = AlphaUtil.explode("..B.B..B", 10);
  expect(result).toEqual([ '..B.B..B', '........' ]);
});

it('Check explode test 3', () => {
  let result = AlphaUtil.explode("B.B.B.BB.", 2);
  expect(result).toEqual(["B.B.B.BB.","<.X.X<>.>","<.<<>.>.>","<<....>.>","........>","........."]);
});

it('Check explode test 4', () => {
  let result = AlphaUtil.explode("..B.B..B", 1);
  expect(result).toEqual(["..B.B..B",".<.X.><.","<.<.><>.",".<..<>.>","<..<..>.","..<....>",".<......","<.......","........"]);
});