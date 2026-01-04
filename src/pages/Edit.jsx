import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import { baseUrl } from '../api'


export default function Edit() {
  // const params=useParams()
  // console.log(params.id)
  const{id} =useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "",
  })
  const [isLoading,setIsLoading] = useState(false)
 
    const fetchSingleExpenses = async() => {
      try {
        const res=await axios.get(`${baseUrl}/api/expense/view/${id}`)
        //console.log(res.data)
        if (res.data.success) {
          setFormData(res.data.expenseDetails)
          
        } else {
          toast.error(res.data.success)
          
        }
      } catch (error) {
        console.log(error)
        
      }
    }
     useEffect(() =>{
     fetchSingleExpenses()
  },[])
  //user hook that is used to handle side effects in your components
  //console.log(formData) 
  const handleSubmit = async () => {
    //console.log(formData)
    setIsLoading(true)
    try {
      
      const res=await axios.put(`${baseUrl}/api/expense/edit/${id}`,formData)
      //console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
        
        setTimeout(()=>{navigate("/")},2000)
        
      } else {
        toast.error(res.data.message)
        
      }
    } catch (error) {
      console.log(error)
      
      
    }finally{
       setTimeout(()=>{setIsLoading(false)} ,2000)
    }
  }
  return (

    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4">Add expense details</Typography>
      <Box sx={{ backgroundcolor: 'lightblue', p: 4, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ width: '70%', p: 3 }}>
          <TextField value={formData.title} fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} label='Enter expense title' placeholder='enter expense title here' sx={{ mb: 2 }} />
          <TextField value={formData.amount} fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} label='Enter expense amount' type='number' placeholder='enter the amount' sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select expense category</InputLabel>
            <Select
            value={formData.category}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="Select expense category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              //onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"other"}>other</MenuItem>
            </Select>
          </FormControl>

          <Button
          
           onClick={handleSubmit} sx={{ mb: 1 }} variant='contained' fullWidth loading={isLoading}>Submit</Button>
          <Button component={Link} to={'/'} sx={{ mb: 1 }} variant='outlined' color='secondary' fullWidth>View entries</Button>
        </Paper>
      </Box>
    </Box>
  )
}
