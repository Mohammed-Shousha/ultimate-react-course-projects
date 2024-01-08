import { useState } from 'react';

import CabinTable from '../features/cabins/CabinTable';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button';

function Cabins() {
  const [showFrom, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Fliter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showFrom && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
