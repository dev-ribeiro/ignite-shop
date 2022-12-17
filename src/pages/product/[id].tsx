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
import { priceFormatter } from '../../utils/formatter'

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
  const { checkout, addProductToCart } = useContext(StoreContext)
  const { isFallback } = useRouter()
  const [isProductIsInCheckout, setisProductIsInCheckout] = useState(false)

  useEffect(() => {
    const verifyProductInCheckout = checkout.find(
      (element) => element.id === product.id,
    )

    verifyProductInCheckout && setisProductIsInCheckout(true)
  }, [checkout])

  function handleSendProductToCheckoutCart() {
    addProductToCart(product)
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
          <span>{priceFormatter.format(parseInt(product.price) / 100)}</span>

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
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
