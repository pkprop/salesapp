
interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function FrontLayout({children}: MainLayoutProps) {
  return (
    <>
      <div className="page-body-wrapper">
        {children}
      </div>
    </>
  );
}
