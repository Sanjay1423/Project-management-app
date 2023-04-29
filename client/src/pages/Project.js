import { useQuery } from "@apollo/client"
import {Link,useParams} from 'react-router-dom'
import { GET_PROJECT } from "../queries/projectQueries"
import Spinner from "../components/spinner-component"
import ClientInfo from "../components/clientInfo-component"
import EditProjectForm from "../components/editProjectForm"
import DeleteProjectButton from "../components/deleteProjectButton"

const Project = () => {
    const {id} = useParams()
    const {loading,error,data} = useQuery(GET_PROJECT,{variables:{id}})

    if (loading) return <Spinner/>
    if (error) return <p>Something went wrong</p>
    if (!loading && !error){
       return(
            <>
               <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm w-25px d-inline ms-auto">Back</Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <h3 className="mt-3">Project Status</h3>
                    <p className="lead">{data.project.status}</p>

                    <ClientInfo client={data.project.client} />
                    {/* <div className="d-flex flex-column justify-content-center mt-4"> */}
                     <EditProjectForm project={data.project} />
                    <DeleteProjectButton projectId={data.project.id} />

                    {/* </div> */}
               </div>
            </>
       )
    }
}

export default Project