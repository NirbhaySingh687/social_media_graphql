import React, { useState} from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function Menubar() {
    const [activeItem, setActiveItem] = useState("home")
    const handleItemClick = (e, { name }) => setActiveItem(name)
    return (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='Register'
                        active={activeItem === 'Register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )
}

export default Menubar;