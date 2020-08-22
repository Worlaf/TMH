import { format as formatDate } from "date-fns";
import { ru } from "date-fns/locale";

const locale = ru;

export function format(date: Date, format: string) {
    return formatDate(date, format, { locale: locale });
}
