import { useState } from "react"
import { useMutation } from "@apollo/client"
import GET_CLIENTS from "../queries/clientQueries"
import { ADD_CLIENT } from "../mutations/clientMutation"


const AddClientModal = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [addClient] = useMutation(ADD_CLIENT,{
        variables:{name,email,phone},
        update(cache,{data:{addClient}}){
            const {clients} = cache.readQuery({query:GET_CLIENTS})

            cache.writeQuery({
                query:GET_CLIENTS,
                data:{clients:[...clients,addClient]}
            })
        }
       
    })

    const onSubmit = (e) => {
        e.preventDefault()

        if (name === '' || email === '' || phone === ''){
           return alert("Please fill all the forms")
        }

        addClient(name,email,phone)

        setName('')
        setEmail('')
        setPhone('')
    }



    return(
        <div className="addClientModal">
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                    Add Client
                </button>

            <div className="modal fade" id="addClientModal"  aria-labelledby="addClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addClientModalLabel">Add a Client</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                   <form onSubmit={onSubmit}>
                       <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"  >Phone</label>
                            <input type="text" className="form-control" onChange={e => setPhone(e.target.value)} />
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

export default AddClientModal