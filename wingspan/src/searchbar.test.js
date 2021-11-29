//import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from './searchbar';

test('searchbar renders', () => {
  const { getByRole } = render(<SearchBar handleSubmit={(v) => v}/>);
  expect(getByRole('textbox', {name: ""})).toBeInTheDocument();
  expect(getByRole('button', {name: ""})).toBeInTheDocument();
});

test('searchbar returns the correct query', () => {
  const mockSubmit = jest.fn(v => v);
  const { getByRole } = render(<SearchBar handleSubmit={mockSubmit} />);
  const searchBar = getByRole('textbox', {name: ""});
  const button = getByRole('button', {name: ""});
  userEvent.type(searchBar, "hello");
  userEvent.click(button);
  expect(mockSubmit).toHaveReturnedWith("hello");
});
