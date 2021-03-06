import {
  fetchRegions, fetchCategories, fetchRestaurants, fetchRestaurant,
  postSession, postReview,
} from './api';

import REGIONS from '../../fixtures/regions';
import CATEGORIES from '../../fixtures/categories';
import RESTAURANTS from '../../fixtures/restaurants';
import RESTAURANT from '../../fixtures/restaurant';
import ACCESS_TOKEN from '../../fixtures/accessToken';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchRegions', () => {
    beforeEach(() => {
      mockFetch(REGIONS);
    });

    it('returns regions', async () => {
      const regions = await fetchRegions();

      expect(regions).toEqual(REGIONS);
    });
  });

  describe('fetchCategories', () => {
    beforeEach(() => {
      mockFetch(CATEGORIES);
    });

    it('returns categories', async () => {
      const categories = await fetchCategories();

      expect(categories).toEqual(CATEGORIES);
    });
  });

  describe('fetchRestaurants', () => {
    beforeEach(() => {
      mockFetch(RESTAURANTS);
    });

    it('returns restaurants', async () => {
      const restaurants = await fetchRestaurants({
        regionName: '서울',
        categoryId: 1,
      });

      expect(restaurants).toEqual(RESTAURANTS);
    });
  });

  describe('fetchRestaurant', () => {
    beforeEach(() => {
      mockFetch(RESTAURANT);
    });

    it('returns restaurant', async () => {
      const restaurant = await fetchRestaurant({
        restaurant: 1,
      });

      expect(restaurant).toEqual(RESTAURANT);
    });
  });

  describe('postSession', () => {
    beforeEach(() => {
      mockFetch(ACCESS_TOKEN);
    });

    it('returns access-token', async () => {
      const accessToken = await postSession({
        email: '이메일',
        password: '비밀번호',
      });

      expect(accessToken).toEqual(ACCESS_TOKEN);
    });
  });

  describe('postReview', () => {
    beforeEach(() => {
      mockFetch({});
    });

    it('returns empty object', async () => {
      const response = await postReview({
        score: 5,
        description: '리뷰내용',
      });

      expect(response).toEqual({});
    });
  });
});
