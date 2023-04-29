import AddClientModal from "../components/addClientModal"
import AddProjectModal from "../components/addProjectModal"
import Projects from "../components/project-component"
import Client from "../components/client-component"

const Home = () => {

    return(
        <>
          <div className="d-flex gap-5 mt-4">
          <AddClientModal/>
          <AddProjectModal/>
          </div>
          <Projects/>
          <Client/>
        </>
    )
}

export default Home