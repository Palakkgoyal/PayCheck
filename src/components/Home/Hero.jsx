import "./Home.css"
import { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import Loader from "../Loader/Loader"

const Hero = () => {
    const [title, setTitle] = useState("Data Engineer")
    const [isFetching, setIsFetching] = useState(true)
    const [collectionName, setCollectionName] = useState("data")
    const [statsData, setStatsData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const collection = db.collection(collectionName);
            const documentId = "stats"; // Replace with the actual document ID you want to fetch.

            try {
                const doc = await collection.doc(documentId).get();

                if (doc.exists) {
                    // Document found, set the data in state
                    setStatsData(doc.data());
                } else {
                    setStatsData(null)
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
            finally {
                setIsFetching(false)
            }
        };

        fetchData()
    }, [title]);

    return (
        <div className="hero_container">
            <div className="stats_main_container glass">
                <div className="stats_title_container">
                    <h3 className="main_heading">
                        {title}
                    </h3>
                </div>
                {isFetching ? <Loader /> :
                    statsData !== null ? (
                        <>
                            <div className="stats_data_container">
                                <div>
                                    <h2 className="para">
                                        Highest:
                                    </h2>
                                    <h2 className="para">
                                        Lowest:
                                    </h2>
                                    <h2 className="para">
                                        Average:
                                    </h2>
                                </div>
                                <div>
                                    <p className="para">
                                        {statsData?.highestSalary}$ ({statsData?.highestGender})
                                    </p>
                                    <p className="para">
                                        {statsData?.lowestSalary}$ ({statsData?.lowestGender})
                                    </p>
                                    <p className="para">
                                        {statsData?.averageSalary}$
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="para ">
                                    Number of Individuals Involved: {" "}
                                    <span className="individual_data">
                                        {statsData?.totalDocs}
                                    </span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="para">Uh Oh! No data found</p>
                    )}
            </div>
            <div className="choice_main_container glass">
                <div className="choice_container">
                    <h2 className="main_heading">
                        Get Data OF
                    </h2>
                    <div className="choice_btns_container">
                        <button
                            onClick={() => {
                                setTitle("Web Developer")
                                setIsFetching(true)
                                setCollectionName("web")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Web Developer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Mobile Developer")
                                setIsFetching(true)
                                setCollectionName("mobile")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Mobile Developer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Devops Engineer")
                                setIsFetching(true)
                                setCollectionName("devops")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Devops Engineer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Data Engineer")
                                setIsFetching(true)
                                setCollectionName("data")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Data Engineer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Q/A Engineer")
                                setIsFetching(true)
                                setCollectionName("QA")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Q/A Engineer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Security Engineer")
                                setIsFetching(true)
                                setCollectionName("security")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Security Engineer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("AI/ML Engineer")
                                setIsFetching(true)
                                setCollectionName("AI")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            AI/ML Engineer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Game Developer")
                                setIsFetching(true)
                                setCollectionName("game")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Game Developer
                        </button>
                        <button
                            onClick={() => {
                                setTitle("Other")
                                setIsFetching(true)
                                setCollectionName("other")
                            }}
                            disabled={isFetching}
                            className=""
                        >
                            Other
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
