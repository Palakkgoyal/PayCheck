import "./NotFound.css"
import not_found_img from "../../assets/not_found.png"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not_found_container">
            <img src={not_found_img} alt="404 not found" className="not_found_img" />
            <p className="">
                Let's get back to the home page
            </p>
            <Link to="/" className="">
                Let's get back
            </Link>
        </div>
    )
}

export default NotFound
