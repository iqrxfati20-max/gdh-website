import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../context/AppContext";
import { calculatePoints } from "../lib/loyalty";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLocation } from "wouter";
import { supabase } from "../lib/supabase";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Must be exactly 10 digits"),
  address: z.string().min(5, "Address is required"),
  pincode: z.string().min(6, "Valid Pincode is required"),
  payment: z.enum(["COD", "UPI", "Online Transfer"]),
  notes: z.string().optional(),
  referralCode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtotal: number;
}

export function CheckoutModal({ open, onOpenChange, subtotal }: CheckoutModalProps) {
  const { currentCustomer, setOrders, setCurrentCustomer, setCustomers, cart, clearCart, customers } = useAppContext();
  const [, setLocation] = useLocation();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: currentCustomer?.name || "",
      mobile: currentCustomer?.mobile || "",
      address: "",
      pincode: "",
      payment: "COD",
      notes: "",
      referralCode: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `GDH-${timestamp}-${random}`;
    const earnedPoints = calculatePoints(subtotal);

    // Save Order
    const newOrder = {
      id: orderId,
      customer: data.fullName,
      phone: data.mobile,
      items: cart,
      total: subtotal,
      payment: data.payment,
      status: "Processing",
      referralUsed: data.referralCode || "",
      date: new Date().toISOString().split('T')[0],
    };

    // Persist to Supabase if connected
    if (supabase) {
      const { error } = await supabase.from('orders').insert([{
        id: orderId,
        customer: data.fullName,
        phone: data.mobile,
        items: JSON.stringify(cart),
        total: subtotal,
        payment: data.payment,
        status: "Processing",
        referral_used: data.referralCode || "",
        address: data.address,
        pincode: data.pincode,
        notes: data.notes || "",
      }]);
      if (error) {
        console.error('[Checkout] Supabase insert failed:', error.code, error.message);
        toast.error(`Failed to save order to database: ${error.message}`);
      }
    }

    setOrders(prev => [newOrder, ...prev]);

    // Handle Points if customer is logged in
    if (currentCustomer) {
      const updatedCustomer = {
        ...currentCustomer,
        points: currentCustomer.points + earnedPoints,
        totalSpent: currentCustomer.totalSpent + subtotal,
        orderCount: currentCustomer.orderCount + 1,
        pointsHistory: [
          { date: new Date().toISOString().split('T')[0], desc: `Purchase - ${orderId}`, points: earnedPoints },
          ...currentCustomer.pointsHistory
        ]
      };

      // Check referral logic (simple version)
      if (data.referralCode) {
        const referrer = customers.find(c => c.referralCode === data.referralCode && c.id !== currentCustomer.id);
        if (referrer) {
          updatedCustomer.points += 20;
          updatedCustomer.pointsHistory.unshift({ date: new Date().toISOString().split('T')[0], desc: `Used Referral ${data.referralCode}`, points: 20 });
          
          // Also reward referrer (in a real app this would be a separate mutation)
          setCustomers(prev => prev.map(c => {
            if (c.id === referrer.id) {
              return {
                ...c,
                points: c.points + 50,
                referralCount: c.referralCount + 1,
                pointsHistory: [
                  { date: new Date().toISOString().split('T')[0], desc: `Referral Bonus (${data.fullName})`, points: 50 },
                  ...c.pointsHistory
                ]
              };
            }
            return c;
          }));
        }
      }

      setCurrentCustomer(updatedCustomer);
      setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    }

    clearCart();
    onOpenChange(false);
    toast.success(`🎉 Order placed successfully! ID: ${orderId}`);
    
    if (currentCustomer) {
      setTimeout(() => {
        toast.success(`You earned ${earnedPoints} points! 🌟`);
      }, 500);
      setLocation('/account');
    } else {
      setLocation('/');
    }
  };

  const earnedPointsPreview = calculatePoints(subtotal);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-[#5C3D2E]">Checkout</DialogTitle>
          <DialogDescription>
            Complete your order of ₹{subtotal}. Free delivery inside Gorakhpur!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Priya Sharma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="House No, Street, Landmark..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="273001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="GDH-..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. Call before delivery" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="COD" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 cursor-pointer">
                            Cash on Delivery (COD)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="UPI" />
                          </FormControl>
                          <FormLabel className="font-normal flex-1 cursor-pointer">
                            UPI (Google Pay / PhonePe)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {currentCustomer && (
              <div className="bg-[#E8FDF0] text-[#166534] p-4 rounded-xl flex items-center justify-between border border-[#166534]/20">
                <span className="font-bold text-sm">Loyalty Points to earn:</span>
                <span className="font-black flex items-center gap-1">🌟 {earnedPointsPreview}</span>
              </div>
            )}

            <Button type="submit" className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-12 rounded-xl text-lg">
              Place Order — ₹{subtotal}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
