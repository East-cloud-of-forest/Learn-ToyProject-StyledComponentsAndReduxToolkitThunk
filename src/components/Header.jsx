import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { change } from '../app/modules/ThemeChangeSlice'
import Button from './Button'
import SideBar from './SideBar'

const Header = (/*{ SetDarkTheme, darkTheme }*/) => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const darkTheme = useSelector((state) => state.themeChange.darkTheme)
  const [openSide, setOpenSide] = useState(null)

  return (
    <>
      <SideBar openSide={openSide} setOpenSide={setOpenSide} />
      <StHeader>
        <Button size="1.5rem" onClick={() => setOpenSide(!openSide)}>
          📁
        </Button>
        <Button size="1.5rem" onClick={() => nav('/')}>
          로고
        </Button>
        <Button size="1.5rem" onClick={() => dispatch(change())}>
          {darkTheme ? '🌝' : '🌚'}
        </Button>
      </StHeader>
    </>
  )
}

const StHeader = styled.header`
  backdrop-filter: blur(5px);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 2;
`

export default Header
