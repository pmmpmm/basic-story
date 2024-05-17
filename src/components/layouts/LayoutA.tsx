import Header from "@/components/features/Header";
import CategoryNav from "@/components/features/CategoryNav";
import ContainerLayoutA from "@/components/layouts/ContainerLayoutA";

const LayoutA = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ContainerLayoutA>
        <Header />
      </ContainerLayoutA>
      <ContainerLayoutA className="border-b border-solid border-gray-100">
        <CategoryNav />
      </ContainerLayoutA>

      <ContainerLayoutA>{children}</ContainerLayoutA>
    </>
  );
};

export default LayoutA;
