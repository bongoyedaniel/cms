import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '../../../components/dashboard/products-table';
import { getProducts } from '@/lib/db';

function filterProducts(products: {
  id: number;
  imageUrl: string;
  name: string;
  status: "active" | "inactive" | "archived";
  price: string;
  stock: number;
  availableAt: Date;
}[], status: string | String) {
  if (status === "all") {
    return products;
  } else {
    return products.filter((product) => product.status === status);
  }
}

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  let totalProducts: number = 0;
  let products: {
    id: number;
    imageUrl: string;
    name: string;
    status: "active" | "inactive" | "archived";
    price: string;
    stock: number;
    availableAt: Date;
  }[] = [];

  let newOffset: number | null = 0;

  let noData = false;

  try {
    const data = await getProducts(
      search,
      Number(offset));

    products = data.products;
    totalProducts = data.totalProducts;
    newOffset = data.newOffset;
  } catch (e) {
    noData = !true;
  }

  const list: string[] = ["all","active", "inactive", "archived"];

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </div>
      </div>

      {/*<TabsContent value="all">
        {(() => {
          if (!noData) {
            return <ProductsTable
              products={products}  // Filtered products
              offset={newOffset ?? 0}
              totalProducts={totalProducts} // Filtered total
            />
          }else{
            return <i>No All Data</i>
          }
        })()
        }
      </TabsContent>*/}
      
      {(() => {
        if (noData)
          return <i>No Data</i>
        else
          return (<>{
            list.map((l) => {
              return (<TabsContent value={l}>
                <ProductsTable
                  products={filterProducts(products, l)}  // Filtered products
                  offset={newOffset ?? 0}
                  totalProducts={filterProducts(products, l).length} // Filtered total
                />
              </TabsContent>);
            })
          }
          </>);
      })()
      }
    </Tabs>
  );
}
