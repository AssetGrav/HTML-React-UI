
export function convertData(data) {
    const timeNow = new Date();
    const convertTimeMillis = Date.parse(timeNow);
    const dateDifference = convertTimeMillis - data;
    function toGoodDate(time) {
        let newTime = "";
        if (time < 10) {
            newTime = "0" + time.toString();
        } else if (time > 9) {
            newTime = time.toString();
        }
        return newTime;
    };
    function convert(date) {
        const year = Math.round(date / 31557600000);
        const month = Math.round(date / 2629800000);
        const day = Math.round(date / 86400000 / 24);
        const hour = Math.round(date / 3600000);
        const minutes = Math.round(date / 60000);
        if (date > 1800000 && date <= 86400000) {
            return ` ${hour} : ${minutes} `;
        } else if (date > 86400000) {
            return ` ${toGoodDate(day)}.${toGoodDate(month)}.${toGoodDate(year)} `;
        }
    }
    if (dateDifference < 60000) {
        return "1 минуту назад";
    } else if (dateDifference < 300000 && dateDifference >= 60000) {
        return "5 минут назад";
    } else if (dateDifference < 600000 && dateDifference >= 300000) {
        return "10 минут назад";
    } else if (dateDifference < 1800000 && dateDifference >= 600000) {
        return "30 минут назад";
    } else if (dateDifference > 1800000) {
        return convert(dateDifference);
    }
}
