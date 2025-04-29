import React from 'react'
import { Box, Container } from '@mui/material'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100dvh'} margin={0}>
        <Header/>
        <Container component={'main'} sx={{ flexGrow: 1, py: 4}}>
            <Outlet/>
        </Container>
        <Footer/>
    </Box>
  )
}

export default MainLayout