import React, { useState } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import './Icon.css'


const Icon = (props) => {



    return (
        <Button className="tab">
            <div className="button-content">
                <div className="icon">
                    <img width="128px" height="128px" alt="alt" src={props.url} />
                </div>
                <div>
                    <Typography>
                        {props.buttonName}
                    </Typography>
                </div>
            </div>
        </Button >
    )
}

export default Icon;