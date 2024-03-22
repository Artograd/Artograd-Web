import { ReactNode, useEffect } from 'react';
import { Header } from './Header'; // Assuming you create a Header component
import { Footer } from './Footer'; // Assuming you create a Footer component
import { Blocker } from '@epam/uui';
import styles from './Layout.module.scss';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { isPageLoading } from '../store/helpersSlice';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPageLoads = useSelector(
    (state: RootState) => state.helpers.isPageLoading,
  );
  useEffect(() => {
    if (isPageLoads) {
      dispatch(isPageLoading(false));
    }
  }, [location]);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
      {isPageLoads && <Blocker cx={styles.blocker} isEnabled={isPageLoads} />}
    </div>
  );
};
