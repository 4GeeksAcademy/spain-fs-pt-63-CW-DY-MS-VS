import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'




const artists = {
  artist1: {
    first_name: 'Pablo',
    last_name: 'Picasso',
    portraits: ['https://d7hftxdivxxvm.cloudfront.net/?height=801&quality=1&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fq1nXR7uZPvLoOXfgjLcGrg%2Fsmall.jpg&width=801',
      ' https://www.singulart.com/blog/wp-content/uploads/2023/07/image-1140x509.png',
      'https://art.newcity.com/wp-content/uploads/2022/07/Old-Guitarist_G40326_83A-e1655901871198.gif',
      'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydGlzdFwvaW1hZ2VGaWxlXC9wYWJsby1waWNhc3NvLXNlbGYtcG9ydHJhaXRzLWNocm9ub2xvZ3ktMi5qcGciLCJyZXNpemUsNjAwLDYwMCJdfQ.qFs_a6vEMRrXhj5G9kmDuXI01gdj9cVeV1-h/hBz1KIE.jpg'
    ]
  },
  artist2: {
    first_name: 'Leonardo',
    last_name: ' da Vinci',
    portraits: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7KVQ9F9Wlrnd1psv2F5ekTLP-veNiCSRXYTKIGFygntGCUAe3Qg0dICves2ObP2Y9CLU&usqp=CAU',
      'https://cdn.culturagenial.com/es/imagenes/mona-lisa-0.jpg',
      ' https://antigonejournal.com/wp-content/uploads/2021/05/VM2-1024x1010.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/400px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg']
  },
  artist3: {
    first_name: 'Vincent',
    last_name: 'van Gogh',
    portraits: ['https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg',
      'https://www.vincentvangogh.org/assets/img/paintings/self-portrait.jpg',
      'https://www.nationalgallery.org.uk/media/34076/n-3863-00-000126-hd.jpg?rxy=0.514792899408284,0.41459627329192544&width=1920&height=1080&rnd=132385890123800000',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VaoBzLEkT2poQhaAMGifoseZldgVH8Ipzg&s'
    ]
  },
  artist4: {
    first_name: 'Rembrandt',
    last_name: '',
    portraits: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/640px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg',
      'https://www.singulart.com/blog/wp-content/uploads/2023/08/image-66-1140x859.png',
      'https://www.artnews.com/wp-content/uploads/2021/02/SK-C-5.jpg?w=1200',
      'https://sothebys-com.brightspotcdn.com/9d/54/c3ff319e46bf9ed2565160e11a98/rembrandt-portrait-of-saskia-van-uylenburgh-1612-1642-circa-1633-1634-gemaldegalerie-alte-meister-kassel.jpg'
    ]
  }
}
const artistsArray = Object.values(artists);
export const Galery = () => {
  const { store } = useContext(Context)
  return (
    <div>
      {
        artistsArray.map((el) => (
          <div className='artist my-2' >
            <Link to={'/artistDetail'}>
              <h3 className="text-danger m-3">{el.first_name + ' ' + el.last_name}</h3>
            </Link>
            <div className='row'>
              {
                el.portraits.map((el) => (
                  <div className="col-12 col-md-3">
                    <div className="card h-100"  >
                      <img src={el} className="card-img-top w-auto" style={{ width: '400px', height: '300px' }} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>


        ))
      }
    </div>

  )
}



