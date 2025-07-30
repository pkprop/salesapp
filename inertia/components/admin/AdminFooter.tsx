interface MainMenuProps {
    className?: string;
}
  const AdminFooter = ({ className }: MainMenuProps) => {
    return (
        <div className="container-fluid">
        <footer className="footer">
            <div className="row">
                <div className="col-md-12 footer-copyright text-center">
                    <p className="mb-0">Copyright 2025 © PropertyXpo India</p>
                </div>
            </div>
        </footer>
    </div>
    );
  };

  export default AdminFooter;
