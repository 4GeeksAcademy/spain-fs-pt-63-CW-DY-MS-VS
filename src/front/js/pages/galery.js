import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import ImageCloudinary from '../component/imageCloudinary'

export const Galery = () => {
  const [artistsArray, setArtistsArray] = useState("")
  const { store, actions } = useContext(Context)
  const [allWorks, setAllWorks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await actions.getArtistsWithWorks()
      setAllWorks(data)
    }
    fetchData()
    console.log(allWorks);
  }, []);

  return (
    <div>
      {
        allWorks?.map((el, index) => (
          el.works.length > 0 && (
            <div key={index} className='artist my-2'>
              <Link to={'/artistGalery'}>
                <h3 className="text-danger m-3">{el.name}</h3>
              </Link>
              <div className='row'>
                {el.works.map(work => (
                  <div key={work.id} className="col-12 col-md-3">
                    <div className="card h-100">
                      <ImageCloudinary
                        imgId={work.image}
                        className="card-img-top w-auto"
                        style={{ width: 'auto', height: 'auto' }}
                        onClick={() => { }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))
      }
    </div>

  )
}

export default Galery

