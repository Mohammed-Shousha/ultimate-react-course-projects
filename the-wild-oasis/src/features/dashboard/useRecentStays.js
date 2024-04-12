import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParamas] = useSearchParams();

  const numDays = !searchParamas.get('last')
    ? 7
    : Number(searchParamas.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isLoading, stays, confirmedStays, numDays };
}
