import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles({
  root: {
    padding: '5px 15px',
  }
});

const NoData: FC = () => {
  const classes = useStyles();

  return (
    <Typography variant='h2'>
      <Paper className={classes.root} elevation={1}>
        No Data
      </Paper>
    </Typography>
  )
}

export default NoData;