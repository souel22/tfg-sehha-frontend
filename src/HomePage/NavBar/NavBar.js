import React from "react";
const NavBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{ fontWeight: "bold" }}>SEHAHA LOGO</div>
      <div>
        <a href="#home" style={{ marginRight: "1rem" }}>
          Home
        </a>
        <a href="#about" style={{ marginRight: "1rem" }}>
          About
        </a>
        <a href="#contact" style={{ marginRight: "1rem" }}>
          Contact
        </a>
        <a
          href="https://user-sehha.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=76nl1so49uclv6o010f3q6ebjj&redirect_uri=https://localhost:3000"
          style={{ marginRight: "1rem" }}
        >
          Sign In/Up (Users)
        </a>
        <a
          href="https://specialist-sehha.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=3jv8sonna91md7vu74aflv5o2&redirect_uri=https://localhost:3000"
          style={{ marginRight: "1rem" }}
        >
          Sign In/Up (Specialists)
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
