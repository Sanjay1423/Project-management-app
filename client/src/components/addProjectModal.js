import { useState } from "react"
import { useQuery,useMutation } from "@apollo/client"

import {GET_PROJECTS} from "../queries/projectQueries"
import GET_CLIENTS from "../queries/clientQueries"
import { ADD_PROJECT } from "../mutations/projectMutation"
const AddProjectModal = () => {

    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [clientId,setClientId] = useState('')
    const [status,setStatus] = useState('new')


    const {loading,error,data} = useQuery(GET_CLIENTS)
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
          const { projects } = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
          });
        },
      });
    


    const onSubmit = (e) => {
        e.preventDefault()

        if (!name || !description || !status || !clientId){
            return alert('Please fill all the forms')
        } 

        addProject(name,description,clientId,status)
        
        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

    if (loading) return null
    if (error) return null
    if (!loading && !error)

    return(
        <div className="addProjectModal">
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            Add Project
        </button>

    <div className="modal fade" id="addProjectModal"  aria-labelledby="addProjectModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
           <form onSubmit={onSubmit}>
               <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" >Description</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                </div> 
                <div className="mb-3">
                <label className="form-label" >Status</label>
                    <select className="form-select" value={status} aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                        <option value="new">Not started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                <label className="form-label" >Client</label>
                <select className="form-select" value={clientId} aria-label="Default select example" onChange={e => setClientId(e.target.value)}>
                    <option value="">Select client</option>
                    {
                    data.clients.map(client => (
                        <option key={client.id} value={client.id} >{client.name}</option>
                    ))
                    }
                    </select>
                </div>
                <button className="btn btn-secondary" type="submit" data-bs-dismiss="modal">Submit</button>
           </form>
        </div>
        </div>
    </div>
    </div>
</div>
    )
}

export default AddProjectModal