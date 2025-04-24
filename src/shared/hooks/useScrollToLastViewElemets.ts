import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useIsMounted, useSessionStorage } from 'usehooks-ts';

import type { LastElementViewOnPage } from './useSaveLastElementView';

const useScrollToLastViewedElement = () => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const [scrollElements, setLastViewedElementOnPage] = useSessionStorage<
    LastElementViewOnPage[] | undefined
  >('scrollToElements', undefined);

  useEffect(() => {
    if (!pathname || !scrollElements || !isMounted) return;

    const lastForThisPage = scrollElements.find(
      (item) => item.url === pathname && item.elementId !== null,
    );

    if (lastForThisPage?.elementId && pathname === lastForThisPage.url) {
      console.log({ lastForThisPage,pathname});
      const element = document.getElementById(lastForThisPage.elementId);
      if (element) {
        // Немного задержки — на случай, если DOM ещё не прогрузился
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'instant', block: 'center' });
        }, 100);
      }
      setLastViewedElementOnPage(scrollElements.filter((item) => item.url !== pathname));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, pathname,setLastViewedElementOnPage]);
};

export default useScrollToLastViewedElement;
