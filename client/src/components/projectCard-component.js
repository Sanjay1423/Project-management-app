
const ProjectCard = ({project}) => {

    const statusColor = (status) => {
        if (status === "Not Started"){
            return "red"
        } 
        if (status === "In Progress"){
            return "blue"
        }
        if (status === "Completed"){
            return "green"
        }
    }

    return(
        
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-3">{project.name}</h5>
                <a href={`projects/${project.id}`} className="btn btn-light">view</a>
                </div>
                <p className="small" >Status: <span style={{color: statusColor(project.status)}}>{project.status}</span></p>

                </div>
            </div>

        </div>
        
    )
    
}

export default ProjectCard