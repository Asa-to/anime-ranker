import { createStyles, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { FC } from 'react';

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '10px',
      whiteSpace: 'nowrap',
    },
  })
);

const MyHeader: FC = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Typography variant='h3' className={classes.root} align='center'>
        Anime ranker
      </Typography>
    </Paper>
  )
}

export default MyHeader;