
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

  function SettingsForm({setSettings}) {
      //{settings, setSettings}
    // console.log("Settings Form date: ", settings.startDate.getDate());

    const classes = useStyles();
    const {handleSubmit, control } = useForm();

   const onSubmit = data => {
       
        // console.log("Data: ", data);
        let settingsData = data;
        //The T00:00 serves to put the date in local time
        let enteredDate = new Date(data.calStartDate + "T00:00");
       setSettings({ 
        dayNum: data.dayNumber,
        hourNum: data.dayLength,
        startHour: data.schedStartTime,
        startDate: enteredDate
      });

    };  

    return(
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h5'}>Settings Form</Typography>
                <Controller
                name="calStartDate"
                control={control}
                defaultValue="2021-04-07"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                label="Calendar Start Date"
                type="date"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Calendar start date required' }}
                />

                <Controller
                name="dayNumber"
                control={control}
                defaultValue="3"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                label="Number of Days"
                type="number"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Day length required' }}
                />

                <Controller
                name="schedStartTime"
                control={control}
                defaultValue="9"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                label="Schedule Start Time"
                type="number"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Start time required' }}
                />
                <Controller
                name="dayLength"
                control={control}
                defaultValue="12"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                label="Day Length (in hours)"
                type="number"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                />
                )}
                rules={{ required: 'Day length required' }}
                />
                <Button type="submit" variant="contained" >
                Submit
                </Button>

            </form>
    );
  }

  export default SettingsForm;