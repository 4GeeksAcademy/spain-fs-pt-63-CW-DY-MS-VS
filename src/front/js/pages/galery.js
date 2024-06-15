import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'

export const Galery = () => {
  const { store, actions } = useContext(Context)
  const [artistsArray, setArtistsArray] = useState("")
  const [allWorks, setAllWorks] = useState("")

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await actions.getAllArtists();  // Fetch all artists and set them in the store
        const artistsData = store.artists;
        console.log(artistsData)

        if (artistsData) {
          const artistIds = artistsData.map(el => el.id);
          console.log(artistIds)

          const works = artistIds.map(id => actions.getWorks(id));
          const worksData = await Promise.all(works);

          console.log(worksData)
          // Flatten the array of works arrays and set state
          setAllWorks(worksData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);  // Dependencies array


  return (
    <div>
      {/* {
        artistsArray.map((el) => ( */}
      <div className='artist my-2' >
        <Link to={'/artistGalery'}>
          {/* <h3 className="text-danger m-3">{el.first_name + ' ' + el.last_name}</h3> */}
        </Link>
        <div className='row'>
          {/* {
                el.portraits.map((el) => (
                  <div className="col-12 col-md-3">
                    <div className="card h-100"  >
                      <img src={el} className="card-img-top w-auto" style={{ width: '400px', height: '300px' }} />
                    </div>
                  </div>
                ))
              } */}
        </div>
      </div>


      ))
      {/* } */}
    </div>

  )
}

export default Galery

