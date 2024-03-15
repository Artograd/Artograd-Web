import { ReactNode } from 'react';
import { Header } from './Header'; // Assuming you create a Header component
import { Footer } from './Footer'; // Assuming you create a Footer component
import { Blocker } from '@epam/uui';
import styles from './Layout.module.scss';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { isPageLoading } = useSelector((state: RootState) => state.helpers);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
      {isPageLoading && (
        <Blocker cx={styles.blocker} isEnabled={isPageLoading} />
      )}
    </div>
  );
};
