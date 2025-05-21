import dynamic from 'next/dynamic';
import { useReadLocalStorage } from 'usehooks-ts';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';
const LastViewedList = dynamic(() => import('./LastViewedList'), {
  ssr: false,
});
const Level3 = () => {
  const uuid_id = useReadLocalStorage<string | undefined | null>('uuid_id', {
    initializeWithValue: false,
  });
  const accessToken = useReadLocalStorage<{
    user_id: string | undefined | null;
  }>('accessToken');
  return (
    <ViewTransition>
      <Suspense>
        {uuid_id && (
          <LastViewedList uuid={uuid_id} user_id={accessToken?.user_id} />
        )}
      </Suspense>
    </ViewTransition>
  );
};

export default Level3;
