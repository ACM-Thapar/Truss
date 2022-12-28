import React, { PropsWithChildren } from 'react';
import Navbar from '../Navbar/Navbar';


const Layout:React.FC<PropsWithChildren> = ({ children }) => {
    
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
export default Layout;
