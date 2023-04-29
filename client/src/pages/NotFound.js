import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return(
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <BsFillExclamationTriangleFill size='8em' color='gray' className='mt-4'/>
            <h1>404</h1>
            <p>Sorry, this page does not exist</p>
            <Link to="/" className='btn btn-secondary'>Go Back</Link>    
        </div>
    )
}

export default NotFound