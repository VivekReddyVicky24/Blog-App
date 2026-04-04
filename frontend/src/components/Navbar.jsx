import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>BlogApp</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && <span>{user.name}</span>}

        {user && user.role === "author" && (
          <Link to="/create">Create</Link>
        )}

        {user && user.role === "author" && (
          <Link to="/my-articles">My Articles</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {user && (
          <button onClick={logout} style={styles.btn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#1E293B",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#4F46E5",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  btn: {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;