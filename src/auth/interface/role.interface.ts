export interface Role {
  resource?: string;

  action?: 'create' | 'read' | 'update' | 'delete';

  possession?: 'own' | 'any';

  tableName?: string;
}
