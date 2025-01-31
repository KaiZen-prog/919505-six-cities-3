import OfferNearPlaces from '../../components/offer-near-places';
import OfferDetails from '../../components/offer-details';
import {useActionCreators, useAppSelector} from '../../hooks/store';
import {appProcessActions} from '../../store/app-process';
import {appDataActions, appDataSelectors} from '../../store/app-data';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {RequestStatus} from '../../common/const';
import Spinner from '../../components/spinner';
import NotFoundScreen from '../not-found-screen';

export default function OfferScreen(): JSX.Element {
  const offer = useAppSelector(appDataSelectors.offer);
  const offerRequestStatus = useAppSelector(appDataSelectors.offerStatus);
  const nearbyOffers = useAppSelector(appDataSelectors.nearbyOffers);

  const {fetchOffer, fetchNearbyOffers, fetchReviews} = useActionCreators(appDataActions);
  const {changeActiveOfferId} = useActionCreators(appProcessActions);
  const {id} = useParams();

  useEffect(() => {
    Promise.all([fetchOffer(id as string), fetchNearbyOffers(id as string), fetchReviews(id as string)]);
  }, [id, fetchOffer, fetchNearbyOffers, fetchReviews]);

  useEffect(() => {
    if (id) {
      changeActiveOfferId(id);
    }
  }, [changeActiveOfferId, id]);

  if (offerRequestStatus === RequestStatus.Loading) {
    return <Spinner/>;
  }

  if (offerRequestStatus === RequestStatus.Failed || !offer) {
    return <NotFoundScreen/>;
  }

  return (
    <main className="page__main page__main--offer">
      <OfferDetails offer={offer} nearbyOffers={nearbyOffers}/>
      <OfferNearPlaces nearbyOffers={nearbyOffers}/>
    </main>
  );
}
