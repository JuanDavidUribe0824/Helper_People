import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout.js";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario.js";

import firebase from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion.js";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const { user } = await firebase.login(email, password);
      user.isAdmin ? Router.push("/dashboard") : Router.push("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        guardarError("Por favor, verifica tus credenciales.");
      } else {
        guardarError(
          "Se ha producido un error durante el proceso de autenticación: " +
            error.message
        );
      }
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Sesión
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error} </Error>}

            <InputSubmit type="submit" value="iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
