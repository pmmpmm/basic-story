const LayoutA = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>header</header>
      <div>{children}</div>
    </div>
  );
};

export default LayoutA;
