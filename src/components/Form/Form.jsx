import "./Form.css"
import { useState, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Loader/Loader";
import Login from "../Login/Login";
import { auth, db } from "../../lib/firebase"
import { useNavigate } from "react-router-dom"

const Form = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [formStarted, setFormStarted] = useState(false)
    const [isOtherGender, setIsOtherGender] = useState(false)
    const [isOtherRole, setIsOtherRole] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        gender: "",
        role: "",
        salary: 0,
        views: "",
    })
    const navigate = useNavigate();
    const formRef = useRef(null)
    const scrollValRef = useRef(100)

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        if (type === "radio") {
            name === "role" ? setIsOtherRole(false) : setIsOtherGender(false)
        }

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function scrollUp() {
        if (scrollValRef.current <= -300) return

        scrollValRef.current = scrollValRef.current - 100;
        formRef.current.style.top = scrollValRef.current + "vh"
    }


    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Login />
    }

    async function handleSubmit() {
        const collectionName = isOtherRole ? "other" : formData?.role
        const collectionRef = db.collection(collectionName);
        const statsDocRef = collectionRef.doc("stats");
        try {
            await db
                .runTransaction(async (transaction) => {
                    const statsDocSnapshot = await transaction.get(statsDocRef)

                    if (statsDocSnapshot.exists) {
                        const oldData = statsDocSnapshot.data()
                        const updatedTotalDocs = oldData.totalDocs + 1;
                        const updatedAverageSalary = Math.round(((oldData.totalDocs * parseInt(oldData.averageSalary)) + parseInt(formData.salary)) / updatedTotalDocs)

                        let updatedHighestSalary, updatedHighestGender, updatedLowestSalary, updatedLowestGender;

                        if (oldData.highestSalary < formData.salary) {
                            updatedHighestSalary = formData.salary
                            updatedHighestGender = formData.gender
                        }
                        else {
                            updatedHighestSalary = oldData.highestSalary
                            updatedHighestGender = oldData.highestGender
                        }

                        if (oldData.lowestSalary > formData.salary) {
                            updatedLowestSalary = formData.salary
                            updatedLowestGender = formData.gender
                        }
                        else {
                            updatedLowestSalary = oldData.lowestSalary
                            updatedLowestGender = oldData.lowestGender
                        }

                        transaction.update(statsDocRef, {
                            highestSalary: updatedHighestSalary,
                            highestGender: updatedHighestGender,
                            lowestSalary: updatedLowestSalary,
                            lowestGender: updatedLowestGender,
                            totalDocs: updatedTotalDocs,
                            averageSalary: updatedAverageSalary,
                        })

                    }
                    else {
                        const data = {
                            highestSalary: formData.salary,
                            highestGender: formData.gender,
                            lowestSalary: formData.salary,
                            lowestGender: formData.gender,
                            totalDocs: 1,
                            averageSalary: formData.salary,
                        }
                        transaction.set(statsDocRef, data);
                        console.log('Document created successfully!');
                    }

                    const docData = {
                        ...formData,
                        email: user?.email
                    }
                    const docDataRef = collectionRef.doc()
                    transaction.set(docDataRef, docData)
                })
        }
        catch (error) {
            console.error(error, "err")
        }
        finally {
            setSubmitting(false)
            navigate("/")
        }
    }

    return (
        <div className="form_main_container">
            <div className={`${formStarted && "hide_it"}`}>
                <h1 className="main_heading form_heading">
                    Share your Salary <br /> Anonymously
                </h1>
                <p className="para form_para">
                    Thank you for participating in this survey.
                    Your input will play a crucial role in
                    examining gender-based pay equality
                    <br />
                    <br />
                    Rest assured, we are committed to safeguarding
                    your privacy, and salary-related
                    data will be shared anonymously, ensuring your personal
                    information remains confidential. Your contribution
                    will help shed light on potential biases
                    in compensation.
                    <br />
                    <br />
                    Please answer all the questions honestly
                </p>
                <Btn
                    text="Start"
                    onClick={() => {
                        setFormStarted(true)
                        scrollUp()
                    }}
                    style={{ "--c": "" }}
                />
            </div>
            <div className="form_container" ref={formRef}>
                <div className="gender_container">
                    <fieldset className="fieldset">
                        <legend className="main_heading">
                            What is your gender?
                        </legend>
                        <div className="radio_btn_container">
                            <label className="gender_label_container para">Cisgender Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="cisgender male"
                                    checked={formData.gender === "cisgender male"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Cisgender Female
                                <input
                                    type="radio"
                                    name="gender"
                                    value="cisgender female"
                                    checked={formData.gender === "cisgender female"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Transgender Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="transgender male"
                                    checked={formData.gender === "transgender male"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Transgender Female
                                <input
                                    type="radio"
                                    name="gender"
                                    value="transgender female"
                                    checked={formData.gender === "transgender female"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Non-binary
                                <input
                                    type="radio"
                                    name="gender"
                                    value="non-binary"
                                    checked={formData.gender === "non-binary"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Agender
                                <input
                                    type="radio"
                                    name="gender"
                                    value="agender"
                                    checked={formData.gender === "agender"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">
                                <button
                                    onClick={() => {
                                        setIsOtherGender(true)
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            gender: ""
                                        }))
                                    }}
                                    className="other_btn para"

                                >
                                    Other
                                </button>
                                {isOtherGender && (
                                    <input
                                        type="text"
                                        required
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="para other_input"
                                        placeholder="Please specify"
                                        minLength={2}
                                        maxLength={80}
                                    />
                                )}
                            </label>
                        </div>
                        <Btn text="Ok"
                            onClick={formData.gender.length > 1 ? scrollUp : () => { }}
                        />
                    </fieldset>
                </div>

                <div className="job_role_container">
                    <fieldset className="fieldset">
                        <legend className="main_heading">
                            What is your Job Role?
                        </legend>
                        <div className="radio_btn_container">
                            <label className="gender_label_container para">Web Developer
                                <input
                                    type="radio"
                                    name="role"
                                    value="web"
                                    checked={formData.role === "web"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Mobile Developer
                                <input
                                    type="radio"
                                    name="role"
                                    value="mobile"
                                    checked={formData.role === "mobile"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Devops Engineer
                                <input
                                    type="radio"
                                    name="role"
                                    value="devops"
                                    checked={formData.role === "devops"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Data Engineer
                                <input
                                    type="radio"
                                    name="role"
                                    value="data"
                                    checked={formData.role === "data"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Q/A Engineer
                                <input
                                    type="radio"
                                    name="role"
                                    value="QA"
                                    checked={formData.role === "QA"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Security Engineer
                                <input
                                    type="radio"
                                    name="role"
                                    value="security"
                                    checked={formData.role === "security"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">AI/ML Engineer
                                <input
                                    type="radio"
                                    name="role"
                                    value="AI"
                                    checked={formData.role === "AI"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">Game Developer
                                <input
                                    type="radio"
                                    name="role"
                                    value="game"
                                    checked={formData.role === "game"}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="gender_label_container para">
                                <button
                                    onClick={() => {
                                        setIsOtherRole(true)
                                        setFormData(prevFormData => ({
                                            ...prevFormData,
                                            role: ""
                                        }))
                                    }}
                                    className="other_btn para"
                                >
                                    Other
                                </button>
                                {isOtherRole && (
                                    <input
                                        type="text"
                                        required
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="para other_input"
                                        placeholder="Please specify"
                                        minLength={5}
                                        maxLength={80}
                                    />
                                )}
                            </label>
                        </div>
                        <Btn text="Ok"
                            onClick={formData.role.length > 1 ? scrollUp : () => { }}
                        />
                    </fieldset>
                </div>
                <div className="salary_container">
                    <fieldset className="fieldset">
                        <legend className="main_heading">
                            What is your salary?
                        </legend>
                        <p style={{ display: "block" }}>**Per annum (In USD)**</p>
                        <input
                            type="number"
                            name="salary"
                            id="salary"
                            className="other_input para"
                            max={10000000}
                            min={0}
                            value={formData.salary}
                            onChange={handleChange}
                        />
                        <Btn
                            text="Ok"
                            onClick={formData.salary > 0 && formData.salary < 10000000 ? scrollUp : () => { }}
                        />
                    </fieldset>
                </div>

                <div className="views_container" style={{ position: "relative" }}>
                    <fieldset className="fieldset">
                        <legend className="main_heading">
                            What are your views?
                        </legend>
                        <p style={{ display: "block" }}>**Write what you think about your salary**</p>
                        <p style={{ display: "block" }}>**Is it low || ok || amazing for you**</p>
                        <textarea
                            type="text"
                            name="views"
                            id="views"
                            className="other_input para"
                            style={{ lineHeight: "initial" }}
                            value={formData.views}
                            onChange={handleChange}
                            cols={30}
                            rows={5}
                        />
                        <Btn
                            text="Submit"
                            onClick={formData.views.length > 3 && formData.gender.length > 1 ? () => {
                                setSubmitting(true)
                                handleSubmit()
                            } : () => { }}
                        />
                    </fieldset>
                    {submitting && <Loader />}
                </div>
            </div>
        </div>
    )
}

export default Form



function Btn({ text, onClick = () => { } }) {
    return (
        <button className="form_action_btn para" onClick={onClick}>
            {text}
        </button>
    )
}