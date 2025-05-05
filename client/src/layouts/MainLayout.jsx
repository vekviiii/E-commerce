import React from 'react'
import { Box, Container } from '@mui/material'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import NewsLetterSignUP from '../pages/newslettersignup/NewsLetterSignUP'

const MainLayout = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100dvh'} margin={0}>
        <Header/>
        <div className="custom-container con py-2">
            <Outlet/>
        </div>
        <NewsLetterSignUP/>
        <Footer/>
    </Box>
  )
}

export default MainLayout