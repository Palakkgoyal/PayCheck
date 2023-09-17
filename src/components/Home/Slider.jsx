import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import Loader from "../Loader/Loader"

const CollectionNames = ["web", "mobile", "devops", "data", "QA", "security", "AI", "game", "other"];

function fetchDataFromCollections() {
  // Create an array of promises for each collection
  const promises = CollectionNames.map(collectionName => {
    return db.collection(collectionName).get()
      .then(querySnapshot => {
        // Loop through the documents in the collection
        const documents = [];
        querySnapshot.forEach(doc => {
          documents.push(doc.data());
        });
        return { collectionName, documents };
      })
      .catch(error => {
        console.error(`Error fetching data from ${collectionName} collection: ${error}`);
        return { collectionName, error };
      });
  });

  // Use Promise.all to wait for all promises to resolve
  return Promise.all(promises);
}


const Slider = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true)

  console.log(data)

  useEffect(() => {
    fetchDataFromCollections()
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, []);

  return (
    <div className="slider_main_container">


      <div className="slider__main__container">
        <h2 className="main_heading">
          Web Developer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[0].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Mobile Developer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[1].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Devops Engineer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[2].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Data Engineer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[3].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Q/A Engineer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[4].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Security Engineer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[5].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          AI/ML Engineer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[6].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Game Developer
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[7].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


      <div className="slider__main__container">
        <h2 className="main_heading">
          Other
        </h2>
        <div className="slider_container">
          <div className="slider">
            {isFetching ? (
              <Loader />
            ) : (
              data[8].documents?.map((doc, idx) => {
                if(!doc.salary) return
                return (
                  <div className="card glass" key={idx}>
                    <p className="para">
                      Salary: {doc.salary}$
                    </p>
                    <p className="para">
                      Gender: {doc.gender}
                    </p>
                    <p className="">
                      Views: {" "}
                      <span style={{ fontWeight: 500 }}>
                        {doc.views}
                      </span>
                    </p>
                    
                  </div>
                )
              }))
            }
          </div>

        </div>
      </div>


    </div>
  )
}

export default Slider
