import './App.css'

import { Route, Routes } from "react-router-dom";
import { Layout, Home, NotFound } from './components';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="*" element={ <NotFound /> }/>
      </Route>
    </Routes>
  )
}

export default App