import { Fragment } from "react/jsx-runtime"
import Header from "../components/header/header"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"
import { useEffect } from "react"
import checkAuth from "../helpers/checkAuth"

export const MainComponent = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
      checkAuth(dispatch)
    }, [])

    return (<Fragment>
        <Header />
        <div style={{ paddingTop: "80px" }}>
            <Outlet />
        </div>
    </Fragment>
    )
  }