import style from './style.module.scss';

type Props = {
  value?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
};

const ProgressBar = ({ value, defaultValue, onChange }: Props) => {
  return (
    <div className={style.container}>
      <input
        type="range"
        className={style.input}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default ProgressBar;
