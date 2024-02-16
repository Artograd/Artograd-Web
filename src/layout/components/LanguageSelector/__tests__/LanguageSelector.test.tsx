import { LanguageSelector } from '../LanguageSelector';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../../utils/testWrapper';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
  },
});

describe('LanguageSelector', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('display label language if already saved language exist in localStorage', async () => {
    await testWrapper({ component: <LanguageSelector />, history });

    expect(mockGetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith('i18nextLng', 'en-US');
  });
});
