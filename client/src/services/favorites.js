import { requestFav, requestAddFav,requestDelFav } from "../utils/request";
import { FAVORITES } from "../utils/endpoints";
import {verify} from "../utils/helpers";


// AUTH
export function fetchFavorites(body) {
  let token=localStorage.getItem("session_token");
  //console.log("----verify----", verify(token) );
  
  console.log('--body--', body);
  return requestFav(FAVORITES, body);
}

export function sendFavorites(body) {
  let token=localStorage.getItem("session_token");
  //console.log("----verify----", verify(token) );
  
  console.log('--body--', body);
  return requestAddFav(FAVORITES, body);
}

export function delFavorite(body) {
  let token=localStorage.getItem("session_token");
  //console.log("----verify----", verify(token) );
  
  console.log('--body--', body);
  return requestDelFav(FAVORITES, body);
}
