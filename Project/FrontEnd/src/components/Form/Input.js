import React from 'react'
import { TextField, Grid} from '@mui/material'


function Input({ type, name, handleChange, half, label, autoFocus }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField type={type}
        name={name}
        variant='outlined'
        label={label}
        onChange={handleChange}
        required
        fullWidth
        autoFocus={autoFocus}
      />
    </Grid>
  )
}

export default Input