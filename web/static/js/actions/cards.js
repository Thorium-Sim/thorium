import socket from '../socket';


/*
 * action types
 */

export const ADD_CARD = "ADD_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const FLUSH_CARDS = "FLUSH_CARDS";

export const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";

/*
 * action creators
 */

function fetchCardsRequest() {
  return { type: FETCH_CARDS_REQUEST };
}

function fetchCardsSuccess(card) {
  return { type: FETCH_CARDS_SUCCESS, card };
}

function fetchCardsFailure(error) {
  return { type: FETCH_CARDS_FAILURE, error };
}

function removeCard(card) {
	return { type: REMOVE_CARD, card };
}

function updateCard(card) {
	return { type: UPDATE_CARD, card };
}

export function flushCards() {
  return {type: FLUSH_CARDS };
}

export function fetchCards(stationId){
	return dispatch => {
    dispatch(fetchCardsRequest());
    let channel = socket.channel(`cards:stationId:${stationId}`, {});
    debugger;
    channel.join()
      .receive('ok', card => {
        console.log('catching up', card);
        dispatch(fetchCardsSuccess(card));
      })
      .receive('error', reason => {
        console.log('failed join', reason);
        dispatch(fetchCardsFailure(reason));
      });

    channel.on('new:card', card => {
      console.log('new:card', card);
      dispatch(fetchCardsSuccess(card));
    });
    channel.on('remove:card', card => {
      console.log('remvoe:card', card);
      dispatch(removeCard(card));
    });
    channel.on('update:card', changes => {
      console.log('update:card', changes);
      dispatch(updateCard(changes));
    });
  };
}
