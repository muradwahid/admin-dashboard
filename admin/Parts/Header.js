import { NavLink } from 'react-router-dom';

const Header = ({ navigation }) => {

  return (
    <div className="dashboard-heading-container">
      <div className="dashboard-heading">
        <div className="heading">
          <img className="block-logo" src="https://i.ibb.co.com/HVymqHF/icon-128x128.png" alt="CustomHtmlIcon" />
          <h1 className="heading-title"> B Blocks </h1>
        </div>
        <div className="plugin-version"> v1.9.6 </div>
      </div>

      {/* Links */}
      <div className="navLinks">
        <div className='firstLinks'>
          {
            navigation.map((item, index) => {
              return (<NavLink key={index} to={item.href} className={`links ${({ isActive }) => isActive ? 'active' : ''}`}>
                {item.name} </NavLink>)
            })
          }
        </div>

      </div>
    </div>
  );
};

export default Header;