"use client";

import React, {useEffect} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {useRouter} from "next/navigation";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";
import {observer, inject} from "mobx-react";


const LoginPage = (props) => {

    const router = useRouter();

    useEffect(() => {
        isLoggedIn();
    }, []);

    const isLoggedIn = async () => {
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        if (token === "" || token === null) {
            return;
        }

        await RestClient.getRequest(AppUrl.check, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            if (result.isLoggedIn !== true) {
                router.push("/login");
            } else {
                let userData = {
                    id: result.data.id,
                    name: result.data.name,
                    surname: result.data.surname,
                    email: result.data.email,
                    access_token: result.data.access_token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData
                }

                props.AuthStore.saveToken(appState);
                router.push("/home");
            }
        }).catch((err) => {
            console.log(err);
            props.AuthStore.removeToken();
        })
    }

    const _handleSubmit = async (values, {resetForm, setSubmitting}) => {
        await RestClient.postRequest(AppUrl.login, values).then((res) => {
            const data = res.data;
            const status = res.status;
            if (status === 200) {
                Notification.success(data);

                let userData = {
                    id: data.data.id,
                    name: data.data.name,
                    surname: data.data.surname,
                    email: data.data.email,
                    access_token: data.data.access_token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData
                }

                props.AuthStore.saveToken(appState);
                router.push("/");
            } else {
                Notification.error(data);
                setSubmitting(false);
            }
        }).catch((err) => {
            Notification.error({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz..."
            })
            setSubmitting(false);
        });
    };

    return (
        <>
            <div className="col-xl-5 col-lg-12 col-md-9 mt-5">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">mCoffee Admin Girişi</h1>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: ''
                                        }}
                                        validationSchema={Yup.object().shape({
                                            email: Yup.string()
                                                .required('E-Mail alanı gereklidir')
                                                .email('Lütfen geçerli bir E-Mail adresi giriniz'),
                                            password: Yup.string()
                                                .required('Şifre alanı gereklidir')
                                                .min(8, 'Şifreniz minimum 8 karakter olmak zorundadır')
                                                .max(16, 'Şifreniz maksimum 16 karakter olmak zorundadır')
                                        })}
                                        onSubmit={_handleSubmit}
                                    >
                                        {({
                                              values,
                                              touched,
                                              errors,
                                              handleChange,
                                              handleBlur,
                                              handleSubmit,
                                              isValid,
                                              isSubmitting
                                          }) => (
                                            <form className="user" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        value={values.email}
                                                        onChange={handleChange('email')}
                                                        name="email"
                                                        onBlur={handleBlur}
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        aria-describedby="emailHelp"
                                                        placeholder="E-Mail Adresiniz..."
                                                    />
                                                    {(touched.email && errors.email) && (
                                                        <small className="text-danger">{errors.email}</small>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        value={values.password}
                                                        onChange={handleChange('password')}
                                                        name="password"
                                                        onBlur={handleBlur}
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Şifreniz..."
                                                    />
                                                    {(touched.password && errors.password) && (
                                                        <small className="text-danger">{errors.password}</small>
                                                    )}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block"
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting || !isValid}  // Eğer form geçerli değilse veya submit işlemi devam ediyorsa buton devre dışı kalır
                                                >
                                                    Giriş Yap
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default inject("AuthStore")(observer(LoginPage));
