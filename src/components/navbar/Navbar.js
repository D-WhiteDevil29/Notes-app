import React, {useState} from "react";
import {Search,Plus, Trash2,BookOpen, RefreshCcw, Loader,} from 'react-feather';
import './navbar.css';

const Navbar = ({setShowModal,data,setData}) => {
  //  console.log(data);
   const [searchvalue, setSearchValue] = useState("");
  
   const deleteAll = ()=>{
    const pass = window.confirm('Are you sure you want to delete all notes ?');
    if(!pass)
    {
      return;
    }
    localStorage.removeItem('myNotes');
    window.location.reload();
   }


   const sorter = (value) => {
    
    if(value === 'latest'){
        data.sort((a, b) => b.id - a.id);
    }
    if(value === 'oldest'){
        data.sort((a, b) => a.id - b.id);
    }
    if(value === 'high'){
      data.sort((a,b)=>(a.priority.localeCompare(b.priority)));
    } 
    if(value === 'normal'){
      data.sort((a,b) => (b.priority.localeCompare(a.priority)));
    } 
    setData([...data]);
}


  const search = (e)=> {
    e.preventDefault();
    let newData ;
    if(searchvalue) 
    {
      newData = data.filter((x)=>x.title.toLowerCase().includes(searchvalue.toLowerCase()));
      setData([...newData]);
    }
    else
    {
      window.location.reload();
    }
  }
 
  const Reload = ()=>
  {
    window.location.reload();
    return;
  }


  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-dark bg ">
  <div className="container-fluid">
    <span className="color">My Note <BookOpen/></span>
    <button className="navbar-toggler px-2 py-1 rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle my-3" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="Sort">Sort By </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" onClick={()=> sorter('latest')}>Latest first</a></li>
            <li><a className="dropdown-item" onClick={()=> sorter('oldest')}>Oldest first</a></li>
            <li><a className="dropdown-item" onClick={()=> sorter('high')}>Priority high</a></li>
            <li><a className="dropdown-item" onClick={()=> sorter('normal')}>Priority normal</a></li>
          </ul> 
        </li>

        <div className="Flexbox">
        <li className="nav-item mx-2">
          <button className="nav-link btn btn-sm btn-info text-light px-2 my-3" onClick={()=>setShowModal(true)}><Plus/> Add New </button>
        </li>
        <li className="nav-item mx-2">
          <button className="nav-link btn btn-sm btn-danger text-light px-2 my-3" onClick={deleteAll}><Trash2/>  Delete all </button>
        </li>
        <li className="nav-item mx-2">
          <button className="nav-link btn btn-sm btn-primary text-light px-2 my-3" onClick={Reload}><Loader/>  Reload </button>
        </li>
        </div>
      </ul>
      <form className=" px-2 d-flex" role="search" onSubmit={search}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=> setSearchValue(e.target.value)} />
        <button className="btn btn-outline-success" type="submit"> {searchvalue ? <Search/> : <RefreshCcw/>}</button>
      </form>
    </div>
  </div>
</nav>

</>
  );
}


export default Navbar;
