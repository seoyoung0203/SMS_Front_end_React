import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_CONT = 'conttable/GET_CONT';
export const GET_CONT_SUCCESS = 'conttable/GET_CONT_SUCCESS';
export const GET_CONT_FAILURE = 'conttable/GET_CONT_FAILURE';

const DELETE_CONT = 'conttable/DELETE_CONT';
const DELETE_CONT_SUCCESS = 'conttable/DELETE_CONT_SUCCESS';
const DELETE_CONT_FAILURE = 'conttable/DELETE_CONT_FAILURE'

const TABLE_CHANGE = 'conttable/TABLE_CHANGE'
const TABLE_CHANGE_SUCCESS = 'conttable/TABLE_CHANGE_SUCCESS'
const TABLE_CHANGE_FAILURE = 'conttable/TABLE_CHANGE_FAILURE'

//테이블 로우 다중 삭제
export const getContDelete = selectedRowKeys => async dispatch => {
    dispatch({ type: DELETE_CONT });
    try {
        await api.getDeleteConts(selectedRowKeys);
        dispatch({ type: DELETE_CONT_SUCCESS });
    } catch (e) {
        dispatch({
            type: DELETE_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CONT });
    try {
        const response = await api.getConts();
        dispatch({
            type: GET_CONT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}
//테이블에 계약 정보 리스트 넣기
export const getContList = () => async dispatch => {
    dispatch({ type: GET_CONT });
    try {
        const response = await api.getConts();
        dispatch({
            type: GET_CONT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

//테이블 필터
export const getFilterHandler = (value) => async dispatch => {
    dispatch({ type: TABLE_CHANGE })
    try {
        let response = []
        if (value === 'all') response = await api.getConts();
        else response = await api.getMTNC();
        dispatch({
            type: TABLE_CHANGE_SUCCESS,
            payload: response.data,

        })
    } catch (e) {
        dispatch({
            type: TABLE_CHANGE_FAILURE,
            payload: e,
            error: true
        })
    }
}

/*
visible: true/false 모달 띄우기
contList: 모든 계약 정보
loadingTable: true/false 테이블 로딩
*/
const initialState = {
    visible: false,
    contList: null,
    loadingTable: false
}

const conttable = handleActions(
    {
        [TABLE_CHANGE]: state => ({
            ...state,
            loadingTable: true
        }),
        [TABLE_CHANGE_SUCCESS]: (state,action) => ({
            ...state,
            loadingTable: false,
            contList: action.payload,
        }),
        [TABLE_CHANGE_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONT]: state => ({
            ...state,
            loadingTable: true
        }),

        [DELETE_CONT_SUCCESS]: state => ({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONT_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),


        [GET_CONT]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CONT_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            contList: action.payload,
        }),
        [GET_CONT_FAILURE]: (state, action) => ({
            ...state,
            loadingTable: false
        }),
    },
    initialState,
);

export default conttable;