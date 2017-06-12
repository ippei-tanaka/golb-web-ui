export default (number) =>
{
    if (11 <= number && number <= 19)
    {
        return number + "th";
    } else
    {
        const rest = number % 10;

        switch (rest)
        {
            case 1:
                return number + "st";
            case 2:
                return number + "nd";
            case 3:
                return number + "rd";
            default:
                return number + "th";
        }
    }
};