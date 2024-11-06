import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";


const AuthLayout = (props) => {
  const { AuthStore } = props;

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    await AuthStore.tokenControl();
  };

  return (
    <>
      {props.children}
    </>
  );
};

export default inject("AuthStore")(observer(AuthLayout));
