import './App.css'

import { Route, Routes } from "react-router-dom";
import { Layout, Home, NotFound, Form, Profile } from './components';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/add-wage-form" element={ <Form /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  )
}

export default App