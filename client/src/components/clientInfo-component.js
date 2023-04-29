import {FaEnvelope,FaPhone,FaIdBadge} from 'react-icons/fa'

const ClientInfo = ({client}) => {
    
    return(
        <>
            <h3 className='mt-5 mb-3'>Client Information</h3>
            <ul className='list-group'>
                <li className='list-group-item'> 
                    <FaIdBadge className='icon me-3' />
                    {client.name}
                </li>
                <li className='list-group-item'> 
                    <FaEnvelope className='icon me-3'  />
                    {client.email}
                </li>
                <li className='list-group-item'> 
                    <FaPhone className='icon me-3' />
                    {client.phone}
                </li>
            </ul>
        </>
    )
}

export default ClientInfo