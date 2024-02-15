import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { useQuery } from '../useQuery';

describe('useQuery', () => {
  it('should return correct search params', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Router initialEntries={['/path?code=xxxx&value=0101']}>
        {children}
      </Router>
    );
    const { result } = renderHook(() => useQuery(), { wrapper });

    expect(result.current.get('code')).toBe('xxxx');
    expect(result.current.get('value')).toBe('0101');
  });
});
