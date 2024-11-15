import {format} from "date-fns";

function date(date){
    const newDate = new Date(date);
    return format(newDate, "d MMMM yyyy");
}

export {
    date
}
