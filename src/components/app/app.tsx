import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {getAuthorizationStatus} from '../../utils/common';
import {AppRoute} from '../../utils/const';
import Layout from '../layout';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import PrivateRoute from '../private-route';
import FavoritesScreen from '../../pages/favorites-screen';
import OfferScreen from '../../pages/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import ScrollToTop from '../scroll-to-top';
import {TFavoritesObject, TOffer, TReview} from '../../utils/types';

type TAppProps = {
  offer: TOffer;
  reviews: TReview[] | [];
  favoritesObject: TFavoritesObject;
  favoritesQuantity: number;
};

export default function App(props: TAppProps) {
  const {offer, reviews, favoritesObject, favoritesQuantity} = props;
  return(
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout favoritesQuantity={favoritesQuantity}/>}
        >

          <Route
            index
            element={<MainScreen/>}
          />

          <Route
            path={AppRoute.Login}
            element={(
              <PrivateRoute authorizationStatus={getAuthorizationStatus()} isReverse>
                <LoginScreen/>
              </PrivateRoute>
            )}
          />

          <Route
            path={AppRoute.Favorites}
            element={(
              <PrivateRoute authorizationStatus={getAuthorizationStatus()}>
                <FavoritesScreen favoritesObject={favoritesObject}/>
              </PrivateRoute>
            )}
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offer={offer} reviews={reviews}/>}
          />

          <Route
            path={AppRoute.PageNotFound}
            element={<NotFoundScreen/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
