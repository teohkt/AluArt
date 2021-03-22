import { Container, Row, Col } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Row>
            <Col className='text-center py-3'>
              <HomeScreen />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
