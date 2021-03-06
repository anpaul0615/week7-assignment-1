import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import SessionContainer from './SessionContainer';

import ACCESS_TOKEN from '../../fixtures/accessToken';

jest.mock('react-redux');

describe('SessionContainer', () => {
  const dispatch = jest.fn();

  const renderComponent = () => render((
    <SessionContainer />
  ));

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      session: {
        accessToken: given.accessToken,
      },
    }));
  });

  context('with access-token', () => {
    given('accessToken', () => ACCESS_TOKEN);

    it('display access-token', () => {
      const { container } = renderComponent();
      expect(container).toHaveTextContent(ACCESS_TOKEN);
    });

    it('display logout-button', () => {
      const { getByRole } = renderComponent();
      expect(getByRole('button', { name: 'Log out' })).not.toBeNull();
    });

    context('when click logout-button', () => {
      it('fires submit event', () => {
        const { getByRole } = renderComponent();
        // When
        const logoutButton = getByRole('button', { name: 'Log out' });
        fireEvent.click(logoutButton);
        // Then
        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });

  context('without access-token', () => {
    given('accessToken', () => null);

    it('display login-form', () => {
      const { getByLabelText, getByRole } = renderComponent();
      expect(getByLabelText('E-Mail')).not.toBeNull();
      expect(getByLabelText('Password')).not.toBeNull();
      expect(getByRole('button', { name: 'Log In' })).not.toBeNull();
    });
  });
});
