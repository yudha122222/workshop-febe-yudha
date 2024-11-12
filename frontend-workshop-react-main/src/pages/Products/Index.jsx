import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Products() {

    const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
        const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8000/api/products',{
        headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      nama: '',
      deskripsi: '',
      harga: '',
      stock: '',
    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Name is required'),
      deskripsi: Yup.string().required('Description is required'),
      harga: Yup.number().required('Price is required').positive().integer(),
      stock: Yup.number().required('Stock is required').positive().integer(),
    }),
    onSubmit: async (values) => {
      try {
        const token = Cookies.get('token');
        if (editProductId) {
          // Update product
          await axios.put(`http://localhost:8000/api/products/${editProductId}`, values, {
            headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token ke header
              },
          });
        } else {
          // Create new product
          await axios.post('http://localhost:8000/api/products', values, {
            headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token ke header
              },
          });
        }
        // Reset form
        formik.resetForm();
        setEditProductId(null);
        fetchProducts(); // Refetch products
      } catch (error) {
        console.error('Error saving product:', error);
      }
    },
  });

  // Edit product
  const handleEdit = (product) => {
    setEditProductId(product.id);
    formik.setValues({
      nama: product.nama,
      deskripsi: product.deskripsi,
      harga: product.harga,
      stock: product.stock,
    });
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
        const token = Cookies.get('token');
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
      });
      fetchProducts(); // Refetch products
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  return (
    <>
    <div className='py-2 px-4 '>
        <button 
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-400"
        >
          Logout
        </button>
    </div>
 
    <div className="flex flex-col items-center py-10 px-4 lg:px-8">
              <div className="mb-4">
      </div>
      <div className="sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">
          {editProductId ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="nama"
                name="nama"
                type="text"
                required
                value={formik.values.nama}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  formik.touched.nama && formik.errors.nama ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm`}
              />
              {formik.touched.nama && formik.errors.nama ? (
                <div className="text-red-500 text-sm">{formik.errors.nama}</div>
              ) : null}
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                id="deskripsi"
                name="deskripsi"
                type="text"
                required
                value={formik.values.deskripsi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  formik.touched.deskripsi && formik.errors.deskripsi ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm`}
              />
              {formik.touched.deskripsi && formik.errors.deskripsi ? (
                <div className="text-red-500 text-sm">{formik.errors.deskripsi}</div>
              ) : null}
            </div>
          </div>

          {/* Price Field */}
          <div>
            <label htmlFor="harga" className="block text-sm font-medium text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                id="harga"
                name="harga"
                type="number"
                required
                value={formik.values.harga}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  formik.touched.harga && formik.errors.harga ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm`}
              />
              {formik.touched.harga && formik.errors.harga ? (
                <div className="text-red-500 text-sm">{formik.errors.harga}</div>
              ) : null}
            </div>
          </div>

          {/* Stock Field */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-900">
              Stock
            </label>
            <div className="mt-2">
              <input
                id="stock"
                name="stock"
                type="number"
                required
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  formik.touched.stock && formik.errors.stock ? 'ring-red-500' : 'ring-gray-300'
                } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm`}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-500 text-sm">{formik.errors.stock}</div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:ring-2 focus:ring-indigo-600"
            >
              {editProductId ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 w-full sm:max-w-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Product List</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b p-2 text-left text-gray-600">Name</th>
              <th className="border-b p-2 text-left text-gray-600">Description</th>
              <th className="border-b p-2 text-left text-gray-600">Price</th>
              <th className="border-b p-2 text-left text-gray-600">Stock</th>
              <th className="border-b p-2 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.nama}</td>
                <td className="p-2">{product.deskripsi}</td>
                <td className="p-2">{product.harga}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mt-2 mr-2 inline-block rounded-md bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="mt-2 inline-block rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
