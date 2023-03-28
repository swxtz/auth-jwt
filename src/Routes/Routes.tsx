import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../Pages/Home/Home";
import { SignUp } from "../Pages/SignUp/SignUp";
import {Login} from "../Pages/Login/Login";
import { ReactElement } from "react";

interface IPrivate {
  Item: ReactElement;
}

function Private({ Item }:IPrivate ):ReactElement {
  const signed = false;

  return !signed  ? Item : <Login />
}

export function RoutesApp() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/home" element={<Private Item={<Home />} />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}