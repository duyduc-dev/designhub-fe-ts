import {
  memo,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  ComponentType,
  Ref,
} from 'react';

interface WithAnimateCssProps {
  onAnimateEnd?: (e: AnimationEvent) => void;
}

const withAnimateCss = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = forwardRef<HTMLElement, P & WithAnimateCssProps>(
    ({ onAnimateEnd, ...props }, ref) => {
      const localRef = useRef<HTMLElement>(null);
      const combinedRef = (ref || localRef) as Ref<HTMLElement>;

      const handleEnd = useCallback(
        (e: AnimationEvent) => {
          onAnimateEnd?.(e);
        },
        [onAnimateEnd],
      );

      useEffect(() => {
        if (combinedRef && 'current' in combinedRef && combinedRef.current) {
          combinedRef.current.addEventListener('animationend', handleEnd);
        }

        return () => {
          if (combinedRef && 'current' in combinedRef && combinedRef.current) {
            combinedRef.current.removeEventListener('animationend', handleEnd);
          }
        };
      }, [combinedRef, handleEnd]);

      return <Component ref={combinedRef} {...(props as P)} />;
    },
  );

  return memo(WrappedComponent);
};

export default withAnimateCss;
