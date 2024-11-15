import React from 'react'

const LoginLayout = ({children}) => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    {children}
                </div>
            </div>
        </>
    )
}

export default LoginLayout;
