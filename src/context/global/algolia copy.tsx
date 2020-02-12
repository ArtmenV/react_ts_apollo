import algoliasearch from 'algoliasearch/lite';
import qs from 'qs';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { useHistory } from 'react-router-dom';
import { algoliaCreds } from '../../constants';
const createURL = searchState => `?${qs.stringify(searchState)}`;

const searchStateToUrl = searchState => `/search/${createURL(searchState)}`;

const urlToSearchState = (search: string) => qs.parse(search.slice(1));
const DEBOUNCE_TIME = 100;
const LAST_LOCATION = Symbol('last location');
const searchClient = algoliasearch(algoliaCreds.appId, algoliaCreds.apiKey);

export const ProvideAlgoliaContext: React.FC = ({ children }) => {
  const { location, push } = useHistory();
  const debouncedSetState = React.useRef<any>();
  const [searchState, setSearchState] = React.useState(
    urlToSearchState(location.search)
  );
  console.log('searchState', searchState);
  const handleOnSearchStateChange = React.useCallback(
    newSearchState => {
      console.log('newSearchState', newSearchState);
      clearTimeout(debouncedSetState.current);
      if (location.pathname === '/search/') {
        if (newSearchState.query) {
          push(
            searchStateToUrl(newSearchState),
            location.state && location.state[LAST_LOCATION]
              ? location.state
              : { [LAST_LOCATION]: location }
          );
          setSearchState(newSearchState);
          debouncedSetState.current = setTimeout(() => {}, DEBOUNCE_TIME);
        } else {
          push((location.state && location.state[LAST_LOCATION]) || '/');
          setSearchState(newSearchState);
        }
      }
    },
    [searchState, location]
  );

  return (
    <InstantSearch
      searchState={searchState}
      onSearchStateChange={handleOnSearchStateChange}
      searchClient={searchClient}
      indexName="moodlenet_mothership"
    >
      {children}
    </InstantSearch>
  );
};
