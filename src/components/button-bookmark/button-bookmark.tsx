import {getButtonAttributes} from './utils';
import {AppRoute, AuthorizationStatus, BookmarkButton} from '../../common/const';
import {useActionCreators, useAppSelector} from '../../hooks/store';
import {userSliceSelectors} from '../../store/slices/user';
import {useNavigate} from 'react-router-dom';
import {offersSliceActions, offersSliceSelectors} from '../../store/slices/offers';
import {TOfferPreview} from '../../types/offers';

type TButtonBookmarkProps = {
  offerId: string;
  type: BookmarkButton;
}

const checkFavorite = (favoriteOffers: TOfferPreview[], offerId: string) => {
  const currentOffer = favoriteOffers.find((offer) => offer.id === offerId);
  return !!currentOffer;
};

export default function ButtonBookmark({offerId, type}: TButtonBookmarkProps): JSX.Element {
  const AuthStatus = useAppSelector(userSliceSelectors.authorizationStatus);
  const favoriteOffers = useAppSelector(offersSliceSelectors.favoriteOffers);
  const {changeFavorite} = useActionCreators(offersSliceActions);
  const navigate = useNavigate();

  const isFavorite = checkFavorite(favoriteOffers, offerId);
  const {classNamePrefix, width, height} = getButtonAttributes(type);

  const clickHandler = () => {
    if (AuthStatus === AuthorizationStatus.Auth) {
      changeFavorite({offerId, status: Number(!isFavorite)});
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={`${classNamePrefix}__bookmark-button ${isFavorite ? `${classNamePrefix}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={clickHandler}
    >
      <svg className={`${classNamePrefix}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
