import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import ImageCloudinary from '../component/imageCloudinary'
import "../../styles/home.css"
import "../../styles/workCard.css"

export const Galery = () => {
  const { store, actions } = useContext(Context)
  const [allWorks, setAllWorks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await actions.getArtistsWithWorks()
      setAllWorks(data)
    }
    fetchData()

  }, []);

  return (
    <div className='gallery-container'>
      {allWorks?.map((el, index) => (
        el.works.length > 0 && (
          <div key={index} className='d-flex flex-column border-bottom border-dark pb-4 justify-content-center align-items-center '>
            <Link className='w-50 mx-auto text-center my-2' to={`/artistGalery/${el.id}`}>
              <h3 className="artist-links-gallery py-3 m-2 w-100">{el.name}</h3>
            </Link>
            <div className='col-12 4 d-flex justify-content-center gap-5 flex-wrap'>
              {el.works.map(work => (
                <div key={work.id} className="col-12 p-0 col-md-3 d-flex justify-content-center">
                  <div className="gallery-frame h-100 d-flex
                  justify-content-center flex-column
                  align-items-center work-card-gallery">
                    <Link className='h-100' to={`/workDetail/${work.id}`} >
                      <ImageCloudinary
                        imgId={work.image}
                        classNames="work-image-gallery object-fit-cover w-100"
                      />
                    </Link>
                    <h5 className='text-white text-center w-100 h-100 work-details p-3 m-0'>{work.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Galery

