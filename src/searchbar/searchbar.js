import { InputText } from 'primereact/inputtext';
import {useRef, useState, useCallback} from "react";
import SearchPublicGist from "./searchPublicGist";
import GistCard from "../card/gistcard";

export default function Searchbar() {
    const [username, setUsername] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const {
        gists,
        loading,
        error
    } = SearchPublicGist(username, pageNumber)

    const observer = useRef()
    const lastGistRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])

    const handleUsernameChange = (newValue) => {
        setUsername(newValue.target.value);
        setPageNumber(1)
    };


    return (
        <div style={{textAlign: "center"}}>
            <InputText value={username}  onChange={handleUsernameChange} placeholder="Enter Github username" />
            <div className="grid m-3" style={{}}>
                {gists.map((gist, index) => {
                    if (gists.length === index + 1){
                        return <div ref={lastGistRef} key={gist.url} className="col-12 md:col-6 block mb-2">
                            <GistCard gist={gist}/>
                        </div>
                    }
                    return <div key={gist.url} className="col-12 md:col-6 block mb-2">
                        <GistCard gist={gist}/>
                    </div>
                })}
            </div>
            <div>{loading && "loading"}</div>
        </div>
    );
}