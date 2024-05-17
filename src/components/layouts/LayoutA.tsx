import Header from "@/components/ui/Header";

const LayoutA = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default LayoutA;
