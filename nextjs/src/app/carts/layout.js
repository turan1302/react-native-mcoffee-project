"use client";

import React from 'react'
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AuthLayout from "@/components/common/Layout/AuthLayout";
import {inject,observer} from "mobx-react";

const CartLayout = ({children}) => {
  return (
      <AuthLayout>
        <div id="wrapper">

          <Sidebar/>

          <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

              <Header/>

              <div className="container-fluid">

                {children}

              </div>

            </div>

           <Footer/>

          </div>
        </div>
      </AuthLayout>
  )
}

export default inject("AuthStore")(observer(CartLayout));
