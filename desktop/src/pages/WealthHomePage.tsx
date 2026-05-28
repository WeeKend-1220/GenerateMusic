import {useMemo, useState} from "react";
import {
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    CreditCard,
    Eye,
    EyeOff,
    PiggyBank,
    ReceiptText,
    Sparkles,
    Wallet,
} from "lucide-react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";

type WealthTab = "overview" | "transactions" | "recommend";

type DistributionItem = {
    label: string;
    value: number; // 0..1
    colorClass: string;
};

type TransactionItem = {
    id: string;
    date: string;
    title: string;
    amount: number; // +in / -out
    status: "已完成" | "处理中";
};

type ProductItem = {
    id: string;
    name: string;
    rateText: string;
    termText: string;
    riskText: string;
    gradientFrom: string;
    gradientTo: string;
};

function formatYuan(n: number) {
    const abs = Math.abs(n).toFixed(2);
    return `${n < 0 ? "-" : ""}¥${abs}`;
}

export default function WealthHomePage() {
    const {t} = useTranslation();
    const [tab, setTab] = useState<WealthTab>("overview");
    const [showAmounts, setShowAmounts] = useState(true);

    const distribution: DistributionItem[] = useMemo(
        () => [
            {label: "现金管理", value: 0.18, colorClass: "bg-primary-400"},
            {label: "理财", value: 0.42, colorClass: "bg-primary-300"},
            {label: "基金", value: 0.26, colorClass: "bg-accent-400"},
            {label: "保障", value: 0.14, colorClass: "bg-amber-300"},
        ],
        [],
    );

    const transactions: TransactionItem[] = useMemo(
        () => [
            {
                id: "tx-1",
                date: "04-06",
                title: "理财申购",
                amount: -1980.0,
                status: "已完成",
            },
            {
                id: "tx-2",
                date: "04-04",
                title: "现金管理收益",
                amount: 12.45,
                status: "已完成",
            },
            {
                id: "tx-3",
                date: "04-03",
                title: "转账支出",
                amount: -320.99,
                status: "已完成",
            },
            {
                id: "tx-4",
                date: "04-01",
                title: "基金定投",
                amount: -580.0,
                status: "处理中",
            },
        ],
        [],
    );

    const products: ProductItem[] = useMemo(
        () => [
            {
                id: "p-1",
                name: "稳健增长组合",
                rateText: "预期收益 6.2%/年",
                termText: "6-12 个月",
                riskText: "中低风险",
                gradientFrom: "from-primary-500/20",
                gradientTo: "to-accent-500/10",
            },
            {
                id: "p-2",
                name: "现金流加速器",
                rateText: "预期收益 4.8%/年",
                termText: "1-3 个月",
                riskText: "低风险",
                gradientFrom: "from-accent-500/20",
                gradientTo: "to-primary-500/10",
            },
            {
                id: "p-3",
                name: "均衡配置策略",
                rateText: "预期收益 7.1%/年",
                termText: "12-24 个月",
                riskText: "中风险",
                gradientFrom: "from-primary-600/20",
                gradientTo: "to-accent-400/10",
            },
        ],
        [],
    );

    const totalAssets = 128450.23;
    const dailyProfit = 312.45;
    const dailyRate = 0.24;

    const masked = showAmounts ? null : "********";

    const handleQuickAction = (nextTab: WealthTab) => {
        setTab(nextTab);
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-6">
                {/* Header */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.25, ease: "easeOut"}}
                    className="flex items-start justify-between gap-4 mb-5"
                >
                    <div>
                        <h1 className="text-[22px] font-bold tracking-tight text-text-primary">
                            {t("wealth.title")}
                        </h1>
                        <p className="text-[13px] text-text-tertiary mt-1">
                            {t("wealth.subtitle")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-primary-600" />
                            {t("wealth.riskTag")}
                        </span>

                        <button
                            type="button"
                            onClick={() => setShowAmounts((s) => !s)}
                            className="p-2.5 rounded-xl border border-border bg-white hover:bg-surface-secondary transition-colors cursor-pointer"
                            aria-label={showAmounts ? t("wealth.hideAmounts") : t("wealth.showAmounts")}
                            title={showAmounts ? t("wealth.hideAmounts") : t("wealth.showAmounts")}
                        >
                            {showAmounts ? (
                                <EyeOff className="w-4 h-4 text-text-secondary" />
                            ) : (
                                <Eye className="w-4 h-4 text-text-secondary" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Top summary card */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm mb-5">
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-200/60 blur-3xl" />
                    <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-accent-200/60 blur-3xl" />

                    <div className="relative p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-text-tertiary font-semibold">
                                    {t("wealth.totalAssets")}
                                </div>
                                <div className="mt-1 flex items-end gap-3">
                                    <div className="text-[34px] font-extrabold tracking-tight tabular-nums">
                                        {masked ?? formatYuan(totalAssets)}
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-surface-tertiary">
                                        <span className={dailyProfit >= 0 ? "text-emerald-600" : "text-red-600"}>
                                            {dailyProfit >= 0 ? (
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            ) : (
                                                <ArrowDownRight className="w-3.5 h-3.5" />
                                            )}
                                        </span>
                                        {t("wealth.dailyProfit")}:{" "}
                                        <span className="tabular-nums">
                                            {masked ?? formatYuan(dailyProfit)}
                                        </span>
                                    </span>
                                    <span className="text-xs text-text-tertiary">
                                        {t("wealth.dailyRate")}:{" "}
                                        <span className="font-semibold text-text-secondary tabular-nums">
                                            {masked ? "****" : `${dailyRate.toFixed(2)}%`}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Tiny "risk/fit" meter */}
                            <div className="hidden sm:flex items-center gap-4">
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background:
                                                "conic-gradient(#7c3aed 0 72%, rgba(124,58,237,0.12) 72% 100%)",
                                        }}
                                    />
                                    <div className="absolute inset-2 rounded-full bg-white border border-border flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-[11px] text-text-tertiary font-semibold">
                                                {t("wealth.fit")}
                                            </div>
                                            <div className="text-[16px] font-bold text-primary-700 tabular-nums mt-0.5">
                                                72
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="min-w-[180px]">
                                    <div className="text-sm font-semibold text-text-primary">
                                        {t("wealth.fitTitle")}
                                    </div>
                                    <div className="text-xs text-text-tertiary mt-1">
                                        {t("wealth.fitDesc")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <motion.button
                                whileHover={{y: -2}}
                                onClick={() => handleQuickAction("transactions")}
                                className="group rounded-xl border border-border bg-white px-3 py-3 text-left hover:bg-surface-tertiary transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary-50 border border-primary-100">
                                        <PiggyBank className="w-4 h-4 text-primary-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-text-primary">
                                            {t("wealth.quick.recharge")}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-0.5">
                                            {t("wealth.quick.rechargeHint")}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            <motion.button
                                whileHover={{y: -2}}
                                onClick={() => handleQuickAction("transactions")}
                                className="group rounded-xl border border-border bg-white px-3 py-3 text-left hover:bg-surface-tertiary transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent-50 border border-accent-100">
                                        <Wallet className="w-4 h-4 text-accent-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-text-primary">
                                            {t("wealth.quick.transfer")}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-0.5">
                                            {t("wealth.quick.transferHint")}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            <motion.button
                                whileHover={{y: -2}}
                                onClick={() => handleQuickAction("recommend")}
                                className="group rounded-xl border border-border bg-white px-3 py-3 text-left hover:bg-surface-tertiary transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary-50 border border-primary-100">
                                        <CreditCard className="w-4 h-4 text-primary-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-text-primary">
                                            {t("wealth.quick.buy")}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-0.5">
                                            {t("wealth.quick.buyHint")}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>

                            <motion.button
                                whileHover={{y: -2}}
                                onClick={() => handleQuickAction("transactions")}
                                className="group rounded-xl border border-border bg-white px-3 py-3 text-left hover:bg-surface-tertiary transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent-50 border border-accent-100">
                                        <ReceiptText className="w-4 h-4 text-accent-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-text-primary">
                                            {t("wealth.quick.bills")}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-0.5">
                                            {t("wealth.quick.billsHint")}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="flex items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-2 p-1 rounded-2xl border border-border bg-white">
                        {[
                            {key: "overview" as const, label: t("wealth.tabs.overview")},
                            {key: "transactions" as const, label: t("wealth.tabs.transactions")},
                            {key: "recommend" as const, label: t("wealth.tabs.recommend")},
                        ].map((item) => {
                            const active = tab === item.key;
                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setTab(item.key)}
                                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                                        active
                                            ? "bg-gradient-to-r from-primary-50 to-accent-50 text-primary-800 shadow-sm border border-primary-100"
                                            : "text-text-tertiary hover:text-text-secondary hover:bg-surface-tertiary"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs text-text-tertiary">
                        <Sparkles className="w-4 h-4 text-primary-600" />
                        {t("wealth.tip")}
                    </div>
                </div>

                {/* Tab content */}
                {tab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                        <motion.div
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.22}}
                            className="lg:col-span-2 rounded-2xl border border-border bg-white p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm font-semibold text-text-primary">
                                        {t("wealth.distribution.title")}
                                    </div>
                                    <div className="text-xs text-text-tertiary mt-1">
                                        {t("wealth.distribution.desc")}
                                    </div>
                                </div>
                                <div className="text-xs font-semibold text-primary-700 px-2.5 py-1 rounded-full border border-primary-100 bg-primary-50">
                                    {t("wealth.distribution.totalLabel")}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {distribution.map((item) => (
                                    <div key={item.label}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm font-medium text-text-secondary">
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-text-tertiary tabular-nums">
                                                {(item.value * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                        <div className="h-2 rounded-full bg-surface-tertiary border border-border overflow-hidden">
                                            <div
                                                className={`h-full ${item.colorClass} transition-all`}
                                                style={{width: `${item.value * 100}%`}}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.22, delay: 0.03}}
                            className="rounded-2xl border border-border bg-white p-5"
                        >
                            <div className="text-sm font-semibold text-text-primary mb-1">
                                {t("wealth.cashflow.title")}
                            </div>
                            <div className="text-xs text-text-tertiary mb-4">
                                {t("wealth.cashflow.desc")}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-semibold">
                                        {t("wealth.cashflow.inflow")}
                                    </span>
                                    <span className="text-sm font-extrabold text-emerald-600 tabular-nums">
                                        {masked ?? formatYuan(684.2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary font-semibold">
                                        {t("wealth.cashflow.outflow")}
                                    </span>
                                    <span className="text-sm font-extrabold text-red-600 tabular-nums">
                                        {masked ?? formatYuan(-412.77)}
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-text-tertiary">
                                            {t("wealth.cashflow.net")}
                                        </span>
                                        <span className="text-sm font-extrabold text-primary-700 tabular-nums">
                                            {masked ?? formatYuan(271.43)}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs text-text-tertiary leading-relaxed">
                                        {t("wealth.cashflow.comment")}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.22, delay: 0.06}}
                            className="lg:col-span-3 rounded-2xl border border-border bg-white p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm font-semibold text-text-primary">
                                        {t("wealth.recent.title")}
                                    </div>
                                    <div className="text-xs text-text-tertiary mt-1">
                                        {t("wealth.recent.desc")}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setTab("transactions")}
                                    className="text-sm font-semibold text-primary-700 hover:text-primary-800 cursor-pointer"
                                >
                                    {t("wealth.more")}
                                </button>
                            </div>

                            <div className="space-y-1">
                                {transactions.slice(0, 3).map((tx) => {
                                    const isIn = tx.amount >= 0;
                                    return (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between gap-3 py-3 px-3 rounded-xl hover:bg-surface-secondary transition-colors"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div
                                                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                                                        isIn
                                                            ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                                            : "bg-red-50 border-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {isIn ? (
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    ) : (
                                                        <ArrowDownRight className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-text-primary truncate">
                                                        {tx.title}
                                                    </div>
                                                    <div className="text-xs text-text-tertiary mt-0.5">
                                                        {tx.date} · {tx.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-extrabold tabular-nums ${isIn ? "text-emerald-600" : "text-red-600"}`}>
                                                {masked ?? formatYuan(tx.amount)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}

                {tab === "transactions" && (
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.22}}
                        className="rounded-2xl border border-border bg-white p-5"
                    >
                        <div className="flex items-center justify-between mb-4 gap-3">
                            <div>
                                <div className="text-sm font-semibold text-text-primary">
                                    {t("wealth.transactions.title")}
                                </div>
                                <div className="text-xs text-text-tertiary mt-1">
                                    {t("wealth.transactions.desc")}
                                </div>
                            </div>
                            <div className="text-xs text-text-tertiary">
                                {t("wealth.transactions.count", {count: transactions.length})}
                            </div>
                        </div>

                        <div className="rounded-xl border border-border bg-surface-tertiary overflow-hidden">
                            {transactions.map((tx) => {
                                const isIn = tx.amount >= 0;
                                return (
                                    <div
                                        key={tx.id}
                                        className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                                                    isIn
                                                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                                        : "bg-red-50 border-red-100 text-red-700"
                                                }`}
                                            >
                                                {isIn ? (
                                                    <ArrowUpRight className="w-4 h-4" />
                                                ) : (
                                                    <ArrowDownRight className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-semibold text-text-primary truncate">
                                                    {tx.title}
                                                </div>
                                                <div className="text-xs text-text-tertiary mt-0.5">
                                                    {tx.date} · {tx.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div
                                                className={`text-sm font-extrabold tabular-nums ${
                                                    isIn ? "text-emerald-600" : "text-red-600"
                                                }`}
                                            >
                                                {masked ?? formatYuan(tx.amount)}
                                            </div>
                                            <div className="text-[11px] text-text-tertiary font-medium mt-0.5">
                                                {isIn ? t("wealth.transactions.in") : t("wealth.transactions.out")}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {tab === "recommend" && (
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.22}}
                        className="rounded-2xl border border-border bg-white p-5"
                    >
                        <div className="flex items-center justify-between mb-4 gap-3">
                            <div>
                                <div className="text-sm font-semibold text-text-primary">
                                    {t("wealth.recommend.title")}
                                </div>
                                <div className="text-xs text-text-tertiary mt-1">
                                    {t("wealth.recommend.desc")}
                                </div>
                            </div>
                            <div className="text-xs text-text-tertiary">
                                {t("wealth.recommend.hint")}
                            </div>
                        </div>

                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1">
                            {products.map((p) => (
                                <motion.div
                                    key={p.id}
                                    whileHover={{y: -2}}
                                    className={`snap-start min-w-[280px] w-[280px] rounded-2xl border border-border overflow-hidden bg-gradient-to-br ${p.gradientFrom} ${p.gradientTo}`}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-sm font-extrabold text-text-primary truncate">
                                                    {p.name}
                                                </div>
                                                <div className="text-xs text-text-tertiary mt-1">
                                                    {p.rateText}
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-2xl bg-white/70 border border-border flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-primary-700" />
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            <div className="rounded-xl bg-white/70 border border-border px-2.5 py-2">
                                                <div className="text-[11px] text-text-tertiary">
                                                    {t("wealth.recommend.term")}
                                                </div>
                                                <div className="text-sm font-bold text-text-primary mt-0.5">
                                                    {p.termText}
                                                </div>
                                            </div>
                                            <div className="rounded-xl bg-white/70 border border-border px-2.5 py-2">
                                                <div className="text-[11px] text-text-tertiary">
                                                    {t("wealth.recommend.risk")}
                                                </div>
                                                <div className="text-sm font-bold text-text-primary mt-0.5">
                                                    {p.riskText}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setTab("transactions")}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold hover:from-primary-700 hover:to-primary-800 transition-colors cursor-pointer shadow-sm"
                                            >
                                                {t("wealth.recommend.cta")}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Bottom padding */}
                <div className="h-6" />
            </div>
        </div>
    );
}

