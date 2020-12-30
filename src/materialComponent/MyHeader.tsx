import { makeStyles, Paper, Typography } from '@material-ui/core'
import React, { FC } from 'react';

const useStyles = makeStyles({
  root: {
    padding: '10px'
  }
})

const MyHeader: FC = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Typography variant='h2' className={classes.root} align='center'>
        Anime ranker
      </Typography>
    </Paper>
  )
}

export default MyHeader;