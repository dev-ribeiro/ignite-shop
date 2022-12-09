// import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Stripe from 'stripe'
import { StoreContext } from '../../contexts/StoreContext'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/Product'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { checkoutPricesId, addProductToCheckout } = useContext(StoreContext)
  const { isFallback } = useRouter()
  const [isProductIsInCheckout, setisProductIsInCheckout] = useState(false)
  const searchProductInCheckout = checkoutPricesId.find((id) => {
    return id === product.defaultPriceId
  })

  useEffect(() => {
    if (searchProductInCheckout) {
      setisProductIsInCheckout(true)
    }
  }, [searchProductInCheckout])

  function handleSendProductToCheckoutCart() {
    addProductToCheckout(product.defaultPriceId)
  }

  if (isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={400} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button
            disabled={isProductIsInCheckout}
            onClick={handleSendProductToCheckoutCart}
          >
            {isProductIsInCheckout
              ? 'Produto adicionado com sucesso'
              : 'Adicionar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_Mq1TVI8aMuBYqj' },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
