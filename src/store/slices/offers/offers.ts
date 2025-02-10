import {createSelector, createSlice} from '@reduxjs/toolkit';
import {FavoriteStatus, NameSpace, RequestStatus} from '../../../const';
import {TOffersState} from '../../../types/state';
import {TOffer, TOfferPreview} from '../../../types/offers';
import {appSlice} from '../app';
import {getProcessedOffers} from './utils';
import {fetchAllOffers, fetchNearbyOffers, fetchOffer} from '../../thunks/offers';
import {changeFavorite, fetchFavorites} from '../../thunks/favorites';

const initialState: TOffersState = {
  offers: [],
  favoriteOffers: [],
  offer: null,
  nearbyOffers: [],
  requestStatus: RequestStatus.Idle,
  favoriteRequestStatus: RequestStatus.Idle
};

const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  selectors: {
    offers: (state: TOffersState): TOfferPreview[] => state.offers,
    favoriteOffers: (state: TOffersState): TOfferPreview[] => state.favoriteOffers,
    offer: (state: TOffersState): TOffer | null => state.offer,
    nearbyOffers: (state: TOffersState): TOfferPreview[] => state.nearbyOffers,
    requestStatus: (state: TOffersState): RequestStatus => state.requestStatus,
    favoriteRequestStatus: (state: TOffersState): RequestStatus => state.favoriteRequestStatus
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Idle;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Idle;
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Idle;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavorite.pending, (state) => {
        state.favoriteRequestStatus = RequestStatus.Loading;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const newOffer = action.payload.offer;

        if (action.payload.status === FavoriteStatus.Added) {
          state.favoriteOffers.push(newOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(({id}) => id !== newOffer.id);
        }

        state.favoriteRequestStatus = RequestStatus.Idle;
      })
});

const offersSliceActions = {
  ...offersSlice.actions,
  fetchAllOffers,
  fetchOffer,
  fetchNearbyOffers,
  fetchFavorites,
  changeFavorite
};

const offersSliceSelectors = {
  ...offersSlice.selectors,
  currentCitySortedOffers: createSelector(
    offersSlice.selectors.offers,
    appSlice.selectors.currentCity,
    appSlice.selectors.currentOffersSortType,
    (offers, city, sortType) => getProcessedOffers(offers, city, sortType))
};

export {offersSlice, offersSliceActions, offersSliceSelectors};
