import {useEffect, useState} from "react";
import axios from "axios";

export default function SearchPublicGist(username, pageNumber) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [gists, setGists] = useState([]);

    useEffect(() => {
        setGists([])
    }, [username])

    useEffect(() => {
        if (username != ""){
            setLoading(true)
            setError(false)
            let cancel
            axios({
                method: 'GET',
                url: 'https://api.github.com/gists/public',
                params: { page: pageNumber},
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {

                // setGists(prevGist => {
                //     return [...prevGist, ...res.data]
                // })
                for (let i = 0; i < res.data.length; i++){
                    console.log(res.data[i])
                    if (res.data[i].owner.login == username){
                        setGists(prevGist => {
                            return [...prevGist, res.data[i]]
                        })
                    }
                }
                setLoading(false)
                console.log(res.data)
            }).catch(e => {
                if (axios.isCancel(e)) {
                    setError(true)
                }
            })
            return () => cancel()
        }
    }, [username, pageNumber])
    return {loading, error, gists}
}