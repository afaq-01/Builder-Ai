import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  AuthLayout, GuestLayout } from "./pages/Layout"
import Home from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import Builder_Page from "./pages/builderPage"
import Preview_Page from "./pages/PreviewPage"

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Login Routes */}
          <Route element={<GuestLayout/>}>
            <Route path="/login" element={<AuthPage mode="login"/>}/>
            <Route path="/register" element={<AuthPage mode="register"/>}/>
          </Route>

          {/*Protected Routes */}
          <Route element={<AuthLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/builder/:id" element={<Builder_Page/>}/>
            <Route path="/preview/:id" element={<Preview_Page/>}/>


          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App