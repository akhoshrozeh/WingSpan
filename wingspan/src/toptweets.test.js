//import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopTweets from './toptweets';

test('renders 0 tweets without crashing', () => {
  const { getByRole } = render(<TopTweets ids={[]}/>);
  expect(getByRole('heading', {name: /Top Tweets/})).toBeInTheDocument();
});

test('renders multiple tweets without crashing', () => {
  const ids = [{tid:"20", engagement:1}, {tid:"1464338231768539141", engagement:2}];
  const { container, queryByRole } = render(<TopTweets ids={ids}/>);
  expect(container.childNodes.length).toBe(ids.length);
  expect(queryByRole('heading', {name: /Top Tweets/})).not.toBeInTheDocument();
});
