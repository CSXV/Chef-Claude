import ChefLogo from "../assets/chef_hat_30dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

function Header() {
  return (
    <header className="header-container">
      <img className="header-img" src={ChefLogo}></img>
      <h1 className="header-text">Chef Claude</h1>
    </header>
  );
}

export default Header;
