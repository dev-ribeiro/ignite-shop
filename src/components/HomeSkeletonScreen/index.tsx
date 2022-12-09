import { useKeenSlider } from 'keen-slider/react'
import {
  FooterSkeleton,
  HomeSkeletonScreenContainer,
  ImageSkeleton,
  ProductSkeleton,
} from './styles'

export function HomeSkeletonScreen() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })

  return (
    <HomeSkeletonScreenContainer ref={sliderRef} className="keen-slider">
      <ProductSkeleton className="keen-slider__slide">
        <ImageSkeleton />
        <FooterSkeleton>
          <div></div>
          <div></div>
        </FooterSkeleton>
      </ProductSkeleton>
      <ProductSkeleton className="keen-slider__slide">
        <ImageSkeleton />
        <FooterSkeleton>
          <div></div>
          <div></div>
        </FooterSkeleton>
      </ProductSkeleton>
      <ProductSkeleton className="keen-slider__slide">
        <ImageSkeleton />
        <FooterSkeleton>
          <div></div>
          <div></div>
        </FooterSkeleton>
      </ProductSkeleton>
    </HomeSkeletonScreenContainer>
  )
}
