import { TrendingUp, TrendingDown, BarChart3, Zap, PieChart, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TraderDashboard() {
  const stats = {
    portfolioValue: 125000,
    dayChange: 2850,
    dayChangePercent: 2.3,
    activePositions: 15,
    winRate: 73,
    trades: 234,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Portfolio Value</CardTitle>
            <div className="p-2 bg-emerald-500 rounded-lg shadow-sm">
              <PieChart className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">${stats.portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-emerald-600">Current holdings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Day P&L</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">+${Math.abs(stats.dayChange).toLocaleString()}</div>
            <p className="text-xs text-green-600">+{stats.dayChangePercent}% today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Win Rate</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.winRate}%</div>
            <p className="text-xs text-blue-600">Successful trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Positions</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
              <Zap className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.activePositions}</div>
            <p className="text-xs text-purple-600">Open positions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Trades</CardTitle>
            <div className="p-2 bg-amber-500 rounded-lg shadow-sm">
              <TrendingDown className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stats.trades}</div>
            <p className="text-xs text-amber-600">All-time trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Trading Dashboard */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Market Watch */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Market Watch
            </CardTitle>
            <CardDescription>Top performers today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { symbol: "AAPL", price: 182.5, change: 2.4, badge: "strong-buy" },
              { symbol: "MSFT", price: 384.2, change: 1.8, badge: "buy" },
              { symbol: "GOOGL", price: 142.8, change: -0.5, badge: "hold" },
              { symbol: "AMZN", price: 195.3, change: 3.2, badge: "strong-buy" },
            ].map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">${stock.price}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">{stock.badge}</Badge>
                  <p className={`text-sm font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trading Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Actions</CardTitle>
            <CardDescription>Manage your trades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Place New Trade
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              View All Positions
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertCircle className="mr-2 h-4 w-4" />
              Set Price Alerts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" />
              Portfolio Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
