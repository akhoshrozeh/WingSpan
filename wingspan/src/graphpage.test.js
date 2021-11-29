//import React from 'react';
import { render, prettyDOM, logRoles, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import GraphPage from './graphpage';
import MockedGraph from './graph';
import MockedTopTweets from './toptweets';

jest.mock('./graph', () => {
    return function DummyGraph(props) {
        const res = props.data.map((a) => <li key={a.timestamp + new Date().getTime.toString()}>{a.timestamp} | {a.score}</li>)
        return <ul data-testid="DummyGraph">{res}</ul>;
    }
});

jest.mock('./toptweets', () => {
    return function DummyTopTweets(props) {
        const res = props.ids.map((a) => <li key={a.tid + new Date().getTime().toString()}>{a.tid} | {a.score}</li>);
        return <ul data-testid="DummyTopTweets">{res}</ul>;
    }
});

test('graphpage renders initial page', () => {
  const { getByRole, queryByTestId } = render(<GraphPage/>);
  expect(getByRole('heading', {name: /Welcome to Wingspan!/})).toBeInTheDocument();
  expect(queryByTestId('DummyGraph')).not.toBeInTheDocument();
  expect(queryByTestId('DummyTopTweets')).not.toBeInTheDocument();
});

test('graphpage renders page after query', async () => {
  // Mock fetch 
  jest.spyOn(global, 'fetch').mockImplementation(() => 
    Promise.resolve({ json: () => Promise.resolve(JSON.stringify({ scores: [{timestamp: '11-27-2021T12:12:12', score: 1}],
                                                                   top_tweets: [{tid: "20", engagement: 1}]
                                                                 })) }));

  const { getByRole, findByTestId } = render(<GraphPage/>);
  
  // Send query
  const searchBar = getByRole('textbox', {name: ""});
  const button = getByRole('button', {name: ""});
  userEvent.type(searchBar, "hello");
  act(() => {userEvent.click(button)});
 
  // Check for Graph and TopTweets
  expect(global.fetch).toHaveBeenCalled();
  expect(await findByTestId('DummyGraph')).toBeInTheDocument();
  expect(await findByTestId('DummyTopTweets')).toBeInTheDocument();

  global.fetch.mockRestore();
});

test('graphpage renders page after failed query', async () => {
  // Mock fetch 
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(""));

  const { getByRole, findByRole, queryByTestId } = render(<GraphPage/>);
  
  // Send query
  const searchBar = getByRole('textbox', {name: ""});
  const button = getByRole('button', {name: ""});
  userEvent.type(searchBar, "hello");
  act(() => {userEvent.click(button)});
 
  // Check for Graph and TopTweets
  expect(global.fetch).toHaveBeenCalled();
  expect(await findByRole('heading', { name: /Welcome to Wingspan!/ })).toBeInTheDocument();
  expect(queryByTestId('DummyGraph')).not.toBeInTheDocument();
  expect(queryByTestId('DummyTopTweets')).not.toBeInTheDocument();

  global.fetch.mockRestore();
});
