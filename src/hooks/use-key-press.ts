import * as React from 'react';

export function useKeyPress(targetKey: string): boolean {

  const [keyPressed, setKeyPressed] = React.useState(false);

  function downHandler({ key }: { key: string }): void {
    console.log({ key });
    if (key === targetKey) setKeyPressed(true);
  }

  const upHandler = ({ key }: { key: string }): void => {
    console.log({ key });
    if (key === targetKey) setKeyPressed(false);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
}
