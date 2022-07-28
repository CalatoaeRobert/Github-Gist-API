import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import CardContent from "./cardcontent";
import axios from "axios";

export default function GistCard(props){
    const [languages, setLanguages] = useState([]);
    const [forks, setForks] = useState([])
    const [lastForks, setLastForks] = useState([]);

    const setProgrammingLanguages = () => {
        let list = []
        Object.keys(props.gist.files).map(file => {
            if (!list.includes(props.gist.files[file].language)){
                list.push(props.gist.files[file].language)
            }
        })
        setLanguages(list)
    }

    const getForks = () => {
        axios({
            method: 'GET',
            url: props.gist['forks_url'],
        }).then(res => {
            setForks(prevForks => {
                return [...prevForks, ...res.data]
            })
            })
    }

    const setLast3Forks = () => {
        let last3Persons = []
        if (forks.length!=0){
            for (let i = 0; i <= 2; i++){
                if (forks[i] != undefined){
                    console.log(forks[i].owner.login)
                    let user = forks[i].owner.login
                    last3Persons.push(user)
                }
            }
            setLastForks(last3Persons)
        }
    }

    useEffect(() => {
        setProgrammingLanguages()
        getForks()
    }, [props.gist.files])

    useEffect(() => {
        setLast3Forks()
    }, [forks])

    useEffect(() =>{

    }, [languages])

    return(
        <div>
            <Card style={{ marginBottom: '2em' }}>
                <p>Languages: {languages.toString()}</p>
                {Object.keys(props.gist.files).map(file => {
                    return <CardContent file={props.gist.files[file]}/>
                })}
                <p>LastForks: {lastForks.toString()}</p>
            </Card>
        </div>
    )
}