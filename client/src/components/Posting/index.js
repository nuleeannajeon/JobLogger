import 'date-fns';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
      '& .postingInput': {
        margin: theme.spacing(2),
        display:"flex", 
        flexDirection:"column",
      },
    },
    margin: {
        margin: theme.spacing(2),
    },
    button: {
        backgroundColor: "purple",
        color: "white",
        float: "right",
        marginRight: 30
    },
}));

function Posting(){
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
    const [values, setValues] = React.useState({
        amount: '',
        companyName: '',
        position: '',
        location: '',
        postingLink: '',
        note: ''
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleSubmit = (event) => {
        event.preventDefault()

        

    }

    return(
        <Container maxWidth="sm">
            <h3 style={{textAlign: "center"}}>New Posting</h3>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField className='postingInput' onChange={handleChange('companyName')} id="outlined-basic" label="Company Name"/>
                <TextField className='postingInput' onChange={handleChange('companyName')} id="outlined-basic" label="Position" />
                <TextField className='postingInput' onChange={handleChange('companyName')} id="outlined-basic" label="Location" />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardDatePicker
                        className={classes.margin}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date Found"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">Salary</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={values.amount}
                            onChange={handleChange('amount')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
                </MuiPickersUtilsProvider>
                <TextField className='postingInput' onChange={handleChange('companyName')} id="outlined-basic" label="Posting Link" /> 
                <TextField className='postingInput' onChange={handleChange('companyName')} id="outlined-multiline-static" multiline label="Notes" rows={8} variant="outlined"/>
            </form>
            <Button className={classes.button} variant="contained">
                Save
            </Button>
        </Container>
    );
}

export default Posting;