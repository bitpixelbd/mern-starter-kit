import { useQuery } from '@tanstack/react-query';
import { get } from '~/services/api/api';
import { API_CARE_HOME, getUrlForModel } from '~/services/api/endpoints';

function useCarehomes() {
  const useCareHomesData = ({
    limit,
    page,
    query = null,
    state = null,
    postcode = null,
    city = null,
    careType = null,
    verify = null,
    publish = null,
    date = null,
  }) => {
    return useQuery(
      ['GET_ALL_CARE_HOMES', limit, page],
      () => {
        let url = API_CARE_HOME.replace(':limit', limit).replace(':page', page);
        if (query) {
          url = `${url}&name=${query}`;
        }
        if (city) {
          url = `${url}&city=${city}`;
        }
        if (state) {
          url = `${url}&state=${state}`;
        }
        if (postcode) {
          url = `${url}&postcode=${postcode}`;
        }
        if (careType) {
          url = `${url}&careType=${careType}`;
        }
        if (verify) {
          url = `${url}&verify=${verify}`;
        }
        if (publish) {
          url = `${url}&publish=${publish}`;
        }
        if (date) {
          url = `${url}&date=${date}`;
        }

        return get(url);
      },
      { staleTime: 0, refetchOnWindowFocus: false },
    );
  };

  const useCitiesData = () => {
    return useQuery(
      ['GET_ALL_CITIES'],
      () => {
        return get(getUrlForModel('City'));
      },
      { staleTime: 0, refetchOnWindowFocus: false },
    );
  };

  return { useCareHomesData, useCitiesData };
}

export default useCarehomes;
