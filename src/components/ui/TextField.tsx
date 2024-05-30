interface TextFieldProps {
  type: string;
  label: string;
  name: string;
  value?: string;
  onChange: (e: any) => void;
  accept?: string;
  multiline?: boolean;
}

const TextField = ({ type, label, name, value, onChange, accept, multiline }: TextFieldProps) => {
  if (multiline) {
    return (
      <div className="flex flex-col gap-y-2">
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
          cols={10}
          rows={3}
          className="px-3 py-2.5 border border-solid border-gray-200 rounded-md"
        ></textarea>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        accept={accept}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        className="px-3 py-2.5 border border-solid border-gray-200 rounded-md h-12"
      />
    </div>
  );
};

export default TextField;
