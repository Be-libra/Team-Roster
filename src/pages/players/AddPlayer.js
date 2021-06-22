import React from 'react';
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import './styles/addPlayer.scss'

const mapStateToProps=(state)=>{
    return{
        allTeams:state.setTeams.teams
    }
}



const AddPlayer = (props) => {

    const [name,setName] =React.useState('')
    const [teamId,setTeamID] =React.useState('')

    const handleSubmit=()=>{
        fetch(`http://54.201.87.31/api/vaco-api/team/${teamId}/player`,{
            method:'POST',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify({
                name
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data._id){
                location.reload()
            }
            else{
                window.alert('try again by refreshing')
            }
        })
    }
    return (
        <div className='add-player-modal' >
            <div className='container'>
                <TextField 
                variant='outlined' 
                size='small' 
                placeholder='Name of the player'
                onChange={(e)=>setName(e.target.value)}
                />
                <FormControl variant="outlined" >
                    <Select
                    labelId="teams"
                    id="team"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.allTeams.map(team=>
                        <MenuItem value={team._id} onClick={(e)=>setTeamID(team._id)}>{team.name}</MenuItem>  
                    )}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" disableElevation onClick={handleSubmit}>
                    Add Player
                </Button>
                <Button variant="contained" disableElevation onClick={()=>props.onClick(false)}>
                    Cancel
                </Button>
                
            </div>
        </div>
    );
}

export default connect(mapStateToProps,null)(AddPlayer);
