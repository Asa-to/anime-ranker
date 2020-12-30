import { makeStyles, Theme, createStyles, Backdrop, CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';

const useStyle = makeStyles((theme: Theme) => 
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const BackdropCercular: FC<{ open: boolean }> = ({ open }) => {
  const classes = useStyle();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default BackdropCercular;