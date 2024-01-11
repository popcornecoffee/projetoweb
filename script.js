document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
  
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(productForm);
      const productData = {};
      formData.forEach((value, key) => {
        productData[key] = value;
      });
  
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        const result = await response.json();
        alert(result.message);
  
        // Atualizar a lista de produtos após o cadastro
        fetchProducts();
      } catch (error) {
        console.error('Erro ao cadastrar produto:', error.message);
      }
    });
  
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
  
        // Limpar a lista de produtos na página
        productList.innerHTML = '<h2>Lista de Produtos</h2>';
  
        // Preencher a lista de produtos
        products.forEach((product) => {
          const productItem = document.createElement('div');
          productItem.innerHTML = `<strong>${product.productName}</strong> - ${product.sku} - ${product.price}`;
          productList.appendChild(productItem);
        });
      } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
      }
    }
  
    // Chamar fetchProducts ao carregar a página
    fetchProducts();
  });
  