import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                <img
                    src="https://via.placeholder.com/45"
                    alt="Logo"
                />

                <h2>AgriConnect</h2>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search products..."
                />
            </div>

            <div className="menu">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Categories</a>
                <a href="#">About</a>
            </div>

            <div className="buttons">
                <button className="login-btn">
                    Login
                </button>

                <button className="register-btn">
                    Register
                </button>
            </div>

        </nav>
    );
}

export default Navbar;