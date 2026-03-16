export interface TableColumn {
  key: string;
  label: string;
}

export const tableColumns: TableColumn[] = [
  { key: 'name', label: 'Company' },
  { key: 'tier', label: 'Tier' },
  { key: 'stage', label: 'Stage / Scale' },
  { key: 'arr', label: 'ARR' },
  { key: 'ics', label: 'ICP Roles' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'model', label: 'Business Model' },
  { key: 'motion', label: 'Sales Motion' },
];
