import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    let location = useLocation(); // Get the current location object
    const navigate = useNavigate();
    const showAlert = props.showAlert;



  const handleLogout = () => {
    localStorage.removeItem('token');

    if (typeof props.showAlert === "function") {
        props.showAlert("Logged out successfully", "success");
    }

    setTimeout(() => {
        navigate('/login');
    }, 300);
};


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>


                        </ul>
                        {!localStorage.getItem('token') ? (
                            <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-danger" to="/signup" role="button">SignUp</Link>
                            </form>
                        ) : (
                            <form className="d-flex" role="search">
                                <button className="btn btn-primary mx-2" type="button" onClick={handleLogout} >
                                    Log Out
                                </button>
                                <Link className="btn btn-danger" to="/signup" role="button">SignUp</Link>

                            </form>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
