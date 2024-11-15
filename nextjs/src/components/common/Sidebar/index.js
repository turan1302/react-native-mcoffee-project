import React from 'react'
import Link from "next/link";

const Sidebar = (props) => {
  return (
    <>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-text mx-3">MCOFFEE ADMIN PANELİ</div>
            </a>

            <hr className="sidebar-divider my-0"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/home"}>
                    <i className="fas fa-fw fa-home"></i>
                    <span>Anasayfa</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#category"
                   aria-expanded="true" aria-controls="category">
                    <i className="fas fa-fw fa-list"></i>
                    <span>Kahve Kategorileri</span>
                </a>
                <div id="category" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/categories/list"}>Kategoriler</Link>
                        <Link className="collapse-item" href={"/categories/create"}>Yeni Kategori</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#coffees"
                   aria-expanded="true" aria-controls="coffees">
                    <i className="fas fa-fw fa-coffee"></i>
                    <span>Kahveler</span>
                </a>
                <div id="coffees" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/coffees/list"}>Kahveler</Link>
                        <Link className="collapse-item" href={"/coffees/create"}>Yeni Kahve</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#variations"
                   aria-expanded="true" aria-controls="variations">
                    <i className="fas fa-fw fa-clipboard-check"></i>
                    <span>Varyasyonlar</span>
                </a>
                <div id="variations" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/variations/list"}>Varyayonlar</Link>
                        <Link className="collapse-item" href={"/variations/create"}>Yeni Varyasyon</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#prices"
                   aria-expanded="true" aria-controls="prices">
                    <i className="fas fa-fw fa-dollar-sign"></i>
                    <span>Fiyatlar</span>
                </a>
                <div id="prices" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/prices/list"}>Fiyatlar</Link>
                        <Link className="collapse-item" href={"/prices/create"}>Yeni Fiyat</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/orders/list"}>
                    <i className="fas fa-fw fa-list"></i>
                    <span>Siparişler</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/rates"}>
                    <i className="fas fa-fw fa-check"></i>
                    <span>Oylamalar</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/favourites"}>
                    <i className="fas fa-fw fa-heart"></i>
                    <span>Favoriler</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/carts"}>
                    <i className="fas fa-fw fa-shopping-bag"></i>
                    <span>Sepet</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#clients"
                   aria-expanded="true" aria-controls="clients">
                    <i className="fas fa-fw fa-user"></i>
                    <span>Kullanıcılar</span>
                </a>
                <div id="clients" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/clients/list"}>Kullanıcılar</Link>
                        <Link className="collapse-item" href={"/clients/settings"}>Kullanıcı Ayarları</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" href={"/address"}>
                    <i className="fas fa-fw fa-map-marked"></i>
                    <span>Adresler</span></Link>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#sss"
                   aria-expanded="true" aria-controls="sss">
                    <i className="fas fa-fw fa-list"></i>
                    <span>S.S.S.</span>
                </a>
                <div id="sss" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" href={"/sss/list"}>SSS</Link>
                        <Link className="collapse-item" href={"/sss/create"}>Yeni SSS</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"/>


            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    </>
  )
}

export default Sidebar
