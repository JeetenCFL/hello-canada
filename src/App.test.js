import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import List from './components/list';
import Item from './components/item';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('App Component and Child Components Tests', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Test 1 and 2: Renders App and fetches data
  test('App renders and fetches data', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ name: 'Ontario', capital: 'Toronto', flagUrl: 'http://example.com/flag.jpg' }]));

    render(<App />);
    await waitFor(() => screen.getByText('Ontario'));

    expect(screen.getByText('Ontario')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Test 3: Renders List with data
  test('List renders with data', () => {
    const testData = [{ name: 'Ontario', capital: 'Toronto', flagUrl: 'http://example.com/flag.jpg' }];
    render(<List data={testData} />);
    expect(screen.getByText('Ontario')).toBeInTheDocument();
  });

  // Test 4: Item toggles capital visibility
  test('Item toggles capital visibility on button click', () => {
    const testProps = { name: 'Ontario', capital: 'Toronto', flagUrl: 'http://example.com/flag.jpg' };
    render(<Item {...testProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // Show capital
    expect(screen.getByText('Toronto')).toBeInTheDocument();

    fireEvent.click(button); // Hide capital
    expect(screen.queryByText('Toronto')).toBeNull();
  });

  // Test 5: App integration with List and Item components
  test('App integration with List and Item components', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ name: 'Ontario', capital: 'Toronto', flagUrl: 'http://example.com/flag.jpg' }]));

    render(<App />);
    await waitFor(() => screen.getByText('Ontario'));

    // Check if List and Item components rendered correctly
    expect(screen.getByText('Ontario')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Show Capital');
  });
});