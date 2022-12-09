import { styled } from '../../../styles'

export const CheckoutCartContainer = styled('aside', {
  width: '30rem',
  height: '100%',
  padding: '3rem',

  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 1,

  display: 'flex',
  flexDirection: 'column',

  backgroundColor: '$gray800',

  h2: {
    marginTop: '1.5rem',
    marginBottom: '2rem',
  },

  svg: {
    marginRight: '-1.5rem',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '1.5rem',
  },
})

export const ProductCheckoutContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const ProductCheckout = styled('div', {
  height: '5.875rem',

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    gridArea: 'img',
    borderRadius: 8,
    marginRight: '1.25rem',
    objectFit: 'cover',
    height: '100%',
  },

  span: {
    gridArea: 'title',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.125rem',
    color: '$gray300',
  },

  h3: {
    gridArea: 'price',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    color: '$gray100',
  },

  button: {
    gridArea: 'remove',
    background: 'none',
    border: 'none',
    color: '$green500',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.125rem',
    textAlign: 'start',
  },

  display: 'grid',
  gap: '0.5rem',
  gridTemplate: `
    'img title' 1fr
    'img price' 1fr
    'img remove' 1fr
  `,
})
