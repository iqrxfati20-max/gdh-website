import { useState, useEffect } from "react";
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
import { Copy, Share2, LogOut, Gift, Check, Link2, Users } from "lucide-react";

/* ─── helpers ─────────────────────────────────────────────── */
function getReferralParam(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("ref") ?? "";
}

function buildReferralLink(code: string): string {
  const base = window.location.origin + window.location.pathname;
  return `${base}?ref=${encodeURIComponent(code)}`;
}

export default function Account() {
  const { currentCustomer, setCurrentCustomer, customers, setCustomers } = useAppContext();

  const [loginName, setLoginName]       = useState("");
  const [loginMobile, setLoginMobile]   = useState("");
  const [refCodeInput, setRefCodeInput] = useState(() => getReferralParam());
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [codeCopied, setCodeCopied]     = useState(false);
  const [linkCopied, setLinkCopied]     = useState(false);

  /* Pre-fill referral input if ?ref= is in URL */
  useEffect(() => {
    const param = getReferralParam();
    if (param) setRefCodeInput(param);
  }, []);

  /* ── Login / Register ─────────────────────────────────── */
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
      return;
    }

    /* New registration */
    const newCustomer = {
      id: Date.now(),
      name: loginName,
      mobile: loginMobile,
      referralCode: `GDH-${loginName.toUpperCase().replace(/\s/g, "").slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`,
      points: 0,
      tier: "Silver",
      referredBy: null as string | null,
      referralCount: 0,
      totalSpent: 0,
      orderCount: 0,
      pointsHistory: [] as { date: string; desc: string; points: number }[],
    };

    let updatedCustomers = [...customers, newCustomer];

    /* Award 50 pts to referrer if code was entered */
    const trimmedRef = refCodeInput.trim().toUpperCase();
    if (trimmedRef) {
      const referrer = customers.find(
        c => c.referralCode.toUpperCase() === trimmedRef
      );
      if (referrer) {
        const today = new Date().toISOString().split("T")[0];
        const updatedReferrer = {
          ...referrer,
          points: referrer.points + 50,
          referralCount: referrer.referralCount + 1,
          pointsHistory: [
            { date: today, desc: `Referral bonus — ${loginName} joined!`, points: 50 },
            ...referrer.pointsHistory,
          ],
        };
        newCustomer.referredBy = referrer.referralCode;
        updatedCustomers = updatedCustomers.map(c =>
          c.id === referrer.id ? updatedReferrer : c
        );
        toast.success(`Referral applied! ${referrer.name} earned 50 bonus points 🎉`);
      } else {
        toast.error("Referral code not found — continuing without it.");
      }
    }

    setCustomers(updatedCustomers);
    setCurrentCustomer(newCustomer);
    toast.success(`Account created! Welcome, ${loginName}! 🎉`);

    /* Strip ?ref= from URL */
    const url = new URL(window.location.href);
    url.searchParams.delete("ref");
    window.history.replaceState({}, "", url.toString());
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
    setLoginName(""); setLoginMobile(""); setRefCodeInput("");
    toast.success("Logged out successfully");
  };

  /* ── Copy helpers ─────────────────────────────────────── */
  const copyCode = () => {
    if (!currentCustomer) return;
    navigator.clipboard.writeText(currentCustomer.referralCode);
    setCodeCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyLink = () => {
    if (!currentCustomer) return;
    navigator.clipboard.writeText(buildReferralLink(currentCustomer.referralCode));
    setLinkCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    if (!currentCustomer) return;
    const link = buildReferralLink(currentCustomer.referralCode);
    const text =
      `Hey! 👶 Main apne baby ke products *Gorakhpur Diaper House* se leta/leti hoon.\n\n` +
      `Iss link se account banao aur mujhe 50 bonus points milenge! 🎁\n\n` +
      `👉 ${link}\n\n` +
      `Ya phir mera referral code use karo: *${currentCustomer.referralCode}*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleRedeem = () => {
    if (!currentCustomer || redeemPoints === 0) return;
    const updated = {
      ...currentCustomer,
      points: currentCustomer.points - redeemPoints,
      pointsHistory: [
        { date: new Date().toISOString().split("T")[0], desc: "Points Redeemed", points: -redeemPoints },
        ...currentCustomer.pointsHistory,
      ],
    };
    setCurrentCustomer(updated);
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setRedeemPoints(0);
    toast.success(`✅ Redeemed ${redeemPoints} pts = ₹${redeemPoints / 10} discount!`);
  };

  /* ── Login screen ─────────────────────────────────────── */
  if (!currentCustomer) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md min-h-[calc(100vh-80px)] flex items-center justify-center">
        <Card className="w-full border-[#F4A0B0]/20 shadow-lg rounded-3xl overflow-hidden">
          <div className="bg-[#FDE8ED] p-7 text-center">
            <span className="text-5xl mb-2 block">👋</span>
            <CardTitle className="font-heading text-2xl text-[#5C3D2E]">Welcome to GDH!</CardTitle>
            <CardDescription className="text-[#5C3D2E]/60 font-medium mt-1">
              Login or register to earn loyalty points
            </CardDescription>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleLoginRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-bold text-[#5C3D2E]">Full Name</Label>
                <Input
                  id="name"
                  placeholder="E.g. Priya Sharma"
                  value={loginName}
                  onChange={e => setLoginName(e.target.value)}
                  className="h-12 rounded-xl border-[#F4A0B0]/30 focus-visible:ring-[#E8547A]/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="font-bold text-[#5C3D2E]">Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="10-digit number"
                  type="tel"
                  maxLength={10}
                  value={loginMobile}
                  onChange={e => setLoginMobile(e.target.value.replace(/\D/g, ""))}
                  className="h-12 rounded-xl border-[#F4A0B0]/30 focus-visible:ring-[#E8547A]/30"
                />
              </div>

              {/* Referral code field */}
              <div className="space-y-1.5">
                <Label htmlFor="refCode" className="font-bold text-[#5C3D2E] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#E8547A]" />
                  Referral Code
                  <span className="text-[#8A7070] font-normal text-xs">(optional)</span>
                </Label>
                <Input
                  id="refCode"
                  placeholder="E.g. GDH-PRIYA-1234"
                  value={refCodeInput}
                  onChange={e => setRefCodeInput(e.target.value)}
                  className={`h-12 rounded-xl border-[#F4A0B0]/30 focus-visible:ring-[#E8547A]/30 font-mono uppercase tracking-wide text-sm ${refCodeInput ? "border-[#E8547A]/40 bg-[#FDE8ED]/40" : ""}`}
                />
                {refCodeInput && (
                  <p className="text-[10px] text-[#E8547A] font-semibold flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Referral code applied — your friend will earn 50 pts!
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-12 rounded-xl text-base mt-2 shadow-sm">
                Login / Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ── Logged-in screen ─────────────────────────────────── */
  const tierInfo = getTier(currentCustomer.points);
  const progressToNextTier = tierInfo.nextTierPoints
    ? (currentCustomer.points / tierInfo.nextTierPoints) * 100
    : 100;
  const referralLink = buildReferralLink(currentCustomer.referralCode);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-[#5C3D2E]">
            Welcome, {currentCustomer.name}! 🎉
          </h1>
          <p className="text-[#8A7070] mt-1 font-medium">{currentCustomer.mobile}</p>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-[#8A7070] hover:bg-red-50 hover:text-red-500 rounded-xl">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      {/* Points + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2 border-[#F4A0B0]/20 shadow-sm rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDE8ED] to-white relative">
          <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#E8547A] flex items-center gap-1 shadow-sm">
            {tierInfo.emoji} {tierInfo.name} Tier
          </div>
          <CardContent className="p-8">
            <h3 className="font-bold text-[#5C3D2E] mb-1 text-sm uppercase tracking-wider">Available Points</h3>
            <div className="text-6xl font-black text-[#E8547A] mb-4 flex items-baseline gap-2">
              {currentCustomer.points}
              <span className="text-lg text-[#8A7070] font-semibold">pts</span>
            </div>
            <div className="space-y-2 max-w-md">
              <div className="flex justify-between text-sm font-bold text-[#8A7070]">
                <span>{tierInfo.name}</span>
                {tierInfo.nextTierPoints
                  ? <span>{tierInfo.nextTierPoints - currentCustomer.points} pts to next tier</span>
                  : <span>Max Tier Reached! 🏆</span>
                }
              </div>
              <Progress value={progressToNextTier} className="h-3 bg-white border border-[#F4A0B0]/30 [&>div]:bg-[#E8547A]" />
              <p className="text-xs text-[#8A7070] font-medium">
                You get {tierInfo.discount}% discount on all orders.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="rounded-3xl border-[#F4A0B0]/20 shadow-sm flex-1">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="font-bold text-[#8A7070] text-xs uppercase tracking-wider mb-1">Total Spent</h3>
              <div className="text-3xl font-black text-[#5C3D2E]">₹{currentCustomer.totalSpent}</div>
              <div className="text-xs font-bold text-[#25D366] mt-1 bg-[#25D366]/10 px-2 py-0.5 rounded w-fit">
                {currentCustomer.orderCount} orders
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-[#F4A0B0]/20 shadow-sm flex-1">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="font-bold text-[#8A7070] text-xs uppercase tracking-wider mb-1">Friends Referred</h3>
              <div className="text-3xl font-black text-[#5C3D2E] flex items-baseline gap-1">
                {currentCustomer.referralCount}
                <span className="text-sm text-[#8A7070] font-semibold">friends</span>
              </div>
              <div className="text-xs font-bold text-[#E8547A] mt-1 bg-[#FDE8ED] px-2 py-0.5 rounded w-fit">
                {currentCustomer.referralCount * 50} pts earned
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Referral + Redeem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* ── Referral Card ── */}
        <Card className="rounded-3xl border-[#F4A0B0]/20 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-heading text-[#5C3D2E]">
              <Gift className="h-5 w-5 text-[#E8547A]" /> Refer &amp; Earn
            </CardTitle>
            <CardDescription className="text-[#8A7070] font-medium">
              Share your link — earn <span className="text-[#E8547A] font-bold">50 pts</span> every time a friend joins!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Referral code */}
            <div>
              <p className="text-[10px] font-bold text-[#8A7070] uppercase tracking-widest mb-1.5">Your Code</p>
              <div className="bg-[#FDE8ED]/60 border border-[#F4A0B0]/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <span className="font-mono font-bold text-[#5C3D2E] text-lg tracking-widest">
                  {currentCustomer.referralCode}
                </span>
                <button
                  onClick={copyCode}
                  className="shrink-0 w-8 h-8 rounded-lg bg-white border border-[#F4A0B0]/30 flex items-center justify-center hover:bg-[#FDE8ED] transition-colors"
                  title="Copy code"
                >
                  {codeCopied
                    ? <Check className="w-4 h-4 text-[#25D366]" />
                    : <Copy className="w-4 h-4 text-[#8A7070]" />
                  }
                </button>
              </div>
            </div>

            {/* Referral link */}
            <div>
              <p className="text-[10px] font-bold text-[#8A7070] uppercase tracking-widest mb-1.5">Your Referral Link</p>
              <div className="bg-white border border-[#F4A0B0]/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <span className="text-xs text-[#8A7070] font-medium truncate flex-1">
                  {referralLink}
                </span>
                <button
                  onClick={copyLink}
                  className="shrink-0 w-8 h-8 rounded-lg bg-[#FDE8ED] border border-[#F4A0B0]/30 flex items-center justify-center hover:bg-[#F4A0B0]/30 transition-colors"
                  title="Copy link"
                >
                  {linkCopied
                    ? <Check className="w-4 h-4 text-[#25D366]" />
                    : <Link2 className="w-4 h-4 text-[#E8547A]" />
                  }
                </button>
              </div>
            </div>

            {/* Share on WhatsApp */}
            <Button
              onClick={shareViaWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-11 rounded-xl gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share on WhatsApp
            </Button>

            {/* Stats strip */}
            <div className="flex items-center justify-center gap-2 bg-[#FDE8ED] rounded-xl py-3 px-4">
              <Users className="w-4 h-4 text-[#E8547A]" />
              <span className="text-sm font-bold text-[#5C3D2E]">
                {currentCustomer.referralCount === 0
                  ? "No referrals yet — share now!"
                  : `${currentCustomer.referralCount} friend${currentCustomer.referralCount > 1 ? "s" : ""} joined via your link`
                }
              </span>
            </div>

            {currentCustomer.referralCount >= 5 && (
              <div className="text-center text-xs font-bold text-[#E8547A] bg-[#FDE8ED] py-2 rounded-xl border border-[#F4A0B0]/30 animate-pulse">
                🌟 Special Reward Unlocked: Free Diaper Pack on next visit!
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Redeem Card ── */}
        <Card className="rounded-3xl border-[#F4A0B0]/20 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-heading text-[#5C3D2E]">Redeem Points</CardTitle>
            <CardDescription className="text-[#8A7070] font-medium">
              Convert points to discount (100 pts = ₹10)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentCustomer.points < 200 ? (
              <div className="text-center py-8 bg-[#FFFAF8] rounded-xl border border-[#F4A0B0]/20 text-[#8A7070] font-medium">
                Need at least 200 points to redeem.<br />Keep shopping! 🛍️
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#8A7070]">Select Points</span>
                    <span className="text-[#E8547A]">{redeemPoints} pts</span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={Math.floor(currentCustomer.points / 100) * 100}
                    step={100}
                    onValueChange={vals => setRedeemPoints(vals[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-[#8A7070] font-bold">
                    <span>0</span>
                    <span>{Math.floor(currentCustomer.points / 100) * 100}</span>
                  </div>
                </div>
                <div className="bg-[#ECFDF5] p-4 rounded-xl border border-[#166534]/10 text-center">
                  <span className="block text-sm text-[#166534] font-bold mb-1">Aapko choot milegi:</span>
                  <span className="block text-3xl font-black text-[#166534]">₹{redeemPoints / 10}</span>
                </div>
                <Button
                  onClick={handleRedeem}
                  disabled={redeemPoints === 0}
                  className="w-full bg-[#E8547A] hover:bg-[#D43D63] text-white font-bold h-11 rounded-xl disabled:opacity-40"
                >
                  Redeem Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Points History */}
      <Card className="rounded-3xl border-[#F4A0B0]/20 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-[#F4A0B0]/15 bg-[#FFFAF8]">
          <CardTitle className="text-xl font-heading text-[#5C3D2E]">Points History</CardTitle>
        </CardHeader>
        <div className="p-0">
          {currentCustomer.pointsHistory.length === 0 ? (
            <div className="text-center py-10 text-[#8A7070] font-medium">
              No history yet — place your first order!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FFFAF8]">
                  <TableHead className="font-bold text-[#5C3D2E]">Date</TableHead>
                  <TableHead className="font-bold text-[#5C3D2E]">Description</TableHead>
                  <TableHead className="text-right font-bold text-[#5C3D2E]">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCustomer.pointsHistory.map((entry, idx) => (
                  <TableRow key={idx} className="hover:bg-[#FFFAF8]">
                    <TableCell className="font-medium text-[#8A7070]">{entry.date}</TableCell>
                    <TableCell className="text-[#5C3D2E] font-medium">{entry.desc}</TableCell>
                    <TableCell className={`text-right font-black text-base ${entry.points > 0 ? "text-[#25D366]" : "text-[#E8547A]"}`}>
                      {entry.points > 0 ? "+" : ""}{entry.points}
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
