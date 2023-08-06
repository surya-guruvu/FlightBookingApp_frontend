import React from 'react'

import { Outlet, Link } from "react-router-dom";


export default function Layout(){
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/Home'>Home</Link>
                    </li>
                </ul>
            </nav>
        
            <Outlet/>
        </>
    );
}

