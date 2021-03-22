import Header from './components/Header'
import Footer from './components/Footer'
import { Container, Row, Col } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              <h1>Can Aluminum Decor</h1>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
