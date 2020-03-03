import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { FormControlLabel, Switch } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles'

const BlueSwitch = withStyles({
    switchBase: {
        '&$checked': {
            color: '#1976d2',
        },
        '&$checked + $track': {
            backgroundColor: '#1976d2',
        },
    },
    checked: {},
    track: {},
})(Switch)

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    image: {
        height: 'fit-content',
        width: 'fit-content',
    },
}))

const SwitchSprite = (props) => {
    const classes = useStyles()

    const [checked, setChecked] = useState(false)
    const [option, setOption] = useState('')

    const handleChange = event => {
        setChecked(event.target.checked)
    }

    useEffect(() => {
        if (props.images) {
            if (checked) {
                setOption(props.images.shiny.front)
            } else {
                setOption(props.images.current.front)
            }
        }
    }, [props.images, checked])

    return (
        <div className={classes.root}>
            <img className={classes.image} alt={'current pokemon'} src={option} />
            <FormControlLabel
                control={
                    <BlueSwitch
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label='Shiny'
                labelPlacement="bottom"
            />
        </div>
    )
}

export default SwitchSprite