import { Box, Paper } from '@mui/material'
import { styled } from "@mui/material/styles";
import React from 'react'

const StyledPaper = styled(Paper)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    // marginTop: theme.spacing(8),
    height: "100vh",
    width: "100vw",
    backgroundImage: `url("https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_1800,h_960,al_br,q_90,usm_0.66_1.00_0.01/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.webp")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const Header = () => {
  return (
    <StyledPaper>hello</StyledPaper>
  )
}

export default Header
// https://static.wixstatic.com/media/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.png/v1/fill/w_980,h_960,al_br,q_90,usm_0.66_1.00_0.01/84770f_994ffe746a074d1f8a2ec9456a8bf1ff~mv2.webp