import Image from "../components/assets/something-wrong.png"
import { Link } from "react-router-dom"

const SomethingWrong = () => {

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <img src={Image} alt="img" style={{width:"300px"}} />
                <h1>Something went wrong</h1>
                <Link onClick={() => window.location.reload()} className="btn btn-secondary" >Reload</Link>
            </div>
        </>
    )
}

export default SomethingWrong