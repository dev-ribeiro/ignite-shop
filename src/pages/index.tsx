import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/Home'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { Handbag } from 'phosphor-react'
import React, { useContext } from 'react'
import { StoreContext } from '../contexts/StoreContext'
import { priceFormatter } from '../utils/formatter'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { checkout, addProductToCart } = useContext(StoreContext)

  function handleAddProductToCart(event: React.MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement

    const productId = button.className

    const selectedProduct = products.find((item) => {
      return item.id === productId
    })

    const verifyProductInCheckout = checkout.some((product) => {
      return product.id === selectedProduct.id
    })

    if (verifyProductInCheckout) {
      alert('Produto já está no carrinho')
    }

    addProductToCart(selectedProduct)
  }

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Image src={product.imageUrl} width={720} height={540} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {priceFormatter.format(parseInt(product.price) / 100)}
                  </span>
                </div>
                <button className={product.id} onClick={handleAddProductToCart}>
                  <Handbag size={32} />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      description: product.description,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
