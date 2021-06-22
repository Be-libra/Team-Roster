import {combineReducers} from 'redux';
import { setPlayersSearchField } from './PlayersSearch';
import {setTeamsSearchField} from './teamSearchField'
import {setTeams} from './setTeams'
import { setPlayers } from './setPlayers';

export const rootReducer = combineReducers({setPlayersSearchField,setTeamsSearchField,setTeams,setPlayers})