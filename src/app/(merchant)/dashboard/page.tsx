import {
  DollarSign,
  MessageSquare,
  Layers,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  // Mock data for the current active capsule stock drop
  const recentOrders = [
    {
      id: "TXN-9021",
      items: "Vintage Crop Top (1-of-1)",
      buyer: "+254 712 *** 345",
      amount: "KES 1,500",
      status: "Paid",
      time: "2 mins ago",
    },
    {
      id: "TXN-9020",
      items: "Capsule Cargo Pants (M)",
      buyer: "+254 722 *** 987",
      amount: "KES 3,200",
      status: "Paid",
      time: "7 mins ago",
    },
    {
      id: "TXN-9019",
      items: "Oversized Heavyweight Hoodie",
      buyer: "+254 701 *** 456",
      amount: "KES 4,500",
      status: "Processing",
      time: "12 mins ago",
    },
    {
      id: "TXN-9018",
      items: "Retro Graphic Tee (L)",
      buyer: "+254 755 *** 123",
      amount: "KES 2,200",
      status: "Failed",
      time: "18 mins ago",
    },
  ];

  const stockStatus = [
    {
      name: "Vintage Crop Top Collection",
      stock: "0/15 left",
      status: "CLEARED OUT",
      type: "1-of-1 Drop",
    },
    {
      name: "Capsule Cargo Pants",
      stock: "4/40 left",
      status: "LOW STOCK",
      type: "Limited Batch",
    },
    {
      name: "Oversized Heavyweight Hoodie",
      stock: "28/50 left",
      status: "ACTIVE",
      type: "Limited Batch",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8 font-sans antialiased text-stone-600 bg-zinc-50">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight uppercase">
            Merchant Console
          </h1>
          <p className="text-xs text-stone-400 font-medium">
            Monitoring active WhatsApp pipelines and M-Pesa order verification.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-lg transition-all">
            <RefreshCw className="h-3 w-3" />
            Sync Logs
          </button>
          <button className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-lg shadow-sm transition-all">
            <Plus className="h-3.5 w-3.5 stroke-3" />
            New Drop
          </button>
        </div>
      </div>

      {/* Grid Row 1: High-Velocity Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Revenue */}
        <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
              Today's Revenue
            </span>
            <DollarSign className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              KES 48,900
            </h3>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +14.2% vs last drop
            </p>
          </div>
        </div>

        {/* Stat 2: Active Threads */}
        <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
              AI Parsed Chats
            </span>
            <MessageSquare className="h-4 w-4 text-stone-700" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              142 Threads
            </h3>
            <p className="text-[10px] font-medium text-stone-400">
              98% automated resolution
            </p>
          </div>
        </div>

        {/* Stat 3: Total Sales */}
        <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
              Items Sold
            </span>
            <Layers className="h-4 w-4 text-stone-700" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              73 Units
            </h3>
            <p className="text-[10px] font-medium text-stone-400">
              From 105 total drop items
            </p>
          </div>
        </div>

        {/* Stat 4: STK Success */}
        <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
              M-Pesa STK Push Hit-Rate
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              94.6%
            </h3>
            <p className="text-[10px] font-medium text-stone-400">
              Instant validation webhooks
            </p>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Live Streams & Inventory Management Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Real-Time Checkout Streams */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
                Live Checkout Streams
              </h3>
            </div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
              Real-time Feed
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {recentOrders.map((order, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-stone-900">
                      {order.items}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      | {order.id}
                    </span>
                  </div>
                  <p className="text-stone-400 font-medium">
                    Buyer:{" "}
                    <span className="text-stone-700 font-semibold">
                      {order.buyer}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="font-bold text-stone-900 block">
                      {order.amount}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {order.time}
                    </span>
                  </div>

                  {/* Status Badging */}
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      order.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : order.status === "Processing"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Inventory Serialization Watch */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-stone-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
                Active Drop Guard
              </h3>
            </div>

            <div className="p-5 space-y-4">
              {stockStatus.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-stone-100 rounded-xl p-3.5 space-y-2 bg-stone-50/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-stone-900 tracking-tight leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md shrink-0 ${
                        item.status === "CLEARED OUT"
                          ? "bg-stone-200 text-stone-700"
                          : item.status === "LOW STOCK"
                            ? "bg-orange-50 text-brand-primary border border-brand-primary/20"
                            : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Miniature progress bar tracking velocity */}
                  <div className="space-y-1">
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.status === "CLEARED OUT" ? "bg-stone-400" : "bg-brand-primary"}`}
                        style={{
                          width:
                            item.status === "CLEARED OUT"
                              ? "100%"
                              : item.status === "LOW STOCK"
                                ? "90%"
                                : "44%",
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                      <span>Velocity Tracker</span>
                      <span className="text-stone-700 font-bold">
                        {item.stock}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick System Action Tip */}
          <div className="p-4 bg-stone-50 border-t border-stone-100 m-5 rounded-xl flex items-start gap-2.5 text-[11px] font-medium leading-relaxed">
            <AlertCircle className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <p>
              Your AI system is dynamically listening. To adjust pricing or
              restock items instantly without logging in, message commands
              directly to your secure merchant backend phone channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
