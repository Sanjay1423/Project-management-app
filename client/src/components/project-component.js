import { GET_PROJECTS } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import SomethingWrong from "../pages/somethingWrong";
import ProjectCard from "./projectCard-component";

const Projects = () => {

    const {loading,error,data} = useQuery(GET_PROJECTS)
    
    if (loading) return null
    if (error) return <SomethingWrong/>
    if (!loading && !error) {
        return(
            <div className="row mt-4">
                {data.projects.length > 0 ? (
                    data.projects.map(project => (
                        <ProjectCard project={project} key={project.id} />
                    ))
                ) : (
                    <p>No Projects yet</p>
                )}
            </div>
        )
    }
}

export default Projects