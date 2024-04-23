import { NavLink } from "react-router-dom";

const NavLogo=()=>{
    const NavigationLogo = () => {
      return <h2 className="text-white">Fokjlenot</h2>
    };
    return (
      <NavLink to='/' className='block w-24'>
        <NavigationLogo />
      </NavLink>
    );
}
export default NavLogo