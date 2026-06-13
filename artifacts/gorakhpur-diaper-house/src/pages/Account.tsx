import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getTier } from "../lib/loyalty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Copy, Share2, LogOut, Gift } from "lucide-react";

export default function Account() {
  const { currentCustomer, setCurrentCustomer, customers, setCustomers } = useAppContext();
  
  const [loginName, setLoginName] = useState("");
  const [loginMobile, setLoginMobile] = useState("");

  const [redeemPoints, setRedeemPoints] = useState(0);

  const handleLoginRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || loginMobile.length !== 10) {
      toast.error("Please enter a valid name and 10-digit mobile number.");
      return;
    }

    const existing = customers.find(c => c.mobile === loginMobile);
    if (existing) {
      setCurrentCustomer(existing);
      toast.success(`Welcome back, ${existing.name}!`);
    } else {
      const newCustomer = {
        id: Date.now(),
        name: loginName,
        mobile: loginMobile,
        referralCode: `GDH-${loginName.toUpperCase().replace(/\s/g, '').slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`,
        points: 0,
        tier: "Silver",
        referredBy: null,
        referralCount: 0,
        totalSpent: 0,
        orderCount: 0,
        pointsHistory: []
      };
      setCustomers([...customers, newCustomer]);
      setCurrentCustomer(newCustomer);
      toast.success(`Account created! Welcome, ${loginName}!`);
    }
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
    setLoginName("");
    setLoginMobile("");
    toast.success("Logged out successfully");
  };

  const copyReferralCode = () => {
    if (currentCustomer) {
      navigator.clipboard.writeText(currentCustomer.referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  const shareViaWhatsApp = () => {
    if (currentCustomer) {
      const text = `Hey! I buy my baby products from Gorakhpur Diaper House. Use my referral code *${currentCustomer.referralCode}* to get extra points on your first order!\n\nVisit: https://gorakhpurdiaperhouse.com`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const handleRedeem = () => {
    if (!currentCustomer || redeemPoints === 0) return;
    
    const updatedCustomer = {
      ...currentCustomer,
      points: currentCustomer.points - redeemPoints,
      pointsHistory: [
        { date: new Date().toISOString().split('T')[0], desc: "Redeemed Points", points: -redeemPoints },
        ...currentCustomer.pointsHistory
      ]
    };
    
    setCurrentCustomer(updatedCustomer);
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setRedeemPoints(0);
    toast.success(`✅ Successfully redeemed ${redeemPoints} points for ₹${redeemPoints / 10} discount!`);
  };

  if (!currentCustomer) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md min-h-[calc(100vh-80px)] flex items-center justify-center">
        <Card className="w-full border-border shadow-lg rounded-3xl overflow-hidden">
          <div className="bg-[#FDE8ED] p-6 text-center">
            <span className="text-5xl mb-2 block">👋</span>
            <CardTitle className="font-heading text-2xl text-[#5C3D2E]">Welcome to GDH!</CardTitle>
            <CardDescription className="text-[#5C3D2E]/70 font-medium">Login or register to earn loyalty points</CardDescription>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleLoginRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="E.g. Priya Sharma" 
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="h-12 rounded-xl border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input 
                  id="mobile" 
                  placeholder="10-digit number" 
                  type="tel"
                  maxLength={10}
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                  className="h-12 rounded-xl border-primary/20"
                />
              </div>
              <Button type="submit" className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-12 rounded-xl text-lg mt-4 shadow-sm">
                Login / Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tierInfo = getTier(currentCustomer.points);
  const progressToNextTier = tierInfo.nextTierPoints 
    ? (currentCustomer.points / tierInfo.nextTierPoints) * 100 
    : 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-[#5C3D2E]">Welcome, {currentCustomer.name}! 🎉</h1>
          <p className="text-muted-foreground mt-1 font-medium">{currentCustomer.mobile}</p>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Points Card */}
        <Card className="md:col-span-2 border-border shadow-sm rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDE8ED] to-white relative">
          <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#E8547A] flex items-center gap-1 shadow-sm">
            {tierInfo.emoji} {tierInfo.name} Tier
          </div>
          <CardContent className="p-8">
            <h3 className="font-bold text-[#5C3D2E] mb-2 text-lg">Available Loyalty Points</h3>
            <div className="text-6xl font-black text-[#E8547A] mb-4 flex items-baseline gap-2">
              {currentCustomer.points} <span className="text-lg text-muted-foreground font-semibold">pts</span>
            </div>
            
            <div className="space-y-2 max-w-md">
              <div className="flex justify-between text-sm font-bold text-muted-foreground">
                <span>{tierInfo.name}</span>
                {tierInfo.nextTierPoints ? (
                  <span>{tierInfo.nextTierPoints - currentCustomer.points} pts to next tier</span>
                ) : (
                  <span>Max Tier Reached!</span>
                )}
              </div>
              <Progress value={progressToNextTier} className="h-3 bg-white border border-[#F4A0B0]/30 [&>div]:bg-[#E8547A]" />
              <p className="text-xs text-muted-foreground font-medium mt-1">
                You get {tierInfo.discount}% discount on all orders.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <div className="flex flex-col gap-6">
          <Card className="rounded-3xl border-border shadow-sm flex-1">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wider mb-1">Total Spent</h3>
              <div className="text-3xl font-black text-foreground">₹{currentCustomer.totalSpent}</div>
              <div className="text-sm font-bold text-[#25D366] mt-1 bg-[#25D366]/10 px-2 py-0.5 rounded w-fit">
                Across {currentCustomer.orderCount} orders
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Referral Section */}
        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-heading text-[#5C3D2E]">
              <Gift className="h-5 w-5 text-primary" /> Refer & Earn
            </CardTitle>
            <CardDescription>Get 50 pts for every friend who orders!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-xl flex items-center justify-between mb-4 border border-border">
              <div className="font-mono font-bold text-lg">{currentCustomer.referralCode}</div>
              <Button variant="ghost" size="icon" onClick={copyReferralCode} className="hover:bg-white shrink-0 h-8 w-8 rounded-lg">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={shareViaWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-11 rounded-xl mb-4">
              <Share2 className="h-4 w-4 mr-2" /> Share via WhatsApp
            </Button>
            <div className="text-center font-bold text-sm text-muted-foreground bg-[#FDE8ED] py-2 rounded-lg border border-[#F4A0B0]/30">
              Aapne {currentCustomer.referralCount} logon ko refer kiya hai!
            </div>
            {currentCustomer.referralCount >= 5 && (
              <div className="mt-3 text-center text-xs font-bold text-primary animate-pulse">
                🌟 Special Reward Unlocked: Free Diaper Pack on next visit!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Redeem Section */}
        <Card className="rounded-3xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-[#5C3D2E]">Redeem Points</CardTitle>
            <CardDescription>Convert points to discount (100 pts = ₹10)</CardDescription>
          </CardHeader>
          <CardContent>
            {currentCustomer.points < 200 ? (
              <div className="text-center py-6 bg-muted rounded-xl border border-border text-muted-foreground font-medium">
                You need at least 200 points to redeem.<br/>Keep shopping! 🛍️
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Select Points</span>
                    <span className="text-primary">{redeemPoints} pts</span>
                  </div>
                  <Slider 
                    defaultValue={[0]} 
                    max={Math.floor(currentCustomer.points / 100) * 100} 
                    step={100}
                    onValueChange={(vals) => setRedeemPoints(vals[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-bold">
                    <span>0</span>
                    <span>{Math.floor(currentCustomer.points / 100) * 100}</span>
                  </div>
                </div>
                
                <div className="bg-[#E8FDF0] p-4 rounded-xl border border-[#166534]/20 text-center">
                  <span className="block text-sm text-[#166534] font-bold mb-1">Aapko choot milegi:</span>
                  <span className="block text-3xl font-black text-[#166534]">₹{redeemPoints / 10}</span>
                </div>
                
                <Button 
                  onClick={handleRedeem}
                  disabled={redeemPoints === 0}
                  className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-11 rounded-xl disabled:opacity-50"
                >
                  Redeem Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border-border shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30">
          <CardTitle className="text-xl font-heading text-[#5C3D2E]">Points History</CardTitle>
        </CardHeader>
        <div className="p-0">
          {currentCustomer.pointsHistory.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground font-medium">No history yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Date</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="text-right font-bold">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCustomer.pointsHistory.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{entry.date}</TableCell>
                    <TableCell>{entry.desc}</TableCell>
                    <TableCell className={`text-right font-bold ${entry.points > 0 ? 'text-[#25D366]' : 'text-destructive'}`}>
                      {entry.points > 0 ? '+' : ''}{entry.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
}
