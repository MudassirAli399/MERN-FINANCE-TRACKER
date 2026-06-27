import { configureStore } from '@reduxjs/toolkit'
import Slicereducer from './Slice.js'

export default configureStore({
  reducer: Slicereducer
})