// import { useRouter } from 'next/router';
import Head from 'next/head';

import { getCabin } from '@/lib/data-service';
import CabinView from '@/components/CabinView';

// Dynamically Generated (SSR)
export async function getServerSideProps({ params }) {
  const cabin = await getCabin(params.cabinId);

  return { props: { cabin } };
}

// getStaticPaths === generateStaticParams
// getStaticPaths + getStaticProps (to make the page static "SSG")

function Cabin({ cabin }) {
  //   const router = useRouter();
  //   const { cabinId } = router.query;

  return (
    <>
      <Head>
        {/* <title>Cabin {cabinId} | The Wild Oasis</title> */}
        <title>Cabin {cabin.name} | The Wild Oasis</title>
      </Head>

      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;
