interface ContentBottomProps {
  children: React.ReactNode;
}
const ContentBottomLayoutA = ({ children }: ContentBottomProps) => {
  return <div className="mt-10">{children}</div>;
};

export default ContentBottomLayoutA;
