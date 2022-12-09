import { styled } from '../../styles/'

export const HomeSkeletonScreenContainer = styled('div', {
  marginLeft: 'auto',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
  minHeight: 650,
  display: 'flex',
})

export const ProductSkeleton = styled('div', {
  minWidth: 540,
  flex: 1,
  borderRadius: 8,
  padding: '0.25rem',
})

export const ImageSkeleton = styled('div', {
  background: '#202024',
  width: '100%',
  height: '600px',
})

export const FooterSkeleton = styled('footer', {
  marginTop: '24px',
  width: '100%',
  height: '2rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  div: {
    width: '100px',
    height: '100%',
    backgroundColor: '#202024',
  },

  'div:first-child': {
    width: '50%',
  },
})
