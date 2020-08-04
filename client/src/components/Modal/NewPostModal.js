import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useGlobalStore } from '../GlobalStore';
import API from '../../utils/API';
import processServerReturn from '../../utils/processServerReturn';
import ResponsiveSubmit from '../ResponsiveSubmit'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *' : {
      marginBottom: theme.spacing(2),
    }
  },
  modal: {
    maxWidth: '100vw',
    '& .MuiDialog-paper': {
        margin: '10px'
    }
  },
  responsiveWrapper: {
    display: 'inline-block'
  },
  changeWidth: {
    width: "90%",
    marginBottom: theme.spacing(2),
  }

}));

export default function SimpleModal() {
  const [globalStore, dispatch] = useGlobalStore();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    color: color || '',
    company: company,
    postingType: postingType,
    title : title || '',
    location : location || '',
    salary: salary || '',
    notes : notes || '',
    postLink : postLink || '',
    applied: applied || false,
    appliedDate: appliedDate || '',
    heardBack: heardBack || false,
    heardBackDate: heardBackDate || '',
    interviewState: interviewState || '',
    interviewNote: interviewNote || '',
    companyContact: companyContact || '',
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckChange = (prop) => (event) => {
      setValues({...values, [prop]: event.target.checked})
  }

  const handleDateChange = (prop) => (date) => {
      setValues({...values, [prop]: date})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const success = await submitChange()
    setTimeout(() => setLoading(false), 500);
    
    if (success){
      setOpen(false)
      props.rerender()
    }
  }

  const submitChange = async () => {

    //Validate the fields are valid for the DB

    //company can't be empty
    if (values.company === ''){
      dispatch({ do: 'setMessage', type: 'error', message: 'The company name cannot be empty' });
      setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
      return
    }

    //title can't be empty
    if (values.title === ''){
      dispatch({ do: 'setMessage', type: 'error', message: 'The title cannot be empty' });
      setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
      return
    }

    //postLink has to be a valid URL
    // TODO add in regex to check if valid URL string
    if(false){
      dispatch({ do: 'setMessage', type: 'error', message: 'The posting link is not a valid URL' });
      setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
      return
    }

    //Salary must be a number

    //removing any empty fields from the put statement
    let newBody = values
    Object.keys(newBody).forEach((key) => {
      if (!newBody[key]){
        delete newBody[key]
      }
    })
    
    const serverResponse = await API.put(`/api/posts/${_id}`, values)

    processServerReturn(serverResponse, dispatch)

    return !serverResponse.error
    

  }
  
  const body = (
    <Grid container direction='column' className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container alignItems="flex-end">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date Added"
                    value={values.dateAdded}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }} />
            </Grid>
        </MuiPickersUtilsProvider>
        <FormControl component="fieldset">
            <FormLabel component="legend">Interview State</FormLabel>
            <RadioGroup aria-label="color" name="color" value={values.color} onChange={handleChange('color')}>
                <FormControlLabel value="red" control={<Radio />} label="Red" />
                <FormControlLabel value="yellow" control={<Radio />} label="Yellow" />
                <FormControlLabel value="green" control={<Radio />} label="green" />
                <FormControlLabel value="blue" control={<Radio />} label="blue" />
                <FormControlLabel value="purple" control={<Radio />} label="purple" />
                <FormControlLabel value="none" control={<Radio />} label="None" />
            </RadioGroup>
        </FormControl>
    <TextField
        id="standard-helperText"
        label="Company"
        value={values.company}
        onChange={handleChange('company')}
        />
        <TextField
        id="standard-helperText"
        label="Title"
        value={values.title}
        onChange={handleChange('title')}
        />
        <Grid container alignItems="flex-end">
            <Grid item md={4} xs={12}>
                <FormControl className={classes.changeWidth}>
                <InputLabel htmlFor="PostingType">Posting Type</InputLabel>
                    <Select
                    native
                    value={values.postingType}
                    onChange={handleChange('postingType')}
                    inputProps={{
                        name: 'Post Type',
                        id: 'PostingType',
                    }}
                    >
                    <option value='wishlist'>Wishlists</option>
                    <option value='applied'>Applied</option>
                    <option value='interview'>Interview</option>
                    <option value='offer'>Offer</option>
                    <option value='rejected'>Reject</option>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
                <TextField
                    className={classes.changeWidth}
                    id="location"
                    label="Location"
                    value={values.location}
                    onChange={handleChange('location')}
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <FormControl className={classes.changeWidth}>
                    <InputLabel htmlFor="salary">Salary</InputLabel>
                    <Input
                        id="salary"
                        value={values.salary}
                        onChange={handleChange('salary')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>
        </Grid>
        <TextField
            id="postLink"
            label="Post Link"
            value={values.postLink}
            onChange={handleChange('postLink')} />
        <TextField 
            onChange={handleChange('notes')} 
            id="outlined-multiline-static" 
            multiline label="Notes" rows={8} variant="outlined"
            value={values.notes}/>
        <Typography variant="h5">Applied</Typography>
        <Grid container alignItems="flex-end">
            <Grid item xs={6}>
                <Switch
                    checked={values.applied}
                    onChange={handleCheckChange('applied')}
                    color="primary"
                    name="applied"
                    inputProps={{ 'aria-label': 'Applied' }}
                />
            </Grid>
            <Grid item xs={6}>
                {values.applied ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dateChooser"
                        value={values.appliedDate}
                        onChange={handleDateChange('appliedDate')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                ) : (
                    ''
                )}
            </Grid>
        </Grid>
        
        <Typography variant="h5">Heard back?</Typography>
        <Grid container alignItems="flex-end">
            <Grid item xs={6}>
                <Switch
                    checked={values.heardBack}
                    onChange={handleCheckChange('heardBack')}
                    color="primary"
                    name="heardBack"
                    inputProps={{ 'aria-label': 'Heard back?' }}
                />
            </Grid>
            <Grid item xs={6}>
                {values.heardBack ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dateChooser"
                        value={values.heardBackDate}
                        onChange={handleDateChange('heardBackDate')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                ) : (
                    ''
                )}
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Interview State</FormLabel>
                    <RadioGroup aria-label="interviewState" name="interviewState" value={values.interviewState} onChange={handleChange('interviewState')}>
                        <FormControlLabel value="emailInterview" control={<Radio />} label="Email" />
                        <FormControlLabel value="phoneInterview" control={<Radio />} label="Phone Interview" />
                        <FormControlLabel value="onsiteInterview" control={<Radio />} label="Onsite Interview" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField className='interviewNote'
                    value={values.interviewNote}
                    onChange={handleChange('interviewNote')} 
                    id="outlined-multiline-static" 
                    multiline label="Interview Notes" rows={6} variant="outlined"
                    style={{width: "100%"}}/>
            </Grid>
        </Grid>
    </Grid>
  );

  return (
    <div>
        <button className="box-view-button" type="button" onClick={handleOpen}>
            View/Edit
        </button>

        <Dialog
            open={open}
            onClose={handleClose}
            className={classes.modal}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Post</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} style={{margin: "0"}}>
                {body}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <ResponsiveSubmit 
                    submit={handleSubmit} 
                    loading={loading} 
                    name="Save" 
                    wrapperClass={classes.responsiveWrapper} 
                    size='normal' />
            </DialogActions>
        </Dialog>
    </div>
  )
}