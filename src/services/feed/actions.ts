import { createAction } from '@reduxjs/toolkit'
import { TWsConnect } from '../../utils/type'



export const wsConnect = createAction<TWsConnect, 'feed/connect'>('feed/connect')
export const wsDisconnect = createAction('feed/disconnect')