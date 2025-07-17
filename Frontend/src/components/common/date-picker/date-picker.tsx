import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { DatePickerProps } from "./interfaces"
import { parseDate, formatDate } from "@/lib/date"


export const DatePicker = ({ value, onChange, label = "Due Date" }: DatePickerProps) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(parseDate(value))
    const [month, setMonth] = useState<Date | undefined>(date)
    const [inputValue, setInputValue] = useState(formatDate(date))

    useEffect(() => {
        const newDate = parseDate(value)
        setDate(newDate)
        setMonth(newDate)
        setInputValue(formatDate(newDate))
    }, [value])

    return (
        <div className="space-y-2">
            <Label htmlFor="due-date">{label}</Label>
            <div className="relative flex gap-2">
                <Input
                    id="due-date"
                    value={inputValue}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10"
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        const newDate = new Date(e.target.value)
                        if (!isNaN(newDate.getTime())) {
                            setDate(newDate)
                            setMonth(newDate)
                            onChange(newDate.toISOString().split("T")[0]) // Pass ISO date string to parent
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            aria-label="Select date"
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                setDate(date)
                                setInputValue(formatDate(date))
                                setOpen(false)
                                setOpen(false)
                                if (date) onChange(date.toISOString().split("T")[0])
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
