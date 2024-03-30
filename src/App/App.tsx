import { Outlet } from "react-router-dom";
import Header from "../components/header/header.tsx";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import checkAuth from "../helpers/checkAuth.ts";
import { useAppDispatch } from "../store/hooks.ts";

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkAuth(dispatch)
  }, [])


  return (
    <Fragment>
      <Header />
      <div style={{paddingTop:  "80px"}}>
        <Outlet />
      </div>
    </Fragment>
  )
}

export default App
