import { useKeyPressHandler, useOnClickOutside } from 'hooks-react-custom';
import { useEffect, useRef, useState } from 'react';

import style from './style.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditable = (props: Props) => {
  const { value, onChange } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const refInput = useRef<HTMLInputElement>(null);

  const handleClickText = () => {
    setIsEditing(true);
    requestIdleCallback(() => {
      refInput.current?.focus();
    });
  };

  useOnClickOutside(refInput, () => {
    setIsEditing(false);
    if (value !== text) onChange(text);
  });

  useKeyPressHandler('enter', () => {
    if (isEditing) {
      setIsEditing(false);
      if (value !== text) onChange(text);
    }
  });

  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  return (
    <div className={style.container}>
      <div>
        {!isEditing ? (
          <div className={style.wrapperText} onClick={handleClickText}>
            <span>{value}</span>
          </div>
        ) : (
          <div>
            <input
              className={style.input}
              ref={refInput}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditable;
