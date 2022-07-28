import React, {useEffect} from "react";
import {useState} from "react";

export default function CardContent(props) {

    return(
        <div>
            <p className="m-0" style={{lineHeight: '1.5'}}><a href={props.file['raw_url']}>{props.file.filename}</a></p>
        </div>
    )
}