import { useCabins } from './useCabins';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import CabinRow from './CabinRow';
import Empty from '../../ui/Empty';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='cabins' />;

  const filterValue = searchParams.get('discount') || 'all';

  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === 'all') return true;
    if (filterValue === 'no-discount') return cabin.discount === 0;
    if (filterValue === 'with-discount') return cabin.discount > 0;
    return true;
  });

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, order] = sortBy.split('-');
  const modifier = order === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => modifier * (a[field] - b[field])
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
