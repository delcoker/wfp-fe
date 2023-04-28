export default class DateFormatterService {

    private readonly formatter: Intl.DateTimeFormat
    private readonly options: Intl.DateTimeFormatOptions = {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    public constructor() {
        this.formatter = new Intl.DateTimeFormat("en-US", this.options)
    }

    format(date: string): string {
        const newDate = new Date(date);
        return this.formatter.format(newDate);
    }

}