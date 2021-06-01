import React from "react";
import Typography from '@material-ui/core/Typography';
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

  let {settings, addEvent} = props;
 

    const classes = useStyles();
    const {handleSubmit, control, watch } = useForm();
    

    let watchStartTime = watch("start_time", "");


    const onSubmit = data => {
      addEvent(data);
    }

 function testVal(v) {
   console.log("Testval", v);
   return true;
 }

 function testDate(v) {
   console.log("Testdate", v);
   return true;
 }

 //Checks whether the given input is within the range given by the settings.
 function checkInputRange(sDate) {
  let pDate = new Date(sDate);
  let scheduleStart = new Date(settings.startDate);
  scheduleStart.setHours(settings.startHour);

  let scheduleEnd = new Date(scheduleStart);

  scheduleEnd.setDate(scheduleStart.getDate() + settings.dayNum -1);
  
  scheduleEnd.setHours(settings.startHour + settings.hourNum);



  if(pDate >= scheduleStart && pDate <= scheduleEnd) {
    return true;
  }
  else {
    return false;
  }
 }

 function checkEventLength(sDate) {

  let date1 = new Date(watchStartTime);
  let date2 = new Date(sDate);
  
  let diff = Math.abs(date1 - date2);
  let minutes = Math.floor((diff/1000)/60);

  if (minutes < 30) {
    return false;
  } else {
    return true;
  }
 }

 function checkSingleDay(sDate) {
  let date1 = new Date(watchStartTime);
  let date2 = new Date(sDate);

  if(date1.getDate() === date2.getDate()){
    return true;
  } else {
    return false;
  }
  
 }

 function checkInOrder(sDate) {
  let date1 = new Date(watchStartTime);
  let date2 = new Date(sDate);

  if(date1 < date2) {
    return true;
  } else {
    return false;
  }
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
            rules={{ required: 'Title required'}}
            />

        <Controller
            name="start_time"
            control={control}
            defaultValue="2021-05-07T10:00"
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
            rules={{ validate: v => checkInputRange(v) || "Date outside selected range."}}
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
           rules={{ 
             validate: {
               inBounds: v => checkInputRange(v) || "Date outside selected range.",
               eventLength: v => checkEventLength(v) || "Event must be greater than 30 minutes.",
               inOrder: v => checkInOrder(v) || "Start time must be before end time.",
               sameDay: v => checkSingleDay(v) || "Event must start and end on same day."
              }}
           } 
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