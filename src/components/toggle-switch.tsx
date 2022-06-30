import * as React from 'react';
import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';

type ToggleState = { on: boolean };

const enum ToggleActionType {
  Toggle = 'TOGGLE',
  On = 'ON',
  Off = 'OFF',
}

function useToggle({
  initialOn,
  reducer,
}: {
  initialOn: boolean;
  reducer: (state: ToggleState, action: { type: ToggleActionType }) => ToggleState;
}) {
  const [{ on }, dispatch] = React.useReducer(reducer, { on: initialOn });
  const toggle = () => dispatch({ type: ToggleActionType.Toggle });
  const setOn = () => dispatch({ type: ToggleActionType.On });
  const setOff = () => dispatch({ type: ToggleActionType.Off });

  return { on, toggle, setOn, setOff };
}

function toggleReducer(state: ToggleState, action: { type: ToggleActionType }) {
  switch (action.type) {
    case ToggleActionType.Toggle:
      return { on: !state.on };
    case ToggleActionType.On:
      return { on: true };
    case ToggleActionType.Off:
      return { on: false };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function ToggleSwitch(props: { on: boolean }) {
  const [disabledState, setDisabledState] = React.useState<boolean | undefined>(false);

  const { on, toggle, setOn, setOff } = useToggle({ reducer: toggleReducer, initialOn: props.on });

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setDisabledState(true);
    toggle();
    setTimeout(() => {
      setDisabledState(false);
      on ? toast.success('Service disabled') : toast.success('Service enabled');
    }, 2000);
  };
  return (
    <Switch
      disabled={disabledState}
      checked={on}
      onChange={toggle}
      onClick={handleToggle}
      className={clsx(
        on ? 'bg-green-500' : 'bg-red-400',
        'top-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 disabled:cursor-not-allowed',
        disabledState ? 'bg-opacity-80' : ''
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={clsx(
          on ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      />
    </Switch>
  );
}
