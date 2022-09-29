import React,{useState,useEffect} from 'react';
import { Frown } from 'react-feather';
import Modaldiv from '../components/Modal/Modal';
import Navbar from '../components/navbar/Navbar';
import Singlenote from '../components/Singlenote/Singlenote';

const Home = () => {

  const [data, setData] = useState([]);

    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem('myNotes')) || [])
    }, [])

   // console.log(data);

    const [showModal, setShowModal] = useState(false);
  return (
    <div>
      
      <Navbar setShowModal={setShowModal} data={data} setData={setData}/>
      {showModal && 
      <Modaldiv showModal={showModal} setShowModal={setShowModal}/>
      }

      {/* Notes */}
      <div className='row justify-content-between mx-0 p-5'>
        {!data.length ? 
        <h1 className='text-center display-1 fw-light my-5'>
          {/* <Frown size={100}/> No Notes! Create new One. */}
          <img src="https://i.ibb.co/VvQ53XK/img2.png" width='250px' alt=""/>
          <br/>
          No Notes! Create new one.
        </h1>
       
      :
      data.map((item,i)=>(
        <Singlenote key={item.id} item={item}/>
    )) 
      }
      </div>
    </div>
  );
}

export default Home;
