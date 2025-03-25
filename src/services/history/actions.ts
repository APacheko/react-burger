import { createAction } from '@reduxjs/toolkit'
import { TWsConnect } from '../../utils/type'



export const wsHistoryConnect = createAction<TWsConnect, 'history/connect'>('history/connect')
export const wsHistoryDisconnect = createAction('history/disconnect')