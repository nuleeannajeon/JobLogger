import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
    return (
        <TextField
            style={props.style}
            label={props.label}
            required={props.required}
            className={props.className}
            type="text"
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
            }}
        />
    );
};

export default Input;
