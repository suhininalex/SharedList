import React, { useEffect } from 'react'
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

import { getList } from './thunks';

function Lists(props) {
    const { data, status, error } = useSelector(state => state.lists)
    const dispatch = useDispatch()
    useEffect(() => dispatch(getList()), [])

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
                    <div className={styles.addItem}>
                        <TextField
                            type='text'
                            variant='outlined'
                            margin='dense'
                            label='Название'
                        />
                        <IconButton color='primary'>
                            <Add />
                        </IconButton>
                    </div>
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
                                        <IconButton>
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