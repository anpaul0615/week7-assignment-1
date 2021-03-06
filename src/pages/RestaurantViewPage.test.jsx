import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import RestaurantViewPage from './RestaurantViewPage';

import RESTAURANT from '../../fixtures/restaurant';

jest.mock('react-redux');

test('RestaurantViewPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    session: {
      accessToken: 'ACCESS_TOKEN',
    },
    restaurant: RESTAURANT,
    review: {
      input: {},
    },
  }));

  const { queryByText } = render((
    <MemoryRouter>
      <RestaurantViewPage match={{ params: { id: RESTAURANT.id } }} />
    </MemoryRouter>
  ));

  expect(dispatch).toBeCalled();

  expect(queryByText(RESTAURANT.name)).not.toBeNull();
  expect(queryByText(RESTAURANT.address)).not.toBeNull();
});
