import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProductsTable } from "../products-table";

export default function Groups() {

    const products: {
        id: number;
        imageUrl: string;
        name: string;
        status: "active" | "inactive" | "archived";
        price: string;
        stock: number;
        availableAt: Date;
      }[]=[];

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Groups</CardTitle>
                    <CardDescription>View all g</CardDescription>
                    
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">My Groups</TabsTrigger>
                                <TabsTrigger value="active">All Groups</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="all">
                            <i>empty set</i>
                        </TabsContent>
                    </Tabs>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>

        </>
    )
}