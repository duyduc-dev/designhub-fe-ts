import { useEffect, useRef, RefObject } from 'react';

const useElementScrollEvent = (
    ref: RefObject<HTMLElement>,
    callback: (event: Event) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', callbackRef.current);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', callbackRef.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
};

export default useElementScrollEvent;
