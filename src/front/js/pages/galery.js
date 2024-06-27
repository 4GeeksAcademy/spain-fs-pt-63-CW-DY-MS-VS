import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import ImageCloudinary from '../component/imageCloudinary'

export const Galery = () => {
  const { store, actions } = useContext(Context)
  const [allWorks, setAllWorks] = useState([])

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await actions.getArtistsWithWorks()
      setAllWorks(data)
    }
    fetchData()

    return () => { isMounted = false }
  }, []);
  console.log(store.artistsWithWorks)
  return (
    <div className='mt-5'>
      {allWorks?.map((el, index) => (
        el.works.length > 0 && (
          <div key={index} className='artist my-2'>
            <Link to={`/artistGalery/${el.id}`}>
              <h3 className="text-danger m-3">{el.name}</h3>
            </Link>
            <div className='row'>
              {el.works.map(work => (

                <div key={work.id} className="col-12 col-md-4">
                  <div className="container bg-white bg-opacity-50 h-100 d-flex
                  justify-content-center flex-column gap-2 pt-2
                  align-items-center">
                    <Link to={`/workDetail/${work.id}`} ><ImageCloudinary
                      imgId={work.image}
                      classNames="custom-image"
                      onClick={() => { }}
                    />
                    </Link>
                    <p>{work.title}</p>
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

