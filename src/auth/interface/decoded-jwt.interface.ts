/**
 * Interface for decoded jwt
 * @interface DecodedJwtI
 * @property {string} id - User id
 * @property {string} email - User email
 */
export interface DecodedJwtI {
  id: string;
  email: string;
}
