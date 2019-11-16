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

import { Add, DoneOutlined, Delete, Close } from '@material-ui/icons';

import { Redirect } from 'react-router-dom';

import { getList, addListItem, deleteListItem, deleteList, saveListName } from '../../thunks';
import { changeNewListName } from '../../actions';

function ProductList(props) {
    const { data, status, error, newName } = useSelector(state => state.productList)
    const dispatch = useDispatch()
    useEffect(() => dispatch(getList(props.match.params.id)), [props.match.params.id, dispatch])
    const initialNewItem = { name: '' }
    const [newItem, changeNewItem] = useState(initialNewItem)
    const [isEditMode, handleEditMode] = useState(false);
    const addItemInput = useRef(null)

    return (
        <div className={styles.container}>
            {status === 'loading' && <CircularProgress />}
            {status === 'success' && (
                <Paper>
                    <header className={styles.listHeader}>
                        {isEditMode ? (
                            <form
                                className={styles.changeNameForm}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (newName === data.name) {
                                        handleEditMode(false)
                                        return
                                    }
                                    dispatch(saveListName(data.id, newName)).then(res => handleEditMode(false))
                                }}
                            >
                                <TextField
                                    type='text'
                                    variant='outlined'
                                    margin='dense'
                                    label='Название списка'
                                    value={newName}
                                    autoFocus={true}
                                    onChange={(e) => dispatch(changeNewListName(e.target.value))}
                                />
                                <IconButton
                                    color='primary'
                                    type='submit'
                                >
                                    <DoneOutlined />
                                </IconButton>
                                <IconButton
                                    type='button'
                                    color='secondary'
                                    onClick={() => {
                                        if (data.name !== newName) {
                                            dispatch(changeNewListName(data.name))
                                        }
                                        handleEditMode(false)
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </form>
                        ) : (
                                <div className={styles.listNameContainer}>
                                    <Typography
                                        display='block'
                                        align='center'
                                        variant='h5'
                                        variantMapping={{ h5: 'h2' }}
                                        onClick={() => handleEditMode(true)}
                                    >
                                        {data.name}
                                    </Typography>
                                    <IconButton color='secondary' onClick={() => dispatch(deleteList(data.id)).then(res => props.history.push('/'))}>
                                        <Delete />
                                    </IconButton>
                                </div>
                            )}
                        <form
                            className={styles.addItem}
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(addListItem(data.id, newItem)).then(changeNewItem(initialNewItem))
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
                                        <IconButton onClick={() => dispatch(deleteListItem(data.id, item.name))}>
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
        </div>
    )
}

export { ProductList }