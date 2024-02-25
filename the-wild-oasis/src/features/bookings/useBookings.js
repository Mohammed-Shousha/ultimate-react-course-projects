import { useQuery } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // :{ field: 'totalPrice', value: 5000, method: 'gte' };

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, order] = sortByRaw.split('-');
  const sortBy = {
    field,
    order,
  };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}
