import { DataGrid } from '@mui/x-data-grid';

const Products = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '商品名', width: 200 },
    { field: 'price', headerName: '价格', width: 100 },
    { field: 'stock', headerName: '库存', width: 100 },
    { field: 'category', headerName: '分类', width: 150 },
  ];

  const rows = [
    { id: 1, name: '苹果', price: 3.5, stock: 100, category: '水果' },
    { id: 2, name: '香蕉', price: 2.5, stock: 50, category: '水果' },
    { id: 3, name: '牛奶', price: 5, stock: 20, category: '饮品' },
    // 可以模拟更多数据
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows} // 数据
        columns={columns} // 列配置
        pageSize={5} // 每页行数
        rowsPerPageOptions={[5, 10, 20]} // 可选每页行数
        checkboxSelection // 允许勾选行
      />
    </div>
  );
};

export default Products;
