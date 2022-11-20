import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
})

export default function Home() {
  return (
    <div>
      <h1>HELLO WORLD!</h1>
      <Button>ENVIAR</Button>
    </div>
  )
}
