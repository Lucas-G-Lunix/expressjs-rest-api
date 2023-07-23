const express = require('express')
const morgan = require('morgan')

const app = express()
let products = [
  {
    id: 1,
    name: 'laptop',
    price: 3000
  }
]
app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/products/:id', (req, res) => {
  // console.log(req.params)
  const productFound = products.find((p) => p.id === parseInt(req.params.id)
  )

  if (!productFound){
    return res.status(404).json({message: 'Product not found'})
  }
  res.json(productFound)
})

app.post('/products', (req, res) => {
  const newProduct = {id: products.length + 1, ...req.body}
  products.push(newProduct)
  res.send(newProduct)
})

app.delete('/products/:id', (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id)
  )

  if (!productFound){
    return res.status(404).json({message: 'Product not found'})
  }

  products = products.filter(p => p.id !== parseInt(req.params.id))

  res.sendStatus(404)
})

app.put('/products/:id', (req, res) => {
  const newData = req.body

  const productFound = products.find((p) => p.id === parseInt(req.params.id)
  )

  if (!productFound){
    return res.status(404).json({message: 'Product not found'})
  }
  products = products.map(p => p.id === parseInt(req.params.id) ? {...p, newData} : {...p})
  res.json({
    message: "Producto actualizado"
  })
})


app.listen(3000)
