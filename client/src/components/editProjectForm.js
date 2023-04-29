import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutation"

const EditProjectForm = ({project}) => {
    const [name,setName] = useState(project.name)
    const [description,setDescription] = useState(project.description)
    const [status,setStatus] = useState(() => {
        if (project.status === "Not Started") return "new"
        if (project.status === "In Progress") return "progress"
        if (project.status === "Completed") return "completed"
        else return alert('something wrong')
        
    })

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
      });

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !description || !status){
            return alert("Please fill all the form")
        }

        updateProject(name,description,status)


    }

    return(
        <>
            <div className="mt-5">
                <h3>Update project Details</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3"> 
                        <label className="form-label">Status</label>
                        <select className="form-select"  value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>

                        </select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProjectForm