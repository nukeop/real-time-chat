import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Room } from '../../types';

type RoomsTableProps = {
  rooms: Room[];
};

const columns: ColumnDef<Room>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Users',
    accessorFn: (row) => `${row.users.length}/${row.maxUsers}`,
  },
];

export const RoomsTable: React.FC<RoomsTableProps> = ({ rooms }) => {
  const table = useReactTable({
    columns,
    data: rooms,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid">
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} className="grid">
          {headerGroup.headers.map((header) => (
            <div key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))}
        </div>
      ))}
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className="grid">
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
