interface CheckProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const CheckBox = ({ id, name, value, onChange, checked }: CheckProps) => {
  return (
    <div>
      <input type="checkbox" id={id} value={value} name={name} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default CheckBox;
