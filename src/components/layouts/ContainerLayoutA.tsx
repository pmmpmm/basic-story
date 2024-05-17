interface layoutAProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerLayoutA = ({ children, className }: layoutAProps) => {
  return (
    <div className={`w-full min-w-[1024px] ` + className}>
      <div className="w-full min-w-[1024px] max-w-[1280px] m-auto px-dfX-A">{children}</div>
    </div>
  );
};

export default ContainerLayoutA;
