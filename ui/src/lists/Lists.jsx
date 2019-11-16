import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Lists.module.css';

import { 
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Container,
    Typography
} from '@material-ui/core'

import { Add, DoneOutlined } from '@material-ui/icons';

import { getList, addListItem, deleteListItem } from './thunks';

function Lists(props) {
    const { data, status, error } = useSelector(state => state.lists)
    const dispatch = useDispatch()
    useEffect(() => dispatch(getList()), [])
    const initialNewItem = {name: ''}
    const [newItem, changeNewItem] = useState(initialNewItem)
    const addItemInput = useRef(null)

    return (
        <Container maxWidth='md'>
            {status === 'loading' && 'Loading...'}
            {status === 'success' && (
                <React.Fragment>
                    <Typography
                        display='block'
                        align='center'
                        variant='h5'
                        gutterBottom={true}
                        variantMapping={{h5: 'h2'}}
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
                            onChange={(e) => changeNewItem({name: e.target.value})}
                        />
                        <IconButton color='primary' type='submit'>
                            <Add />
                        </IconButton>
                    </form>
                    <List
                        disablePadding={true}
                    >
                        {data.items && data.items.map((item, index, array) => (
                            <React.Fragment>
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
                                {index !== array.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </React.Fragment>
            )
        }
        </Container>
    )
}

export { Lists }