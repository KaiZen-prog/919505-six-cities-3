import {render, screen} from '@testing-library/react';
import {withStore} from '../../mock-component';
import NotFoundScreen from './';
import {createMockStore} from '../../mocks';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFoundScreen/>, createMockStore());

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
