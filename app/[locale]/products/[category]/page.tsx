'use client';

import ProductItem from '@/components/product/productItem';
import { useEffect, useState } from 'react';
import { GetParameter, getApiCall } from '@/service/restAPI.service';
import { Product } from '@/interfaces/product/product';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import styles from './page.module.scss';

export default function ProductPage({
  params: { category },
}: {
  params: Params;
}) {
  const [productList, setProductList] = useState<Product[]>([]);

  const getProductsByCategory = async () => {
    const getParameter: GetParameter = {
      url: '/products',
      params: category !== 'all' && { category },
    };
    const res: Product[] = await getApiCall(getParameter);
    if (res) {
      setProductList(res);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <div>
      <div className={styles.title_box}>
        <span>
          <hr />
        </span>
        <span className={styles.title}>All Products</span>
      </div>
      <div className={styles.list_box}>
        {productList.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
