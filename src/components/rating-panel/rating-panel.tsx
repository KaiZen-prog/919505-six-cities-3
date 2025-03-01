import {RatingPanelType} from '../../const';
import {getClassNamePrefix, calculateRatingWidth} from './utils';

type TRatingPanelProps = {
  type: RatingPanelType;
  rating: number;
}

export default function RatingPanel({type, rating}: TRatingPanelProps): JSX.Element {
  const classNamePrefix = getClassNamePrefix(type);

  return (
    <div className={`${classNamePrefix}__rating rating`}>
      <div className={`${classNamePrefix}__stars rating__stars`}>
        <span style={{width: `${calculateRatingWidth(rating)}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {type === RatingPanelType.Offer && <span className="offer__rating-value rating__value">{rating}</span>}
    </div>
  );
}
