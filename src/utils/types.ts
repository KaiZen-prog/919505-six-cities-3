export type PageProps = {
  currentCity: string;
  offers: OfferPreview[] | [];
  offerView: OfferView;
  reviews: Review[] | [];
  favoritesObject: FavoritesObject;
  favoritesQuantity: number;
};

export type AppProps = {
  pageProps: PageProps;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type OfferScaffolding = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferPreview = OfferScaffolding & {
  previewImage: string;
};

export type OfferView = OfferScaffolding & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type FavoritesObject = {
  [city: string]: OfferPreview[];
};
