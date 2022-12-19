import { useState } from 'react'
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { asyncPostCommentFirebase } from '../app/modules/Firebase/GetPostDataSlice'
import MaxLength from '../hooks/MaxLength'
import Button from './Button'
import Modal from './Modal'

const initalState = {
  name: '',
  password: '',
  text: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: MaxLength(action.payload, 8) }
    case 'password':
      return { ...state, password: MaxLength(action.payload, 12) }
    case 'text':
      return { ...state, text: action.payload }
    case 'reset':
      return initalState
    default:
      return state
  }
}

export default function CommentComp({ comments = [] }) {
  const [writeComment, writeCommentReducer] = useReducer(reducer, initalState)
  const changeValue = (type, e) => {
    writeCommentReducer({ type: type, payload: e.target.value })
  }
  const { ip } = useSelector((state) => ({
    ip: state.ip.value,
  }))
  const dispatch = useDispatch()
  const params = useParams()
  const id = params.id

  const [modalContent, setModalContent] = useState([])
  const [modalToggle, setModalToggle] = useState(null)
  const closeModal = () => {
    setModalToggle(false)
  }
  const inputEmptyRules = () => {
    const rulesTarget = {
      name: {
        name: '닉네임',
        content: writeComment.name,
      },
      text: {
        name: '글내용',
        content: writeComment.text,
      },
      password: {
        name: '비밀번호',
        content: writeComment.password,
      },
    }
    const emptyArr = Object.keys(rulesTarget).reduce((arr, name) => {
      if (rulesTarget[name].content === '') arr.push(rulesTarget[name].name)
      return arr
    }, [])
    if (emptyArr.length !== 0) {
      setModalContent(emptyArr)
      setModalToggle(true)
      return true
    } else {
      return false
    }
  }

  const postComment = async () => {
    if (inputEmptyRules()) return
    dispatch(
      asyncPostCommentFirebase({
        data: {
          ...writeComment,
          text: writeComment.text.replaceAll('\n', '<br />'),
          date: new Date().getTime(),
          ip: ip,
        },
        id,
      }),
    ).then(() => {
      writeCommentReducer({ type: 'reset' })
    })
  }

  const deletComment = (id) => {
    console.log(id)
  }

  return (
    <StComment>
      <Comments>
        {comments.length === 0 ? (
          '덧글이 없습니다.'
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <Comment key={index}>
                <div>
                  {comment.name}
                  <span>({comment.ip})</span>
                </div>
                <div>
                  <pre>{comment.text.replaceAll('<br />', '\n')}</pre>
                </div>
                <div>
                  <span>
                    {new Date(+comment.date).toLocaleDateString('ko', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>
                  <Button onClick={() => deletComment(comment.id)}>❌</Button>
                </div>
              </Comment>
            ))}
          </ul>
        )}
      </Comments>

      <TextArea>
        <div>
          <input
            type="text"
            placeholder="닉네임"
            value={writeComment.name}
            onChange={(e) => changeValue('name', e)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={writeComment.password}
            onChange={(e) => changeValue('password', e)}
          />
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          value={writeComment.text}
          onChange={(e) => changeValue('text', e)}
        ></textarea>
        <Button
          onClick={(e) => {
            e.preventDefault()
            postComment()
          }}
        >
          등록
        </Button>
      </TextArea>
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
    </StComment>
  )
}

const StComment = styled.div`
  padding: 0 1rem;
`

const Comments = styled.div`
  margin: 2rem 0;
`

const Comment = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0.3rem 0;

  span {
    margin-left: 0.3rem;
    font-size: small;
    opacity: 0.5;
  }

  div {
    display: flex;
    align-items: center;

    &:nth-child(1) {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &:nth-child(2) {
      flex: 8;
      margin: 0 1rem;
      text-align: left;
    }
  }

  pre {
    margin: 0;
  }
`

const TextArea = styled.form`
  display: flex;
  justify-content: stretch;
  width: 100%;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    input {
      margin: 0.3rem 1rem 0.3rem 0;
      background-color: inherit;
      border-width: 0 0 1px 0;
      outline: none;
      color: ${({ theme }) => theme.color};
      width: 100px;
    }
  }

  textarea {
    flex: 1;
    resize: none;
    background-color: inherit;
    border-width: 1px;
    outline: none;
    color: ${({ theme }) => theme.color};
    margin-right: 1rem;
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
