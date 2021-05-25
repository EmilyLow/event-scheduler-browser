
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

import {Controller, useForm,} from "react-hook-form";


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
   
      padding: theme.spacing(2)
    },
  }));


function InputForm(props) {
    const classes = useStyles();
     const {handleSubmit, control } = useForm();
    
    const {addEvent} = props;

    const onSubmit = data => {
      addEvent(data);
    }

    return(
       
            
            
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h5'}>Event Form</Typography>
            <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Title"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            rules={{ required: 'Title required' }}
            />

        <Controller
            name="start_time"
            control={control}
            defaultValue="2021-05-07T10:30"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Start Time"
            type="datetime-local"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            rules={{ required: 'Title required' }}
            />

    <Controller
            name="end_time"
            control={control}
            defaultValue="2021-05-07T12:00"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="End Time"
            type="datetime-local"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            rules={{ required: 'Title required' }}
            />

            <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Location"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            />

        <Controller
            name="speaker"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Speaker"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            />

            <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Description"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
            )}
            />


            <Button type="submit" variant="contained" >
                Submit
            </Button>

        </form>
       
    );
}


export default InputForm;