interface FormGroupProps {
  children: React.ReactNode;
  direction: string;
  label?: string;
}

const FormGroup = ({ children, direction, label }: FormGroupProps) => {
  return (
    <fieldset className="flex flex-col gap-y-1">
      {label && <label>{label}</label>}
      <div className={`flex flex-${direction} gap-4 py-2`}>{children}</div>
    </fieldset>
  );
};

export default FormGroup;
