import { DependencyList, useCallback, useEffect, useRef } from 'react';

import AbstractEventHandler, {
  EventListenerCallback,
} from '@/events/AbstractEventHandler.ts';

const useEventHandler = <D, T>(
  event: AbstractEventHandler<D, T>,
  handler: EventListenerCallback<T>,
  deps: DependencyList = [],
) => {
  const handlerRef = useRef(handler);

  const dispatch = useCallback((data: D) => event.dispatch(data), []);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => event.listener(handlerRef.current), [event, ...deps]);

  return dispatch;
};
export default useEventHandler;
