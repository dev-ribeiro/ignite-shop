// import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/Product'

export default function Product() {
  //   const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          dolorem tempore pariatur. Quod aut necessitatibus qui, sit tempora
          blanditiis perferendis reiciendis? Ipsa temporibus rerum consectetur
          similique ratione sapiente quisquam distinctio!
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
