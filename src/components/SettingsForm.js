
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

  function SettingsForm({settings, updateSettings}) {
  

    const classes = useStyles();
    const {handleSubmit, control, watch } = useForm();

    let watchStartTime = watch("schedStartTime", "");

   const onSubmit = data => {
        let settingsData = data;
        //The T00:00 serves to put the date in local time
        let enteredDate = new Date(data.calStartDate + "T00:00");
        
     
        updateSettings({ 
      id: settings.id,
      dayNum: Math.floor(data.dayNumber),
      hourNum: Math.floor(data.dayLength),
      startHour: parseInt(data.schedStartTime),
      startDate: enteredDate
    })

    //If start date changed, recalculate/reorganize on all days
    //If number of days decreased, delete events on day
    //If scheduled start time moved later, delete relevant events.
    //If scheduled start time moves, adjust all event positions
    //If day length shortened, delete relevant events. 
  
   


    };  


    function checkEnd(dayLength) {

      if((parseInt(dayLength) + parseInt(watchStartTime)) > 23) {
        console.log((dayLength + watchStartTime))
        return false;
      } else {
        return true;
      }
    }

    //TO DO, add condition to check for out of bounds hours events
    return(
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h5'}>Settings Form</Typography>
                <Controller
                name="calStartDate"
                control={control}
                defaultValue="2021-05-07"
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
                rules={{ 
                  required: 'Calendar start date required.'
                 
                }}
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
                rules={{ required: 'Day length required',
                        min: {
                               value: 1,
                               message: "The minimum value is 1 day."
                              },
                        max: {
                                value: 7,
                               message: "The maximum value is 7 days."
                              }
              }}
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
                rules={{ required: 'Start time required',
                          min: {
                               value: 0,
                               message: "Value must be between 0 and 23."
                              },
                        max: {
                                value: 23,
                               message: "Value must be between 0 and 23"
                              }
              }}
                />
                <Controller
                name="dayLength"
                control={control}
                defaultValue="13"
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
                rules={{ required: 'Day length required',
                        validate: v => checkEnd(v) || "Schedule can't extend past midnight."
              }}
                />
                <Button type="submit" variant="contained" >
                Submit
                </Button>

            </form>
    );
  }

  export default SettingsForm;