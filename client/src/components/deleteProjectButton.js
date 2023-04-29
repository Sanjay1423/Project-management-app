import {useNavigate} from 'react-router-dom'
import {FaTrash} from 'react-icons/fa'
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutation"
import { GET_PROJECTS } from '../queries/projectQueries'

const DeleteProjectButton = ({projectId}) => {
    const navigate = useNavigate("/")
    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables:{id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}]


    })
    return(
        <div className='d-flex justify-content-center mt-5'>
            <button onClick={deleteProject} className="btn btn-danger btn-small d-flex gap-2 justify-content-center align-items-center">
                <FaTrash />  Delete this project
            
            </button>
        </div>
    )
}

export default DeleteProjectButton