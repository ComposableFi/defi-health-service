import * as React from 'react';

export function useWhyDidYouUpdate({ name, props }: { name: string; props: any }) {
  const previousProps = React.useRef(props);

  React.useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps?.current, ...props });
      const changesObject = {} as unknown as { [key: string]: any };
      allKeys.forEach(key => {
        if (previousProps?.current[key] !== props[key]) {
          changesObject[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObject).length) {
        console.log('[why-did-you-update]', name, changesObject);
      }
    }
    previousProps.current = props;
  });
}
