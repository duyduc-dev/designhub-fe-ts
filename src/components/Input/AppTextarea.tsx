import { ChangeEvent } from 'react';

import style from './style.module.scss';

type Props = {
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const AppTextarea = ({ defaultValue, value, onChange }: Props) => {
  return (
    <div className={style.textareaWrapper}>
      <textarea
        defaultValue={defaultValue}
        autoComplete={'off'}
        className={style.textarea}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default AppTextarea;
