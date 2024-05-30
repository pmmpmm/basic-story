interface RadioProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Radio = ({ id, name, value, onChange, checked }: RadioProps) => {
  return (
    <div>
      <input type="radio" id={id} value={value} name={name} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default Radio;
