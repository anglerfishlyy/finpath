export const Table = ({ children, className = "", ...props }) => (
  <div className="relative overflow-x-auto">
    <table className={`w-full text-sm text-left ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = "", ...props }) => (
  <thead className={`text-xs uppercase bg-gray-50 dark:bg-gray-800 ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = "", ...props }) => (
  <tbody className={`${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = "", ...props }) => (
  <tr className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = "", ...props }) => (
  <th className={`px-6 py-3 text-gray-500 dark:text-gray-400 ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, className = "", ...props }) => (
  <td className={`px-6 py-4 text-gray-900 dark:text-gray-200 ${className}`} {...props}>
    {children}
  </td>
); 