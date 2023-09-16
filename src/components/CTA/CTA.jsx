import "./CTA.css"
import { Link } from "react-router-dom"

const CTA = ({ text, target = "", onClick = (() => { }), type = "button", disabled = false }) => {
    return (
        <div className="cta_container">
            <button
                className="cta para"
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                <Link to={target} className="cta_link">
                    {text}
                </Link>
            </button >
        </div>
    )
}

export default CTA
