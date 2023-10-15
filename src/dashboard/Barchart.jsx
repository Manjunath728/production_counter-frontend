import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import logo from '../assets/logo.jpeg'
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Button, Card, Grid, ListItem, Paper, Snackbar, Typography } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const URL = new String(import.meta.env.VITE_API_URL)

function Barchart() {
  const [loading, setLoading] = useState(false);
  const [apidata, setApiData] = useState([])
  useEffect(() => {
    getData()
    setLoading(true)
    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);


  }, [])
  async function getData() {
    await fetch(URL + "/api/devices").then(res => res.json()).then(data => setApiData(data.data.sort((a, b) => b.quantity - a.quantity)))
  }
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 10,
        width: 5,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      
    },
    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        }
      },
      x: {
        grid: {
          display: false,
        },

      }
    },
    layout: {
      padding: {
        top: 25,
        right: 10,
        bottom: 10,
        left: 10,
      },
      borderWidth: 10,
      borderColor: 'blue',
    },
  };

  const labels = apidata.map(item => item.deviceid);
  const quantities = apidata.map(item => item.quantity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dashboard',
        color: 'red',
        data: quantities,
        borderColor: '#1976D2',
        backgroundColor:'#1976D2',
      }
    ],
  };



  return (<>
    {loading ? <>
      <Snackbar
  open={true}
  autoHideDuration={2000}
  message="Welcome to IOT DashBoard"
/>   <Box sx={{ flexGrow: 1 ,padding:' 4px'}}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{justifyContent:'center'}}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
             <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="inherit" component="div" sx={{padding:'20px',fontWeight:'bold'}} >
            ESP 32 Configuration Console
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ flexGrow: 1 ,backgroundColor:'#595C61' }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:'#595C61'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,backgroundColor:'#595C61' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5"  sx={{ flexGrow: 1 }}>
           <img src={logo} style={{height:'75px'}} />
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div style={{height:"50px"}}>

    </div>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '100%', flex: 10 ,padding:'10px',}}>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {apidata.map((i, index) => (
            <Grid item xs={12} sm={6} md={2} key={index} style={{ display: 'flex' }}>
              <Paper elevation={6} sx={{ padding: 2, backgroundColor: "#595C61", height: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PrecisionManufacturingIcon  sx={{color:'white',fontSize:'70px'}} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
                  <Typography variant='h4' color={'white'}>{i.quantity}</Typography>
                  <Typography variant='h5' color={'white'}>{i.deviceid}</Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* <div style={{ width: '50%', flex: 5 }}>
        <Bar
          data={data}
          options={options}
        />
      </div> */}
    </div>


    </> : <><LinearProgress /></>}


  </>
  )
}

export default Barchart