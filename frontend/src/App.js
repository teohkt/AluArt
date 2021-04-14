import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductListScreen from './screens/ProductListScreen'
import EditProductScreen from './screens/EditProductScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Row>
            <Col className='py-3'>
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/admin/userList/:id' component={EditUserScreen} />
              <Route path='/admin/userList' exact component={UserListScreen} />
              <Route path='/admin/productList/edit/:id' component={EditProductScreen} />
              <Route path='/admin/productList/:pageNumber' exact component={ProductListScreen} />
              <Route path='/admin/ProductList' exact component={ProductListScreen} />
              <Route path='/admin/orderList/:id' component={OrderScreen} />
              <Route path='/admin/orderList' exact component={OrderListScreen} />
              <Route path='/search/:keyword' exact component={HomeScreen} />
              <Route path='/page/:pageNumber' exact component={HomeScreen} />
              <Route path='/search/:keyword/page/:pageNumber' exact component={HomeScreen} />

              <Route path='/' exact component={HomeScreen} />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
