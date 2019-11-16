import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './ProductList.module.css';

import {
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Container,
    Typography,
    Paper,
    CircularProgress
} from '@material-ui/core'

import { Add, DoneOutlined } from '@material-ui/icons';

import { Redirect } from 'react-router-dom';

import { getList, addListItem, deleteListItem } from '../../thunks';

function ProductList(props) {
    const { data, status, error } = useSelector(state => state.productList)
    const dispatch = useDispatch()
    useEffect(() => dispatch(getList(props.match.params.id)), [props.match.params.id, dispatch])
    const initialNewItem = { name: '' }
    const [newItem, changeNewItem] = useState(initialNewItem)
    const addItemInput = useRef(null)

    return (
        <Container maxWidth='md'>
            {status === 'loading' && <CircularProgress />}
            {status === 'success' && (
                <Paper>
                    <header className={styles.listHeader}>
                        <Typography
                            display='block'
                            align='center'
                            variant='h5'
                            gutterBottom={true}
                            variantMapping={{ h5: 'h2' }}
                        >
                            {data.name}
                        </Typography>
                        <form
                            className={styles.addItem}
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(addListItem(newItem)).then(changeNewItem(initialNewItem))
                                addItemInput.current.focus();
                            }}
                        >
                            <TextField
                                type='text'
                                variant='outlined'
                                margin='dense'
                                label='Название'
                                value={newItem.name}
                                inputRef={addItemInput}
                                onChange={(e) => changeNewItem({ name: e.target.value })}
                            />
                            <IconButton color='primary' type='submit'>
                                <Add />
                            </IconButton>
                        </form>
                    </header>
                    <List
                        disablePadding={true}
                        className={styles.itemsList}
                    >
                        {data.items && data.items.map(item => (
                            <React.Fragment>
                                <Divider />
                                <ListItem button>
                                    <ListItemText>
                                        {item.name}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => dispatch(deleteListItem(item.name))}>
                                            <DoneOutlined />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
            {error && error.code === 404 && <Redirect to='/' />}
        </Container>
    )
}

export { ProductList }