import styled from 'styled-components'
import Button from './Button'

export default function Comment() {
  return (
    <StComment>
      <Comments>덧글이 없습니다.</Comments>
      <TextArea>
        <div>
          <input type="text" placeholder='닉네임' />
          <input type="password" placeholder='비밀번호' />
        </div>
        <textarea name="" id="" cols="30" rows="3"></textarea>
        <Button>등록</Button>
      </TextArea>
    </StComment>
  )
}

const StComment = styled.div`
  padding: 0 1rem;
`

const Comments = styled.div`
  margin: 2rem 0;
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
