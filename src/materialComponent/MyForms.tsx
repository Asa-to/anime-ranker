import { Button, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { FC, useRef } from 'react';

const range = (start: number, end: number) => Array.from({ length: (end - start) + 1}, (_, i) => start + i);

type MyForm = {
  setYear: React.Dispatch<number>,
  setSeason: React.Dispatch<number>,
  year: number,
  season: number,
}

const useStyles = makeStyles(
  createStyles({
    root: {
      margin: '5px',
    },
    item: {
      margin: '0 2px',
    },
    buttonItem: {
      margin: '0 2px',
    },
    button: {
      display: 'block',
      margin: '4px 0',
    },
  })
);

const MyForms: FC<MyForm> = ({setYear, setSeason, year, season}) => {
  const yearRef = useRef<HTMLInputElement>(null);
  const seasonRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(yearRef.current) setYear(Number(yearRef.current.value));
    if(seasonRef.current) setSeason(Number(seasonRef.current.value));
  }

  return (
    <Grid className={classes.root} container direction='row' justify='center'>
      <Grid className={classes.item} item>
        <FormControl>
          <InputLabel id='year-input-label'>年</InputLabel>
          <Select inputRef={yearRef} labelId='year-input-label' defaultValue={year}>
            {range(2014, new Date().getFullYear()+1).reverse().map((option) => 
              <MenuItem key={option} value={option}>
                {`${option}`}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={classes.item} item>
        <FormControl ref={seasonRef}>
          <InputLabel id='season-input-label'>期</InputLabel>
          <Select inputRef={seasonRef} labelId='season-input-label' defaultValue={season}>
            {range(1, 4).map((option) => 
              <MenuItem key={option} value={option}>
                {`${option}`}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={classes.buttonItem} item>
        <Button className={classes.button} type='submit'  variant='outlined' onClick={handleClick}>
          更新
        </Button>
      </Grid>
    </Grid>
  )
}

export default MyForms;
