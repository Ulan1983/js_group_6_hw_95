import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Link} from "react-router-dom";

import {apiURL} from "../../../constants";

const UserMenu = ({user, logout}) => {
	return (
		<UncontrolledDropdown nav inNavbar>

			<DropdownToggle nav caret>
				<img src={apiURL + '/uploads/' + user.avatar} alt="avatar"
					 style={{maxWidth: '50px', borderRadius: '50px', marginRight: '10px'}}/>
				Hello, {user.displayName}!
			</DropdownToggle>
			<DropdownMenu right style={{textAlign: 'center'}}>
				<DropdownItem>
					<Link to='/cocktails/new' style={{textDecoration: 'none', color: 'black', marginLeft: '10px'}}>Add
						cocktail</Link>
				</DropdownItem>
				<DropdownItem divider/>
				<DropdownItem>
					<Link to='/cocktails/myCocktails'
						  style={{textDecoration: 'none', color: 'black', marginLeft: '10px'}}>My cocktails</Link>
				</DropdownItem>
				<DropdownItem divider/>
				<DropdownItem onClick={logout}>
					Logout
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
};

export default UserMenu;