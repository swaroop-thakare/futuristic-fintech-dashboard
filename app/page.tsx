"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Key,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Lock,
  Zap,
  Activity,
  Globe,
  FileText,
  Download,
  Calendar,
  CreditCard,
  Smartphone,
  Wallet,
  Building,
  Code,
  Settings,
  Receipt,
  UserCheck,
  Copy,
  Webhook,
  BookOpen,
  Terminal,
  Fingerprint,
  Upload,
  AlertTriangle,
  Timer,
  MapPin,
  Users,
  Brain,
  FileCheck,
  Layers,
  Target,
  BarChart3,
  RefreshCw,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  Building2,
  ArrowRightLeft,
} from "lucide-react"

const paymentMethods = [
  { id: "card", name: "Credit/Debit Cards", icon: CreditCard, enabled: true, fee: "2.9%" },
  { id: "upi", name: "UPI", icon: Smartphone, enabled: true, fee: "0%" },
  { id: "netbanking", name: "Net Banking", icon: Building, enabled: true, fee: "1.9%" },
  { id: "wallet", name: "Digital Wallets", icon: Wallet, enabled: true, fee: "2.4%" },
  { id: "rtgs", name: "RTGS", icon: Building2, enabled: true, fee: "₹25 + GST" },
  { id: "neft", name: "NEFT", icon: ArrowRightLeft, enabled: true, fee: "₹2.5 + GST" },
  { id: "imps", name: "IMPS", icon: Zap, enabled: true, fee: "₹5 + GST" },
  { id: "wire", name: "Wire Transfer", icon: Globe, enabled: true, fee: "₹500 + GST" },
  { id: "emi", name: "EMI", icon: Receipt, enabled: false, fee: "3.5%" },
  { id: "bnpl", name: "Buy Now Pay Later", icon: Calendar, enabled: false, fee: "2.5%" },
]

const merchantData = {
  balance: 2847650,
  todayTransactions: 1247,
  todayVolume: 4567890,
  successRate: 98.7,
  settlements: {
    pending: 125000,
    nextSettlement: "2025-08-24T10:00:00Z",
    frequency: "Daily",
  },
}

const recentTransactions = [
  {
    id: "pay_123",
    amount: 2500,
    status: "success",
    method: "UPI",
    customer: "customer@example.com",
    time: "2 mins ago",
  },
  { id: "pay_124", amount: 15000, status: "success", method: "Card", customer: "john@company.com", time: "5 mins ago" },
  {
    id: "pay_125",
    amount: 750,
    status: "failed",
    method: "Net Banking",
    customer: "user@domain.com",
    time: "8 mins ago",
  },
  { id: "pay_126", amount: 3200, status: "pending", method: "Wallet", customer: "buyer@shop.com", time: "12 mins ago" },
]

const apiEndpoints = [
  { method: "POST", endpoint: "/v1/payments", description: "Create a payment" },
  { method: "GET", endpoint: "/v1/payments/{id}", description: "Fetch payment details" },
  { method: "POST", endpoint: "/v1/refunds", description: "Create a refund" },
  { method: "GET", endpoint: "/v1/settlements", description: "Get settlement details" },
]

const transactionZones = [
  {
    id: 1,
    name: "Chennai BPO",
    cluster: "South Zone",
    area: "Chennai-Tambaram",
    transactions: 500,
    status: "active",
    x: 65,
    y: 45,
    flagged: 12,
    successRate: 98.5,
    slaBreaches: 2,
    fallbacks: 12,
    avgSla: 520,
  },
  {
    id: 2,
    name: "Mumbai Finance",
    cluster: "West Zone",
    area: "Mumbai-Andheri",
    transactions: 320,
    status: "review",
    x: 45,
    y: 35,
    flagged: 8,
    successRate: 99.2,
    slaBreaches: 0,
    fallbacks: 5,
    avgSla: 480,
  },
  {
    id: 3,
    name: "Bangalore Tech",
    cluster: "South Zone",
    area: "Bengaluru-Whitefield",
    transactions: 750,
    status: "active",
    x: 60,
    y: 55,
    flagged: 3,
    successRate: 97.8,
    slaBreaches: 1,
    fallbacks: 8,
    avgSla: 590,
  },
  {
    id: 4,
    name: "Delhi Corporate",
    cluster: "North Zone",
    area: "Delhi-Gurgaon",
    transactions: 280,
    status: "flagged",
    x: 50,
    y: 25,
    flagged: 25,
    successRate: 91.1,
    slaBreaches: 8,
    fallbacks: 15,
    avgSla: 720,
  },
]

const clusterSummary = [
  {
    cluster: "South Zone",
    zones: ["Chennai BPO", "Bangalore Tech"],
    totalTransactions: 1250,
    successRate: 98.1,
    slaBreaches: 3,
    fallbacks: 20,
    flagged: 15,
  },
  {
    cluster: "West Zone",
    zones: ["Mumbai Finance"],
    totalTransactions: 320,
    successRate: 99.2,
    slaBreaches: 0,
    fallbacks: 5,
    flagged: 8,
  },
  {
    cluster: "North Zone",
    zones: ["Delhi Corporate"],
    totalTransactions: 280,
    successRate: 91.1,
    slaBreaches: 8,
    fallbacks: 15,
    flagged: 25,
  },
]

const flaggedTransactions = [
  {
    id: "TXN103",
    batchId: "BATCH_2025_08_23",
    recipient: "Ravi Kumar",
    amount: 45000,
    route: "ICICI-IMPS",
    primaryRoute: "HDFC-UPI",
    reason: "Account recently created + High payout",
    explanation: "IMPS chosen as fallback due to Bandhan NEFT outage risk.",
    confidence: 0.87,
    zone: "Chennai BPO",
    cluster: "South Zone",
    slaTarget: 600,
    slaActual: 520,
    reviewer: null,
    timestamp: "2025-08-23T14:30:00Z",
    auditLog: [
      { action: "Route Selected", details: "HDFC-UPI chosen for speed", timestamp: "14:30:01" },
      { action: "Fallback Triggered", details: "Network load detected", timestamp: "14:30:15" },
      { action: "Human Review Required", details: "High-risk profile flagged", timestamp: "14:30:20" },
    ],
  },
  {
    id: "TXN107",
    batchId: "BATCH_2025_08_23",
    recipient: "Priya Sharma",
    amount: 78000,
    route: "HDFC-NEFT",
    primaryRoute: "HDFC-NEFT",
    reason: "Unusual transaction pattern detected",
    explanation: "NEFT selected for optimal SLA compliance (600s achievable).",
    confidence: 0.92,
    zone: "Mumbai Finance",
    cluster: "West Zone",
    slaTarget: 600,
    slaActual: 480,
    reviewer: null,
    timestamp: "2025-08-23T14:45:00Z",
    auditLog: [
      { action: "Pattern Analysis", details: "Unusual frequency detected", timestamp: "14:45:01" },
      { action: "Risk Assessment", details: "Medium risk score assigned", timestamp: "14:45:05" },
      { action: "Manual Review Queued", details: "Compliance check required", timestamp: "14:45:10" },
    ],
  },
]

const realtimeMetrics = {
  totalTransactions: 1850,
  processed: 1795,
  pending: 30,
  flagged: 25,
  slaCompliance: 98.2,
  avgProcessingTime: 45,
}

const onboardingSteps = [
  { id: 1, title: "Business Profile", completed: true, current: false },
  { id: 2, title: "Bank Account Setup", completed: true, current: false },
  { id: 3, title: "Payment Rails", completed: true, current: false },
  { id: 4, title: "Compliance Documents", completed: false, current: true },
  { id: 5, title: "Final Review", completed: false, current: false },
]

const batchProcessingData = {
  currentBatch: "BATCH_2025_08_23_001",
  totalTransactions: 1850,
  processed: 1795,
  pending: 30,
  flagged: 25,
  clusters: 4,
  slaCompliance: 98.2,
  avgProcessingTime: 45,
  estimatedCompletion: "14:45:00",
}

const slaTimers = [
  { id: "TXN103", recipient: "Ravi Kumar", amount: 45000, timeLeft: 420, target: 600, status: "processing" },
  { id: "TXN107", recipient: "Priya Sharma", amount: 78000, timeLeft: 180, target: 600, status: "review" },
  { id: "TXN112", recipient: "Amit Singh", amount: 25000, timeLeft: 540, target: 600, status: "processing" },
  { id: "TXN115", recipient: "Neha Gupta", amount: 67000, timeLeft: 45, target: 600, status: "critical" },
]

const auditReports = [
  {
    id: "RPT_001",
    type: "Client Report",
    period: "Aug 2025",
    status: "ready",
    transactions: 15420,
    clusters: 12,
    generated: "2025-08-23T10:30:00Z",
  },
  {
    id: "RPT_002",
    type: "Bank Compliance",
    period: "Aug 2025",
    status: "generating",
    transactions: 15420,
    clusters: 12,
    generated: null,
  },
  {
    id: "RPT_003",
    type: "Regulatory Audit",
    period: "Q3 2025",
    status: "scheduled",
    transactions: 45680,
    clusters: 35,
    generated: null,
  },
]

export default function ArealisGatewayDashboard() {
  const [selectedZone, setSelectedZone] = useState(null)
  const [showDualKeyAnimation, setShowDualKeyAnimation] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(true)
  const [activeTab, setActiveTab] = useState("payments") // Default to payments tab for futuristic payment processing
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [batchFile, setBatchFile] = useState(null)
  const [showExplanation, setShowExplanation] = useState(null)
  const [reviewDecision, setReviewDecision] = useState("")
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    currency: "INR",
    method: "",
    customer_email: "",
    description: "",
  })
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [showSecurityScan, setShowSecurityScan] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleApproveTransaction = (txnId: string) => {
    setShowDualKeyAnimation(true)
    setTimeout(() => setShowDualKeyAnimation(false), 3000)
  }

  const generateAuditReport = (type: "client" | "bank") => {
    console.log(`[v0] Generating ${type} audit report`)
    // Mock report generation
    const reportData = {
      type,
      timestamp: new Date().toISOString(),
      clusters: clusterSummary,
      transactions: flaggedTransactions,
    }
    console.log(`[v0] Report data:`, reportData)
  }

  const handleCreatePayment = () => {
    console.log("[v0] Creating payment:", paymentForm)
    setProcessingPayment(true)
    setShowSecurityScan(true)

    setTimeout(() => {
      setShowDualKeyAnimation(true)
      setShowSecurityScan(false)
    }, 2000)

    setTimeout(() => {
      setShowDualKeyAnimation(false)
      setProcessingPayment(false)
      setPaymentSuccess(true)
    }, 4000)

    setTimeout(() => {
      setPaymentSuccess(false)
    }, 6000)
  }

  const handleBatchUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setBatchFile(file)
      console.log("[v0] Batch file uploaded:", file.name)
    }
  }

  const handleReviewDecision = (txnId, decision) => {
    console.log(`[v0] Review decision for ${txnId}:`, decision)
    setReviewDecision(decision)
    if (decision === "approve") {
      setShowDualKeyAnimation(true)
      setTimeout(() => setShowDualKeyAnimation(false), 3000)
    }
  }

  const generateComprehensiveReport = (reportType) => {
    console.log(`[v0] Generating comprehensive ${reportType} report`)
    const reportData = {
      type: reportType,
      timestamp: new Date().toISOString(),
      clusters: clusterSummary,
      transactions: flaggedTransactions,
      slaMetrics: batchProcessingData,
      auditTrail: true,
    }
    console.log(`[v0] Comprehensive report data:`, reportData)
  }

  return (
    <div className="min-h-screen bg-background cyber-grid p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-balance text-primary">Arealis Gateway</h1>
            <p className="text-muted-foreground mt-2">Enterprise Payment Orchestration Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="glass-panel cy-glow neon-border">
              <Activity className="w-4 h-4 mr-2" />
              Live Processing
            </Badge>
            <Badge variant="outline" className="glass-panel cy-glow neon-border">
              <Shield className="w-4 h-4 mr-2" />
              PCI Level 1
            </Badge>
            <Badge variant="outline" className="glass-panel cy-glow">
              <Brain className="w-4 h-4 mr-2" />
              AI Powered
            </Badge>
            <Button variant="outline" onClick={() => setShowOnboarding(true)} className="neon-border">
              <Settings className="w-4 h-4 mr-2" />
              Setup
            </Button>
          </div>
        </div>
      </div>

      <Card className="mb-8 glass-panel cy-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Batch {batchProcessingData.currentBatch}</h3>
                <p className="text-sm text-muted-foreground">
                  {batchProcessingData.processed}/{batchProcessingData.totalTransactions} processed •{" "}
                  {batchProcessingData.flagged} flagged
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{batchProcessingData.slaCompliance}%</div>
                <div className="text-xs text-muted-foreground">SLA Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{batchProcessingData.avgProcessingTime}s</div>
                <div className="text-xs text-muted-foreground">Avg Time</div>
              </div>
              <Progress
                value={(batchProcessingData.processed / batchProcessingData.totalTransactions) * 100}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-8 glass-panel">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
          <TabsTrigger value="review">HITL Review</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="developers">Developers</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Volume</p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{realtimeMetrics.totalTransactions.toLocaleString()}
                    </p>
                    <p className="text-xs text-chart-3">+12.5% from yesterday</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clusters</p>
                    <p className="text-2xl font-bold text-accent">{clusterSummary.length}</p>
                    <p className="text-xs text-chart-3">Across {transactionZones.length} zones</p>
                  </div>
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Flagged Transactions</p>
                    <p className="text-2xl font-bold text-chart-5">{realtimeMetrics.flagged}</p>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-chart-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">SLA Violations</p>
                    <p className="text-2xl font-bold text-chart-4">3</p>
                    <p className="text-xs text-muted-foreground">This batch</p>
                  </div>
                  <Timer className="w-8 h-8 text-chart-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cluster Status Overview */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Cluster Status Overview
                </CardTitle>
                <CardDescription>Real-time cluster performance and health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clusterSummary.map((cluster) => (
                    <div key={cluster.cluster} className="border rounded-lg p-4 bg-card/40">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              cluster.successRate > 95
                                ? "bg-chart-3"
                                : cluster.successRate > 90
                                  ? "bg-chart-5"
                                  : "bg-chart-4"
                            }`}
                          />
                          <h4 className="font-medium">{cluster.cluster}</h4>
                        </div>
                        <Badge variant="outline">{cluster.zones.length} zones</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Transactions</div>
                          <div className="font-medium">{cluster.totalTransactions}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Success Rate</div>
                          <div className="font-medium text-chart-3">{cluster.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Flagged</div>
                          <div className="font-medium text-chart-5">{cluster.flagged}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">SLA Breaches</div>
                          <div className="font-medium text-chart-4">{cluster.slaBreaches}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live SLA Monitoring */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  Live SLA Monitoring
                </CardTitle>
                <CardDescription>Real-time transaction SLA tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slaTimers.map((timer) => (
                    <div key={timer.id} className="flex items-center justify-between p-3 border rounded-lg bg-card/40">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-bold ${
                            timer.status === "critical"
                              ? "border-chart-4 text-chart-4"
                              : timer.status === "review"
                                ? "border-chart-5 text-chart-5"
                                : "border-chart-3 text-chart-3"
                          }`}
                        >
                          {Math.floor(timer.timeLeft / 60)}m
                        </div>
                        <div>
                          <div className="font-medium">{timer.id}</div>
                          <div className="text-sm text-muted-foreground">{timer.recipient}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{timer.amount.toLocaleString()}</div>
                        <Badge
                          variant={
                            timer.status === "critical"
                              ? "destructive"
                              : timer.status === "review"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {timer.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="batch">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Batch Payment Upload
                  </CardTitle>
                  <CardDescription>Upload and process payment batches with smart clustering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your batch file here</p>
                      <p className="text-sm text-muted-foreground">Supports CSV, JSON, Excel formats</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv,.json,.xlsx"
                      onChange={handleBatchUpload}
                      className="hidden"
                      id="batch-upload"
                    />
                    <label htmlFor="batch-upload">
                      <Button className="mt-4" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>

                  {batchFile && (
                    <Alert>
                      <FileCheck className="h-4 w-4" />
                      <AlertDescription>
                        File "{batchFile.name}" uploaded successfully. {Math.floor(Math.random() * 1000 + 500)}{" "}
                        transactions detected.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Clustering Options */}
                  <div className="space-y-4">
                    <Label>Smart Clustering Options</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:bg-accent/10 border-primary bg-primary/5">
                        <CardContent className="p-4 text-center">
                          <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <div className="font-medium">Geographic</div>
                          <div className="text-xs text-muted-foreground">By location/region</div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer hover:bg-accent/10">
                        <CardContent className="p-4 text-center">
                          <Building className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-medium">Department</div>
                          <div className="text-xs text-muted-foreground">By org structure</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" disabled={!batchFile}>
                    <Zap className="w-4 h-4 mr-2" />
                    Process Batch with AI Clustering
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Batch History */}
            <div>
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Batches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "BATCH_001", status: "completed", transactions: 1850, time: "2 hours ago" },
                      { id: "BATCH_002", status: "processing", transactions: 920, time: "4 hours ago" },
                      { id: "BATCH_003", status: "completed", transactions: 1200, time: "1 day ago" },
                    ].map((batch) => (
                      <div
                        key={batch.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-card/40"
                      >
                        <div>
                          <div className="font-medium">{batch.id}</div>
                          <div className="text-sm text-muted-foreground">{batch.transactions} transactions</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={batch.status === "completed" ? "default" : "secondary"}>{batch.status}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">{batch.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orchestration">
          <div className="space-y-8">
            {/* Orchestration Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">1,795</div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </CardContent>
              </Card>
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-chart-5" />
                  </div>
                  <div className="text-2xl font-bold">30</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-chart-4" />
                  </div>
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-muted-foreground">Flagged</div>
                </CardContent>
              </Card>
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Fallbacks</div>
                </CardContent>
              </Card>
            </div>

            {/* Live Transaction Feed */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Live Transaction Feed
                </CardTitle>
                <CardDescription>Real-time payment processing with SLA monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedTransactions.map((txn) => (
                    <div key={txn.id} className="border rounded-lg p-4 bg-card/40">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{txn.id}</div>
                            <div className="text-sm text-muted-foreground">{txn.recipient}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{txn.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{txn.route}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-muted-foreground">Zone</div>
                          <div className="font-medium">{txn.zone}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">SLA Target</div>
                          <div className="font-medium">{txn.slaTarget}s</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Actual</div>
                          <div className="font-medium text-chart-3">{txn.slaActual}s</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Confidence</div>
                          <div className="font-medium">{Math.round(txn.confidence * 100)}%</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{txn.reason}</Badge>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Brain className="w-4 h-4 mr-2" />
                                Explain
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>AI Routing Explanation</DialogTitle>
                                <DialogDescription>Transaction {txn.id}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Routing Decision</Label>
                                  <p className="text-sm mt-1">{txn.explanation}</p>
                                </div>
                                <div>
                                  <Label>Confidence Score</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Progress value={txn.confidence * 100} className="flex-1" />
                                    <span className="text-sm font-medium">{Math.round(txn.confidence * 100)}%</span>
                                  </div>
                                </div>
                                <div>
                                  <Label>Audit Trail</Label>
                                  <div className="space-y-2 mt-1">
                                    {txn.auditLog.map((log, index) => (
                                      <div key={index} className="text-sm border-l-2 border-primary/20 pl-3">
                                        <div className="font-medium">{log.action}</div>
                                        <div className="text-muted-foreground">
                                          {log.details} • {log.timestamp}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="review">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Human-in-the-Loop Review Queue
                  </CardTitle>
                  <CardDescription>Flagged transactions requiring manual review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {flaggedTransactions.map((txn) => (
                      <div key={txn.id} className="border rounded-lg p-6 bg-card/40">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Left Panel - Transaction Details */}
                          <div className="space-y-4">
                            <div>
                              <Label>Transaction Details</Label>
                              <div className="mt-2 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">ID:</span>
                                  <span className="text-sm font-medium">{txn.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Recipient:</span>
                                  <span className="text-sm font-medium">{txn.recipient}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Amount:</span>
                                  <span className="text-sm font-medium">₹{txn.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Route:</span>
                                  <span className="text-sm font-medium">{txn.route}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Zone:</span>
                                  <span className="text-sm font-medium">{txn.zone}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label>Flag Reason</Label>
                              <Alert className="mt-2">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{txn.reason}</AlertDescription>
                              </Alert>
                            </div>
                          </div>

                          {/* Right Panel - AI Explanation */}
                          <div className="space-y-4">
                            <div>
                              <Label className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                AI Explanation
                              </Label>
                              <div className="mt-2 p-3 bg-card/60 rounded-lg">
                                <p className="text-sm">{txn.explanation}</p>
                                <div className="flex items-center gap-2 mt-3">
                                  <span className="text-xs text-muted-foreground">Confidence:</span>
                                  <Progress value={txn.confidence * 100} className="flex-1" />
                                  <span className="text-xs font-medium">{Math.round(txn.confidence * 100)}%</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label>Fallback Options</Label>
                              <div className="mt-2 space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                  <Smartphone className="w-4 h-4 mr-2" />
                                  Switch to UPI
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                  <Building className="w-4 h-4 mr-2" />
                                  Use NEFT
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Try RTGS
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6 pt-4 border-t">
                          <Button onClick={() => handleReviewDecision(txn.id, "approve")} className="flex-1">
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReviewDecision(txn.id, "modify")}
                            className="flex-1"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Modify Route
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReviewDecision(txn.id, "reject")}
                            className="flex-1"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleReviewDecision(txn.id, "escalate")}
                            className="flex-1"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Escalate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Review Statistics */}
            <div className="space-y-6">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Review Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Reviews</span>
                    <span className="font-bold text-chart-5">25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Approved Today</span>
                    <span className="font-bold text-chart-3">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rejected Today</span>
                    <span className="font-bold text-chart-4">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Review Time</span>
                    <span className="font-bold">2.3 min</span>
                  </div>
                </CardContent>
              </Card>

              {/* Dual Key Security Status */}
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Dual Key Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    {showDualKeyAnimation ? (
                      <div className="flex items-center gap-4 animate-pulse">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-spin">
                          <Key className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center animate-spin">
                          <Lock className="w-6 h-6 text-accent-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-chart-3-foreground" />
                          </div>
                        </div>
                        <div className="font-medium">Keys Ready</div>
                        <div className="text-xs text-muted-foreground">Cryptographic signing active</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Comprehensive Reports & Audit Logs
                  </CardTitle>
                  <CardDescription>Generate detailed reports for clients, banks, and regulators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Report Generation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:bg-accent/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <h3 className="font-semibold mb-2">Client Report</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          HR/Finance focused with transaction summaries
                        </p>
                        <Button onClick={() => generateComprehensiveReport("client")} className="w-full">
                          Generate Client Report
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-accent/10 border-accent/20">
                      <CardContent className="p-6 text-center">
                        <Building className="w-12 h-12 mx-auto mb-4 text-accent" />
                        <h3 className="font-semibold mb-2">Bank Compliance</h3>
                        <p className="text-sm text-muted-foreground mb-4">Regulatory compliance and audit trails</p>
                        <Button
                          onClick={() => generateComprehensiveReport("bank")}
                          variant="outline"
                          className="w-full"
                        >
                          Generate Bank Report
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Available Reports */}
                  <div>
                    <Label className="text-base">Available Reports</Label>
                    <div className="space-y-3 mt-3">
                      {auditReports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-card/40"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{report.type}</div>
                              <div className="text-sm text-muted-foreground">
                                {report.period} • {report.transactions.toLocaleString()} transactions
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                report.status === "ready"
                                  ? "default"
                                  : report.status === "generating"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {report.status}
                            </Badge>
                            {report.status === "ready" && (
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Export Options */}
                  <div>
                    <Label className="text-base">Export Formats</Label>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        JSON
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Configuration */}
            <div className="space-y-6">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Report Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Include Clusters</Label>
                    <div className="space-y-2">
                      {clusterSummary.map((cluster) => (
                        <div key={cluster.cluster} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">{cluster.cluster}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Sections</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Transaction Summary</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">SLA Compliance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">AI Explanations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Detailed Audit Trail</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Reports Generated</span>
                    <span className="font-bold">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-bold">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Generation Time</span>
                    <span className="font-bold">45s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage Used</span>
                    <span className="font-bold">2.4 GB</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ... existing code for other tabs ... */}
        <TabsContent value="payments">
          <div className="space-y-8">
            {/* Futuristic Payment Header */}
            <div className="relative overflow-hidden rounded-2xl glass-panel cy-glow">
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-primary text-balance">Payment Processing Center</h2>
                    <p className="text-muted-foreground mt-2">Advanced payment orchestration with AI-powered routing</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${pulseAnimation ? "animate-pulse bg-chart-3" : "bg-chart-3/60"}`}
                    />
                    <span className="text-sm text-muted-foreground">Live Processing</span>
                  </div>
                </div>

                {/* Real-time Stats */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">₹24.8M</div>
                    <div className="text-xs text-muted-foreground">Today's Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-3">99.8%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">0.8s</div>
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                </div>

                {/* subtle scan sweep */}
                <div className="cy-scan pointer-events-none absolute inset-0" aria-hidden />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Creation Interface */}
              <Card className="glass-panel relative overflow-hidden">
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    Create Payment
                  </CardTitle>
                  <CardDescription>Initiate secure payment with AI-powered routing</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6">
                  {/* Payment Amount */}
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={paymentForm.amount}
                        onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                        className="text-2xl font-bold h-16 pl-12"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                        ₹
                      </div>
                    </div>
                  </div>

                  {/* Customer Email */}
                  <div className="space-y-2">
                    <Label>Customer Email</Label>
                    <Input
                      type="email"
                      placeholder="customer@example.com"
                      value={paymentForm.customer_email}
                      onChange={(e) => setPaymentForm({ ...paymentForm, customer_email: e.target.value })}
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.slice(0, 8).map((method) => (
                        <Card
                          key={method.id}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            selectedPaymentMethod === method.id ? "neon-border bg-primary/5" : "glass-panel"
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <method.icon
                              className={`w-8 h-8 mx-auto mb-2 ${
                                selectedPaymentMethod === method.id ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                            <div className={`font-medium text-sm`}>{method.name}</div>
                            <div className="text-xs text-muted-foreground">{method.fee} fee</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {showSecurityScan && (
                    <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto relative">
                          <div className="absolute inset-0 border-4 border-primary/15 rounded-full" />
                          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          <Shield className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div>
                          <div className="font-medium">Security Scan in Progress</div>
                          <div className="text-sm text-muted-foreground">Verifying transaction integrity...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dual Key Animation */}
                  {showDualKeyAnimation && (
                    <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center animate-pulse">
                            <Key className="w-6 h-6 text-primary -rotate-45" />
                          </div>
                          <div className="w-8 h-0.5 bg-primary/70 animate-pulse rounded-full" />
                          <div className="w-12 h-12 bg-accent/15 rounded-lg flex items-center justify-center animate-pulse">
                            <Key className="w-6 h-6 text-accent rotate-45" />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Dual-Key Signing</div>
                          <div className="text-sm text-muted-foreground">Cryptographic validation in progress...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success Animation */}
                  {paymentSuccess && (
                    <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-chart-3/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-chart-3" />
                        </div>
                        <div>
                          <div className="font-medium text-chart-3">Payment Successful</div>
                          <div className="text-sm text-muted-foreground">Transaction processed securely</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleCreatePayment}
                    className="w-full h-12 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={processingPayment || !paymentForm.amount || !selectedPaymentMethod}
                  >
                    {processingPayment ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Process Payment
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Live Transaction Monitor */}
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Live Transaction Monitor
                  </CardTitle>
                  <CardDescription>Real-time payment processing visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-card/40 hover:bg-card/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              txn.status === "success"
                                ? "bg-chart-3/25"
                                : txn.status === "failed"
                                  ? "bg-destructive/20"
                                  : "bg-accent/20"
                            }`}
                          >
                            {txn.status === "success" ? (
                              <CheckCircle className="w-5 h-5 text-chart-3" />
                            ) : txn.status === "failed" ? (
                              <X className="w-5 h-5 text-destructive" />
                            ) : (
                              <Clock className="w-5 h-5 text-accent" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{txn.id}</div>
                            <div className="text-sm text-muted-foreground">{txn.customer}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{txn.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {txn.method} • {txn.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods Configuration */}
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Payment Methods Configuration
                </CardTitle>
                <CardDescription>Configure and manage payment methods with real-time analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`transition-all duration-300 hover:scale-105 ${
                        method.enabled ? "neon-border bg-primary/3" : "glass-panel"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                method.enabled ? "bg-primary/10" : "bg-muted/40"
                              }`}
                            >
                              <method.icon
                                className={`w-6 h-6 ${method.enabled ? "text-primary" : "text-muted-foreground"}`}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">Fee: {method.fee}</div>
                            </div>
                          </div>
                          <Badge variant={method.enabled ? "default" : "secondary"}>
                            {method.enabled ? "Active" : "Disabled"}
                          </Badge>
                        </div>

                        {method.enabled && (
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Success Rate</span>
                              <span className="font-medium text-chart-3">98.{Math.floor(Math.random() * 9)}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Avg Response</span>
                              <span className="font-medium">{Math.floor(Math.random() * 500 + 200)}ms</span>
                            </div>
                            <Progress value={Math.floor(Math.random() * 30 + 70)} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="developers">
          {/* ... existing developers content ... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* API Documentation */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  API Integration
                </CardTitle>
                <CardDescription>RESTful APIs for seamless integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {apiEndpoints.map((api, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-card/40">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={api.method === "POST" ? "default" : "secondary"}>{api.method}</Badge>
                        <code className="text-sm font-mono">{api.endpoint}</code>
                      </div>
                      <p className="text-sm text-muted-foreground">{api.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Docs
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Terminal className="w-4 h-4 mr-2" />
                    Try API
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Webhooks & Keys */}
            <div className="space-y-6">
              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Test Key</Label>
                    <div className="flex gap-2">
                      <Input value="rzp_test_1234567890" readOnly className="font-mono text-sm" />
                      <Button variant="outline" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Live Key</Label>
                    <div className="flex gap-2">
                      <Input value="rzp_live_••••••••••" readOnly className="font-mono text-sm" />
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="w-5 h-5" />
                    Webhooks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://yoursite.com/webhook" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Success</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Failed</span>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Webhooks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          {/* ... existing compliance content ... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* KYC Status */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  KYC & Verification
                </CardTitle>
                <CardDescription>Account verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business Details</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bank Account</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GST Certificate</span>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Director KYC</span>
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>

            {/* Risk Management */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Risk Management
                </CardTitle>
                <CardDescription>Fraud detection and prevention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm font-medium text-chart-3">Low</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fraud Detection</span>
                    <Badge variant="default">
                      <Shield className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transaction Limits</span>
                    <span className="text-sm font-medium">₹5,00,000/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blocked Transactions</span>
                    <span className="text-sm font-medium">3 this month</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Rules
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Health */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Uptime</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">45ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-medium text-chart-3">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Status */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods
                  .filter((m) => m.enabled)
                  .map((method) => (
                    <div key={method.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <method.icon className="w-4 h-4" />
                        <span className="text-sm">{method.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">PCI Compliance</span>
                  <Badge variant="default">Level 1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SSL Certificate</span>
                  <Badge variant="default">Valid</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">2FA Status</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Security Scan</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Arealis Gateway Setup Wizard</DialogTitle>
            <DialogDescription>Complete your enterprise payment gateway configuration</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {onboardingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-chart-3 text-chart-3-foreground"
                        : step.current
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="ml-2 text-sm">
                    <div className={step.current ? "font-medium" : ""}>{step.title}</div>
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Compliance Documents</CardTitle>
                <CardDescription>Upload required documents for regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <div className="text-sm font-medium">RBI KYC Certificate</div>
                    <div className="text-xs text-muted-foreground">PDF, max 10MB</div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Upload
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <div className="text-sm font-medium">GST Certificate</div>
                    <div className="text-xs text-muted-foreground">PDF, max 10MB</div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Compliance Officer Contact</Label>
                  <Input placeholder="compliance@company.com" />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button>Continue Setup</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
