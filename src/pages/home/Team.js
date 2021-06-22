import React,{useState,useEffect} from 'react';
import TeamCard from './TeamCard';
import {GrAddCircle } from 'react-icons/gr'
import './styles/team.scss'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTeams } from '../../Action';
import AddTeam from './AddTeam';

const mapStateToProps=(state)=>{
    return {
        allTeams:state.setTeams.teams
    }

}
const mapDispatchToProps=(dispatch)=>{
    return{
        setAllTeams:(value)=>dispatch(setTeams(value))
    }
}

 const Team =(props) =>{

    const [loading,setLoading] =useState(true)
    const [modalState,setModalState] = useState(false)
    
    useEffect(() => {
       fetch('http://localhost:3000/vaco-api/allTeams')
       .then(res=>res.json())
       .then(data=>{
           props.setAllTeams(data)
           setLoading(false)
       })
    }, []);
    
    return(
        <div className='team'>
            <div className='team-comp'>
                <h2>All Teams({47}) <span>
                <GrAddCircle 
                    style={{position:'relative',top:'3px',color:'#053ED1'}} 
                    onClick={()=>setModalState(!modalState)}
                    />
                </span></h2>
                <NavLink to='/players'>View All players</NavLink>
                {loading?'loading':
                    <div className='card-container'>
                    {props.allTeams.map(team=>
                        <TeamCard key={team._id} data={team}/>
                    )}
                    </div>
                }
            </div>
            {
                modalState?<AddTeam onClick={setModalState} />:null
            }
        </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(Team);