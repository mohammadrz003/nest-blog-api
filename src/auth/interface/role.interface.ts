/**
 * Role interface.
 * @interface Role
 * @property {string} resource - Resource name.
 * @property {string} action - Action name.
 * @property {string} possession - Possession name.
 * @property {string} tableName - Table name.
 */
export interface Role {
  resource?: string;

  action?: 'create' | 'read' | 'update' | 'delete';

  possession?: 'own' | 'any';

  tableName?: string;
}
