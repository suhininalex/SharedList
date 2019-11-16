import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Lists.module.css';
import { IconButton, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons';

import { getList } from './thunks';

function Lists(props) {
    const { data, status, error } = useSelector(state => state.lists)
    const dispatch = useDispatch()
    useEffect(() => dispatch(getList()), [])

    return (
        <section className={styles.Container}>
            {status === 'loading' ? 'Loading...' : data.name}
            <TextField
                type='text'
                variant='outlined'
                margin='dense'
                label='Название'
            />
            <IconButton><Add /></IconButton>
            <ul>
                {data.items && data.items.map(item => <li>{item.name}</li>)}
            </ul>
        </section>
    )
}

export { Lists }