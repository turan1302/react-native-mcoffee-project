import React from 'react'

const Footer = (props) => {
    return (
        <>
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Tüm Hakları Saklıdır &copy; mCoffee {new Date().getFullYear()}</span>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
