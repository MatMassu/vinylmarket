import Header from "../../components/header";

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showCartButton={false} />
      {children}
    </>
  );
}
