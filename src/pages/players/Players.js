import React,{useState,useEffect} from 'react'
import {RiDeleteBin6Line} from 'react-icons/ri'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField'
import {GrAddCircle} from 'react-icons/gr'
import {connect} from 'react-redux'
import {PlayersSearchField, SetPlayers,setTeams} from '../../Action'
import AddPlayer from './AddPlayer';
import './styles/players.scss'

const mapStateToProps=(state)=>{
    return {
        searchValue:state.setPlayersSearchField.searchValue,
        players:state.setPlayers.players,
        allTeams:state.setTeams.teams
    }

}
const mapDispatchToProps=(dispatch)=>{
    return{
        setSearchField:(value)=>dispatch(PlayersSearchField(value)),
        setAllPlayers:(value)=>dispatch(SetPlayers(value)),
        setAllTeams:(value)=>dispatch(setTeams(value))
    }
}

const Players =(props)=>{

    const [teams,setTeams] =useState({})
    const [fileteredPlayers,setFilteredPlayers] = useState([])
    const [modalState,setModalState]=useState(false)
    
    useEffect(()=>{
        fetch('http://localhost:3000/vaco-api/allplayers')
        .then(res=>res.json())
        .then(playerdata=>{
            fetch('http://localhost:3000/vaco-api/allTeams')
            .then(res=>res.json())
            .then(data=>{
                props.setAllTeams(data)
                const teamObj={}
                data.map(team=>{
                    teamObj[team._id]=team.name
                })
                setTeams(teamObj)
                props.setAllPlayers(playerdata)
                setFilteredPlayers(playerdata)
            })
            

        })


    },[])

    const removePlayer =(id)=>{
        fetch(`http://localhost:3000/vaco-api/removePlayer`,{
            method:'DELETE',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({playerId:id})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount===1){
                location.reload()
            }
            else{
                window.alert('something wrong')
            }
        })
    }

    const handleSearchFieldChange=(e)=>{
        const search=e.target.value
        const filter = props.players.filter(player=> player.name.toLowerCase().includes(search.toLowerCase()))
        setFilteredPlayers(filter)
        props.setSearchField(e.target.value)
    }

    return(
        <div className='contact-container'>
            <div className='head'>
                <h2>All pLayers({props.players.length})<span>  
                    <GrAddCircle 
                    onClick={(e)=>setModalState(!modalState)}
                    style={{position:'relative',top:'3px',color:'#053ED1'}} 
                    />
                    </span></h2>
                <TextField 
                    variant='outlined'  
                    placeholder='Search' 
                    size="small" 
                    value={props.searchValue} 
                    onChange={handleSearchFieldChange}
                />
            </div>
            
            <TableContainer className='table-container'>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="left">Team</TableCell>
                        <TableCell align="left">PlayerId</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileteredPlayers.map((player,i)=>
                            <>
                                <TableRow key={player._id} >
                                    <TableCell scope="row">
                                        {player.name}
                                    </TableCell>
                                    <TableCell ><p>{teams[player.team]}</p></TableCell>
                                    <TableCell ><p>{player._id}</p></TableCell>
                                    <TableCell className='delete-icon'>
                                        <RiDeleteBin6Line onClick={()=>removePlayer(player._id)}/>
                                        </TableCell>
                                </TableRow>
                            </>
                        
                        )}
                    </TableBody>
                </Table>
            </TableContainer>    

            {modalState?<AddPlayer  onClick={setModalState}/>:null }
        </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(Players);