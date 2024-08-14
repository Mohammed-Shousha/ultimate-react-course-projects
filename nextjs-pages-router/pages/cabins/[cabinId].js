import { useRouter } from 'next/router';
import Head from 'next/head';

function Cabin() {
  const router = useRouter();

  const { cabinId } = router.query;

  return (
    <>
      <Head>
        <title>Cabin {cabinId} | The Wild Oasis</title>
      </Head>

      <div>Cabin #{cabinId}</div>
    </>
  );
}

export default Cabin;
