import React ,{useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './styles/addTeam.scss'

const AddTeam = (props) => {

    const [name,setName] = useState('')

    const handleSubmit=()=>{
        fetch(`http://54.201.87.31/api/vaco-api/addTeam`,{
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
        <div className='add-Team'>
            <div className='container'>
                <TextField 
                variant='outlined' 
                size='small' 
                placeholder='Name of the team'
                onChange={(e)=>setName(e.target.value)}
                />
                <Button variant="contained" color="primary" disableElevation onClick={handleSubmit}>
                    Add Team
                </Button>
                <Button variant="contained" disableElevation onClick={()=>props.onClick(false)}>
                    Cancel
                </Button>
            </div>   
        </div>
    );
}

export default AddTeam;
