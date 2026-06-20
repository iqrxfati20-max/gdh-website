import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Product } from "../data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Edit2, Trash2, ShieldCheck, Search, Plus } from "lucide-react";
import { supabase } from "../lib/supabase";
import { SizePricing } from "../data/products";
import { LoyaltySettings } from "../lib/loyalty";

export default function Admin() {
  const { products, setProducts, orders, setOrders, customers, setCustomers, loyaltySettings, setLoyaltySettings } = useAppContext();
  const [localLoyalty, setLocalLoyalty] = useState<LoyaltySettings>(loyaltySettings);

  const handleLoyaltySave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoyaltySettings(localLoyalty);
    toast.success("Loyalty settings saved!");
  };

  const setLF = (field: keyof LoyaltySettings, value: number | string) =>
    setLocalLoyalty(prev => ({ ...prev, [field]: value }));
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
  const [password, setPassword] = useState("");

  const [productSearch, setProductSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const EMPTY_FORM: Partial<Product> = {
    name: "", brand: "", category: "Baby Diapers", price: 0, oldPrice: 0, stock: 0, emoji: "📦", badge: "", rating: 4.5, cardBg: "#FFFFFF", sizes: []
  };
  const [formData, setFormData] = useState<Partial<Product>>(EMPTY_FORM);

  const addSizeRow = () =>
    setFormData(prev => ({ ...prev, sizes: [...(prev.sizes || []), { size: "", price: 0, oldPrice: 0 }] }));

  const updateSizeRow = (i: number, field: keyof SizePricing, value: string | number) =>
    setFormData(prev => {
      const sizes = [...(prev.sizes || [])];
      sizes[i] = { ...sizes[i], [field]: value };
      return { ...prev, sizes };
    });

  const removeSizeRow = (i: number) =>
    setFormData(prev => ({ ...prev, sizes: (prev.sizes || []).filter((_, idx) => idx !== i) }));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Admin access granted.");
    } else {
      toast.error("❌ Wrong password!");
    }
  };

  const handleProductSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p));
      toast.success("Product updated!");
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
      } as Product;
      setProducts([newProduct, ...products]);
      toast.success("Product added!");
    }
    
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setActiveTab("add-product");
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted.");
    }
  };

  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);
    if (supabase) {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);
      if (error) {
        toast.error(`Failed to update order: ${error.message}`);
        setUpdatingOrderId(null);
        return;
      }
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    toast.success(`Order status updated to "${status}"`);
    setUpdatingOrderId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-sm rounded-3xl border-border shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-heading text-2xl text-[#5C3D2E]">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter admin password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white h-12 rounded-xl font-bold">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalPointsIssued = customers.reduce((sum, c) => sum + c.points, 0); // Simplified

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-[#5C3D2E] flex items-center gap-2">
          <ShieldCheck className="text-primary" /> Admin Dashboard
        </h1>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="bg-muted p-1 rounded-xl w-full justify-start h-auto">
            <TabsTrigger value="overview" className="rounded-lg font-bold py-2.5 px-6">Overview</TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg font-bold py-2.5 px-6">Products</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg font-bold py-2.5 px-6">Orders</TabsTrigger>
            <TabsTrigger value="customers" className="rounded-lg font-bold py-2.5 px-6">Customers</TabsTrigger>
            <TabsTrigger value="add-product" className="rounded-lg font-bold py-2.5 px-6">Add/Edit Product</TabsTrigger>
            <TabsTrigger value="loyalty" className="rounded-lg font-bold py-2.5 px-6">Loyalty Settings</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-1">Products</div>
                <div className="text-3xl font-black text-foreground">{products.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-1">Orders</div>
                <div className="text-3xl font-black text-foreground">{orders.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-1">Revenue</div>
                <div className="text-3xl font-black text-primary">₹{totalRevenue}</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-1">Customers</div>
                <div className="text-3xl font-black text-foreground">{customers.length}</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl bg-[#E8FDF0] border-none">
              <CardContent className="p-6">
                <div className="text-sm font-bold text-[#166534] uppercase mb-1">Points Active</div>
                <div className="text-3xl font-black text-[#166534]">{totalPointsIssued}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map(o => (
                    <TableRow key={o.id}>
                      <TableCell className="font-bold">{o.id}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell className="font-bold">₹{o.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          o.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {o.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PRODUCTS TAB */}
        <TabsContent value="products">
          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-xl">Manage Products</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Icon</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())).map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="text-2xl">{p.emoji}</TableCell>
                      <TableCell className="font-bold">{p.name}</TableCell>
                      <TableCell>{p.brand}</TableCell>
                      <TableCell>₹{p.price}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(p)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteProduct(p.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <Card className="rounded-2xl">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID / Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(o => (
                    <TableRow key={o.id}>
                      <TableCell>
                        <div className="font-bold">{o.id}</div>
                        <div className="text-xs text-muted-foreground">{o.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{o.customer}</div>
                        <div className="text-xs text-muted-foreground">{o.phone}</div>
                      </TableCell>
                      <TableCell className="font-bold">₹{o.total}</TableCell>
                      <TableCell>{o.payment}</TableCell>
                      <TableCell>
                        <Select
                          value={o.status}
                          disabled={updatingOrderId === o.id}
                          onValueChange={(val) => handleOrderStatusUpdate(o.id, val)}
                        >
                          <SelectTrigger className={`w-[140px] h-8 text-xs font-bold ${updatingOrderId === o.id ? "opacity-60" : ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Processing">⏳ Processing</SelectItem>
                            <SelectItem value="Shipped">🚚 Shipped</SelectItem>
                            <SelectItem value="Delivered">✅ Delivered</SelectItem>
                            <SelectItem value="Cancelled">❌ Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CUSTOMERS TAB */}
        <TabsContent value="customers">
          <Card className="rounded-2xl">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-bold">{c.name}</TableCell>
                      <TableCell>{c.mobile}</TableCell>
                      <TableCell>
                        <span className="bg-muted px-2 py-1 rounded text-xs font-bold">{c.tier}</span>
                      </TableCell>
                      <TableCell className="font-bold text-primary">{c.points}</TableCell>
                      <TableCell>₹{c.totalSpent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ADD / EDIT PRODUCT TAB */}
        <TabsContent value="add-product">
          <Card className="rounded-2xl max-w-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Brand</Label>
                    <Input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baby Diapers">Baby Diapers</SelectItem>
                        <SelectItem value="Adult Diapers">Adult Diapers</SelectItem>
                        <SelectItem value="Baby Wipes">Baby Wipes</SelectItem>
                        <SelectItem value="Baby Lotion">Baby Lotion</SelectItem>
                        <SelectItem value="Rash Cream">Rash Cream</SelectItem>
                        <SelectItem value="Sanitary Pads">Sanitary Pads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Badge (Optional)</Label>
                    <Select value={formData.badge || "none"} onValueChange={val => setFormData({...formData, badge: val === "none" ? "" : val})}>
                      <SelectTrigger><SelectValue placeholder="Select badge" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="Best Seller">Best Seller</SelectItem>
                        <SelectItem value="New Arrival">New Arrival</SelectItem>
                        <SelectItem value="Sale">Sale</SelectItem>
                        <SelectItem value="Top Pick">Top Pick</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Price (₹)</Label>
                    <Input type="number" required value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Old Price (₹)</Label>
                    <Input type="number" required value={formData.oldPrice || ''} onChange={e => setFormData({...formData, oldPrice: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input type="number" required value={formData.stock || ''} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                  </div>
                </div>

                {/* Sizes & Pricing */}
                <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-bold">Sizes & Pricing</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Optional — add sizes (S, M, L…) each with their own price</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" className="h-8 rounded-lg gap-1" onClick={addSizeRow}>
                      <Plus className="h-3.5 w-3.5" /> Add Size
                    </Button>
                  </div>

                  {(formData.sizes || []).length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No sizes — all orders use the base price above.</p>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-1">
                        <span className="text-xs font-bold text-muted-foreground">Size Name</span>
                        <span className="text-xs font-bold text-muted-foreground">Price (₹)</span>
                        <span className="text-xs font-bold text-muted-foreground">Old Price (₹)</span>
                        <span />
                      </div>
                      {(formData.sizes || []).map((sz, i) => (
                        <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                          <Input
                            placeholder="e.g. S, M, XL"
                            value={sz.size}
                            onChange={e => updateSizeRow(i, 'size', e.target.value)}
                            className="h-9 text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="449"
                            value={sz.price || ''}
                            onChange={e => updateSizeRow(i, 'price', Number(e.target.value))}
                            className="h-9 text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="599"
                            value={sz.oldPrice || ''}
                            onChange={e => updateSizeRow(i, 'oldPrice', Number(e.target.value))}
                            className="h-9 text-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                            onClick={() => removeSizeRow(i)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Emoji Icon</Label>
                    <Input required value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} className="text-2xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Background Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" value={formData.cardBg} onChange={e => setFormData({...formData, cardBg: e.target.value})} className="w-16 h-10 p-1" />
                      <Input value={formData.cardBg} onChange={e => setFormData({...formData, cardBg: e.target.value})} className="flex-1" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl">
                    {editingProduct ? 'Update Product' : 'Save Product'}
                  </Button>
                  {editingProduct && (
                    <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => {
                      setEditingProduct(null);
                      setFormData(EMPTY_FORM);
                    }}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOYALTY SETTINGS TAB */}
        <TabsContent value="loyalty" className="space-y-6">
          <Card className="rounded-2xl max-w-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Loyalty Program Settings</CardTitle>
              <p className="text-sm text-muted-foreground">All changes take effect for new orders after saving.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoyaltySave} className="space-y-8">

                {/* Section 1: Signup & Referral */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base text-foreground border-b pb-2">Signup & Referral Rewards</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Points on Signup</Label>
                      <Input
                        type="number" min={0}
                        value={localLoyalty.signupPoints}
                        onChange={e => setLF("signupPoints", Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">Given when a new customer registers</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Points for Using a Referral</Label>
                      <Input
                        type="number" min={0}
                        value={localLoyalty.referralPoints}
                        onChange={e => setLF("referralPoints", Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">Customer who enters the referral code gets this</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Points for Referring Someone</Label>
                      <Input
                        type="number" min={0}
                        value={localLoyalty.referrerPoints}
                        onChange={e => setLF("referrerPoints", Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">Original referrer gets this when their code is used</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Purchase Points */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base text-foreground border-b pb-2">Purchase Points</h3>
                  <div className="space-y-3">
                    <Label>How points are earned per order</Label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setLF("pointsMode", "per_rupee")}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                          localLoyalty.pointsMode === "per_rupee"
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        📊 Per ₹ Spent
                      </button>
                      <button
                        type="button"
                        onClick={() => setLF("pointsMode", "per_order")}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                          localLoyalty.pointsMode === "per_order"
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        🛒 Flat Per Order
                      </button>
                    </div>

                    {localLoyalty.pointsMode === "per_rupee" ? (
                      <div className="space-y-2 pt-1">
                        <Label>Earn 1 point for every ₹___ spent</Label>
                        <div className="flex items-center gap-3 max-w-xs">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">1 point per ₹</span>
                          <Input
                            type="number" min={1}
                            value={localLoyalty.rupeesPerPoint}
                            onChange={e => setLF("rupeesPerPoint", Number(e.target.value))}
                            className="w-28"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          e.g. 10 means a ₹499 order earns {Math.floor(499 / localLoyalty.rupeesPerPoint)} points
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <Label>Points per completed order (flat)</Label>
                        <Input
                          type="number" min={0}
                          value={localLoyalty.pointsPerOrder}
                          onChange={e => setLF("pointsPerOrder", Number(e.target.value))}
                          className="max-w-xs"
                        />
                        <p className="text-xs text-muted-foreground">Every order, regardless of amount, earns this many points</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Tier Thresholds */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base text-foreground border-b pb-2">Tier Thresholds & Discounts</h3>
                  <div className="space-y-3">
                    {/* Silver */}
                    <div className="flex items-center gap-4 bg-[#F9FAFB] rounded-xl p-4 border border-border">
                      <span className="text-2xl">🥉</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Silver</p>
                        <p className="text-xs text-muted-foreground">Starting tier (0+ points)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Discount %</Label>
                        <Input
                          type="number" min={0} max={100}
                          value={localLoyalty.silverDiscount}
                          onChange={e => setLF("silverDiscount", Number(e.target.value))}
                          className="w-20 h-8 text-sm"
                        />
                      </div>
                    </div>

                    {/* Gold */}
                    <div className="flex items-center gap-4 bg-[#FFFBEB] rounded-xl p-4 border border-amber-200">
                      <span className="text-2xl">🥈</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Gold</p>
                        <p className="text-xs text-muted-foreground">Minimum points to reach Gold</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Min Points</Label>
                        <Input
                          type="number" min={1}
                          value={localLoyalty.goldThreshold}
                          onChange={e => setLF("goldThreshold", Number(e.target.value))}
                          className="w-24 h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Discount %</Label>
                        <Input
                          type="number" min={0} max={100}
                          value={localLoyalty.goldDiscount}
                          onChange={e => setLF("goldDiscount", Number(e.target.value))}
                          className="w-20 h-8 text-sm"
                        />
                      </div>
                    </div>

                    {/* Platinum */}
                    <div className="flex items-center gap-4 bg-[#F0F9FF] rounded-xl p-4 border border-sky-200">
                      <span className="text-2xl">🥇</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Platinum</p>
                        <p className="text-xs text-muted-foreground">Minimum points to reach Platinum</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Min Points</Label>
                        <Input
                          type="number" min={1}
                          value={localLoyalty.platinumThreshold}
                          onChange={e => setLF("platinumThreshold", Number(e.target.value))}
                          className="w-24 h-8 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Discount %</Label>
                        <Input
                          type="number" min={0} max={100}
                          value={localLoyalty.platinumDiscount}
                          onChange={e => setLF("platinumDiscount", Number(e.target.value))}
                          className="w-20 h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* live preview */}
                  <div className="bg-[#FDE8ED]/40 rounded-xl p-4 border border-primary/10 mt-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Current Tier Structure Preview</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="bg-white rounded-lg px-3 py-1.5 border font-medium">🥉 Silver: 0–{localLoyalty.goldThreshold - 1} pts · {localLoyalty.silverDiscount}% off</span>
                      <span className="bg-white rounded-lg px-3 py-1.5 border font-medium">🥈 Gold: {localLoyalty.goldThreshold}–{localLoyalty.platinumThreshold - 1} pts · {localLoyalty.goldDiscount}% off</span>
                      <span className="bg-white rounded-lg px-3 py-1.5 border font-medium">🥇 Platinum: {localLoyalty.platinumThreshold}+ pts · {localLoyalty.platinumDiscount}% off</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-xl">
                    Save Settings
                  </Button>
                  <Button type="button" variant="outline" className="h-12 rounded-xl" onClick={() => setLocalLoyalty(loyaltySettings)}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

