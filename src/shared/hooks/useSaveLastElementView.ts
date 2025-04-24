import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useIsMounted, useSessionStorage } from 'usehooks-ts';

export type LastElementViewOnPage = {
  url: string;
  elementId: string | null;
};

const useSaveLastElementView = (elementId: string) => {
  const pathname = usePathname();
  const isMounted = useIsMounted();
  const [,setLastViewedElementOnPage] = useSessionStorage<
    LastElementViewOnPage[]|undefined
  >('scrollToElements', []);

  const save = useCallback(() => {
    if (!isMounted() || !elementId || !pathname) return;
    setLastViewedElementOnPage((prev: LastElementViewOnPage[]|undefined) => {
      if (!prev) return [{ url: pathname, elementId }];
      const prevItem = prev.find((item: LastElementViewOnPage) => item.url === pathname);
      if (prevItem) {
        prevItem.elementId = elementId;
        return prev;
      }
      return [...prev, { url: pathname, elementId }];
    });
  }, [elementId, isMounted, pathname, setLastViewedElementOnPage]);

  return save;
};

export default useSaveLastElementView;
