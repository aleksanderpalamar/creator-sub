'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartsProps {
  data: {
    planChartData: Array<{
      name: string
      assinantes: number
      valor: number
    }>
    monthlyGrowthData: Array<{
      name: string
      assinantes: number
    }>
  }
  type?: 'monthly'
}

export default function Charts({ data, type }: ChartsProps) {
  const chartData = type === 'monthly' ? data.monthlyGrowthData : data.planChartData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="assinantes" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}