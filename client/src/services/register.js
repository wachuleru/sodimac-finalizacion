import { requestPost } from "../utils/request";
import { REGISTER } from "../utils/endpoints";
/* import Mail from './mail/mail.js';
 */
// AUTH
export function fetchRegister(body) {
  console.log('--body--', body);
/*   console.log("inicio envio correo");
  Mail(body);
  console.log("fin envio correo"); */
  return requestPost(REGISTER, body);
}
