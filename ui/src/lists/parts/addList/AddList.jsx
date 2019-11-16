import React, { useState } from 'react'
import styles from './AddList.module.css';

import {
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core'

import { Add } from '@material-ui/icons';

import { call } from 'libs/api-helpers';
import { url } from '../../consts';

function AddList(props) {
    const initialNewList = { name: '' }
    const [newList, changeNewList] = useState(initialNewList)

    return (
        <div className={styles.container}>
            <header>
                <Typography
                    display='block'
                    align='center'
                    variant='h5'
                    variantMapping={{ h5: 'h2' }}
                >
                    Новый список
                </Typography>
            </header>
            <form
                className={styles.addList}
                onSubmit={(e) => {
                    e.preventDefault();
                    call(`${url}/lists`, 'PUT', {}, data => data, null, newList)
                    .then(response => {
                        changeNewList(initialNewList)
                        props.history.push(`/lists/${response.id}`)
                    })
                }}
            >
                <TextField
                    type='text'
                    variant='outlined'
                    margin='dense'
                    label='Название'
                    value={newList.name}
                    onChange={(e) => changeNewList({ name: e.target.value })}
                />
                <IconButton color='primary' type='submit'>
                    <Add />
                </IconButton>
            </form>
        </div>
        
    )
}

export { AddList }