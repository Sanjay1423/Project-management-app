import { Route,Routes } from "react-router-dom"

import Header from "./components/header-component"
import Home from "./pages/Homepage"
import NotFound from "./pages/NotFound"
import Project from "./pages/Project"

const App = () => {

  return(
        <div className="App container">
              <Header/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound/>} />
                <Route path="projects/:id" element={<Project/>} />
              </Routes>                       
        </div>
  )
}

export default App