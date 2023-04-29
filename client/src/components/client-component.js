import {useQuery} from '@apollo/client'
import ClientRow from './clientRow-component'
import Spinner from './spinner-component'
import GET_CLIENTS from '../queries/clientQueries'

const Client = () => {
    const {loading,error,data} = useQuery(GET_CLIENTS)
    if (loading) return <Spinner/>
    if (error) return null
    if (!loading && !error){
        return(
            <>
              <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       data.clients.map(client => {
                        return <ClientRow client={client} key={client.id} />
                       } )
                    }
                </tbody>
                
              </table>  
            </>
        )
    }
}

export default Client