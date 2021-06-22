import React from 'react';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { SetPlayers } from '../../Action';
import './styles/teamCard.scss'

const TeamCard = (props) => {

    const [players,setPlayers] = React.useState([])

    React.useEffect(()=>{
        fetch('http://localhost:3000/vaco-api/allTeamPlayers',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({teamId:props.data._id})
        })
        .then(res=>res.json())
        .then(data=>setPlayers(data))
    },[players])


    const removeTeam =()=>{
        fetch('http://localhost:3000/vaco-api/removeTeam',{
            method:'DELETE',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({team:props.data.name})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount===1){
                location.reload()
            }
            else{
                window.alert('something wrong')
            } 
        } 
        )
    }
    return (
        <div className='team-card'>
            <div className='card-head'>
                <h2>{props.data.name}
                </h2>
                <RiDeleteBin6Line style={{position:'relative',top:'3px',color:'#053ED1',fontSize:'1.3rem',marginRight:'10px'}}  
                    onClick={removeTeam}
                />
            </div>
            <div className='Card-body'>
                {
                    players.map((player,i)=><p key={i}>{player.name}</p>)
                }
            </div>
        </div>
    );
}

export default TeamCard;
