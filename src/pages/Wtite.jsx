import { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  asyncEditFirebase,
  asyncPostFirebase,
} from '../app/modules/Firebase/WritePostSlice'
import Button from '../components/Button'
import Modal from '../components/Modal'
import useBeforeunload from '../hooks/useBeforeunload'

const initalState = {
  title: '',
  text: '',
  name: '',
  password: '',
  head: '심심해서',
  like: 0,
  view: 0,
  date: null,
}

const reducer = (state, action) => {
  // 글자수 제한
  const maxLength = (str, max) => {
    if (str.length >= max) {
      str = str.slice(0, max)
    }
    return str
  }
  switch (action.type) {
    // 게시글 수정일시 데이터 받아오기
    case 'edit':
      return { ...state, ...action.payload }
    // 각 입력 각 변경
    case 'title':
      return { ...state, title: maxLength(action.payload, 50) }
    case 'text':
      return { ...state, text: action.payload }
    case 'name':
      return { ...state, name: maxLength(action.payload, 8) }
    case 'head':
      return { ...state, head: action.payload }
    case 'password':
      return { ...state, password: maxLength(action.payload, 12) }
    default:
      return state
  }
}

const Wtite = () => {
  const params = useParams()
  const postId = params.id
  const { post, ip } = useSelector((state) => ({
    post: state.post.data,
    ip: state.ip.value,
  }))
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [data, dataReducer] = useReducer(reducer, initalState)
  const { enableBeforeunload, disableBeforeunload } = useBeforeunload()
  
  // 페이지 벗어날시 경고창, router 이동시 미작동
  useEffect(() => {
    enableBeforeunload()
    return () => {
      disableBeforeunload()
    }
  }, [enableBeforeunload, disableBeforeunload])

  // 수정 시 초기값 가져오기
  useEffect(() => {
    if (!postId) {
      return
    } else if (!post.date) {
      nav('/')
      return
    }
    dataReducer({
      type: 'edit',
      payload: {
        title: post.title,
        text: post.text.replaceAll('<br />', '\n'),
        name: post.name,
        head: post.head,
        like: post.like,
        view: post.view,
        date: post.date,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 각 텍스트 입력시 reducer 에 dispatch
  const changeValue = (type, e) => {
    dataReducer({ type: type, payload: e.target.value })
  }

  // 모달 관련 state 및 모달 여닫기
  const [modalContent, setModalContent] = useState([])
  const [modalToggle, setModalToggle] = useState(null)
  const closeModal = () => {
    setModalToggle(false)
  }
  // input 빈칸 검사 및 modal data 갱신, modal 오픈
  const inputEmptyRules = () => {
    const strArray = [data.title, data.text, data.name, data.password]
    const strName = ['글제목', '글내용', '닉네임', '비밀번호']
    const emptyArr = strArray.reduce((x, y, i) => {
      if (y === '') x.push(strName[i])
      return x
    }, [])
    if (emptyArr.length !== 0) {
      setModalContent(emptyArr)
      setModalToggle(true)
      return true
    } else {
      return false
    }
  }

  // 새글 쓰는 것 또는 수정일시 reducer 결정 부분 및 데이터 보내기
  const decisionDispatch = (data) => {
    if (postId === undefined) {
      return dispatch(asyncPostFirebase(data))
    } else {
      return dispatch(asyncEditFirebase({ data: data, id: postId }))
    }
  }
  const sendPost = () => {
    // 빈칸 검사
    if (inputEmptyRules()) return
    disableBeforeunload()
    decisionDispatch({
      ...data,
      date: data.date === null ? new Date().getTime() : data.date,
      text: data.text.replaceAll('\n', '<br />'),
      ip: ip,
    }).then(() => {
      nav('/board/')
    })
  }

  return (
    <StWtite>
      <button
        onClick={(e) => {
          e.preventDefault()
          enableBeforeunload()
        }}
      >
        qweqweqw
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          disableBeforeunload()
        }}
      >
        asdas
      </button>
      <h1>글 쓰기</h1>
      <div>
        <select
          value={data.head}
          onChange={(e) => {
            changeValue('head', e)
          }}
        >
          <option value="심심해서">심심해서</option>
          <option value="넣어본">넣어본</option>
          <option value="말머리">말머리</option>
        </select>
        <input
          type="text"
          placeholder="닉네임"
          onChange={(e) => {
            changeValue('name', e)
          }}
          value={data.name}
          maxLength="8"
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="on"
          onChange={(e) => {
            changeValue('password', e)
          }}
          maxLength="12"
          value={data.password}
        />
      </div>
      <input
        type="text"
        placeholder="글 제목"
        onChange={(e) => {
          changeValue('title', e)
        }}
        value={data.title}
      />
      <textarea
        rows="10"
        placeholder="글 내용"
        onChange={(e) => {
          changeValue('text', e)
        }}
        value={data.text}
      ></textarea>
      <Button
        onClick={(e) => {
          e.preventDefault()
          nav(-1)
        }}
      >
        취소
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault()
          sendPost()
        }}
      >
        글 쓰기
      </Button>
      <Modal open={modalToggle} onClick={closeModal} center>
        <EmptyContent onClick={(e) => e.stopPropagation()}>
          <p>다음 칸을 입력해주세요.</p>
          <ul>
            {modalContent.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Button
            onClick={(e) => {
              e.preventDefault()
              closeModal()
            }}
          >
            확인
          </Button>
        </EmptyContent>
      </Modal>
    </StWtite>
  )
}

const StWtite = styled.form`
  margin: auto;
  max-width: 800px;
  margin-top: 7rem;
  text-align: center;

  > h1 {
    text-align: center;
    margin-bottom: 5rem;
  }

  input {
    background-color: inherit;
    border-width: 0 0 1px 0;
    outline: none;
    color: ${({ theme }) => theme.color};
  }

  > div {
    display: flex;
    margin-bottom: 2rem;

    > select,
    > option {
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.color};
      margin-right: 2rem;
      padding: 0 1rem;
      border-width: 0 0 1px 0;
      outline: none;
    }

    > input {
      display: block;
      margin-right: 2rem;
    }
  }

  > input {
    width: 100%;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  > textarea {
    background-color: inherit;
    color: ${({ theme }) => theme.color};
    width: 100%;
    resize: none;
    margin-bottom: 2rem;
  }

  > button {
    margin: 0 1rem;
  }
`

const EmptyContent = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid;
  border-radius: 7px;
  cursor: default;
  padding: 0.5rem 3rem;
  p {
    margin: 0.5rem;
  }
  li {
    font-size: 0.8rem;
    opacity: 0.5;
  }
`

export default Wtite
