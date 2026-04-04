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
        <Link to="/" style={styles.link}>Home</Link>

        {!user && <Link to="/login" style={styles.link}>Login</Link>}
        {!user && <Link to="/register" style={styles.link}>Register</Link>}

        {user && <span style={styles.username}>{user.name}</span>}

        {user && user.role === "author" && (
          <Link to="/create" style={styles.link}>Create</Link>
        )}

        {user && user.role === "author" && (
          <Link to="/my-articles" style={styles.link}>My Articles</Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}

        {user && (
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "rgba(2, 6, 23, 0.8)",
    backdropFilter: "blur(10px)",
    padding: "14px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #1E293B",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    color: "#6366F1",
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center"
  },

  link: {
    color: "#CBD5F5",
    fontSize: "15px",
    textDecoration: "none",
    transition: "0.2s"
  },

  username: {
    color: "#94A3B8",
    fontSize: "14px"
  },

  logoutBtn: {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s"
  }
};

export default Navbar;